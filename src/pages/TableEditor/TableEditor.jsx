import { useSelector, useDispatch } from "react-redux";
import { useLoaderData, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  EmptyState,
  CreateTableModal,
  TableEditorHeader,
  TableData,
  AddColumnModal,
  AddRowModal,
} from "../../features/TableEditor/components";
import {
  closeCreateTableModal,
  closeColumnModal,
  closeRowModal,
  updateTableData,
  resetTableData,
  addTable,
  updateTables,
  setTableDataLoading,
  setTableDataError,
  setTableData,
} from "../../store/tableEditorSlice";
import { fetchTableData } from "../../features/Sidebar/actions";
import { errorToast } from "../../utils/toastConfig";

export default function TableEditor() {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const loaderData = useLoaderData();
  const {
    isModalOpen,
    isColumnModalOpen,
    isRowModalOpen,
    tableData,
    tables,
    selectedTableId,
    apiTableData,
    tableDataLoading,
    tableDataError,
  } = useSelector((state) => state.tableEditor);

  // Show error toast if loader failed
  if (loaderData && !loaderData.success && loaderData.error) {
    errorToast(loaderData.error);
  }

  // Fetch table data when a table is selected
  useEffect(() => {
    if (selectedTableId && projectId) {
      // Find the selected table to get its OID
      const selectedTable = tables.find(
        (table) => table.id === selectedTableId,
      );
      if (!selectedTable) {
        console.warn(
          `Selected table with ID ${selectedTableId} not found in tables list`,
        );
        return;
      }

      dispatch(setTableDataLoading(true));

      // Use the table's OID to fetch data
      fetchTableData(projectId, selectedTable.oid, dispatch, {
        page: 1,
        limit: 50,
      })
        .then((response) => {
          // Log the backend data when it's received
          console.log("Backend table data received:", response);
        })
        .catch((error) => {
          dispatch(
            setTableDataError(error.message || "Failed to fetch table data"),
          );
        });
    }
  }, [selectedTableId, projectId, dispatch, tables]);

  const handleTableDataChange = (updates) => {
    dispatch(updateTableData(updates));
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    dispatch(closeCreateTableModal());
  };

  // Handle saving the table
  const handleSaveTable = (tableData) => {
    // Only assign an ID for local state management
    const newTable = {
      ...tableData,
      id: tables.length + 1,
      oid: tableData.oid || `table_oid_${Date.now()}`,
    };

    // Add the new table to the store
    dispatch(addTable(newTable));
    dispatch(closeCreateTableModal());
    dispatch(resetTableData());
  };

  // Handle closing the column modal
  const handleCloseColumnModal = () => {
    dispatch(closeColumnModal());
  };

  // Handle closing the row modal
  const handleCloseRowModal = () => {
    dispatch(closeRowModal());
  };

  // Handle saving the row
  const handleSaveRow = (rowData) => {
    // Find the selected table
    const selectedTable = tables.find((table) => table.id === selectedTableId);

    if (selectedTable) {
      // Create a copy of the table data and add the new row
      let updatedData = [];

      // If there's existing data, use it
      if (selectedTable.data && Array.isArray(selectedTable.data)) {
        updatedData = [...selectedTable.data, rowData];
      } else {
        // Otherwise start with just the new row
        updatedData = [rowData];
      }

      // Update the tables in the store
      const updatedTables = tables.map((table) => {
        if (table.id === selectedTableId) {
          return {
            ...table,
            data: updatedData,
          };
        }
        return table;
      });

      // Update the Redux store with local data first for immediate UI feedback
      dispatch(updateTables(updatedTables));

      // If we have API table data for this table, update it too
      if (apiTableData[selectedTable.oid]) {
        const currentApiData = apiTableData[selectedTable.oid];

        // Prepare the updated API data
        const updatedApiData = {
          ...currentApiData,
          data: {
            ...currentApiData.data,
            rows: currentApiData.data.rows
              ? [...currentApiData.data.rows, rowData]
              : [rowData],
          },
        };

        // Update the API data in Redux store
        dispatch(
          setTableData({
            tableId: selectedTable.oid,
            data: updatedApiData,
          }),
        );

        // Send the new row to the backend API
        import("../../features/TableEditor/api/tableService")
          .then(({ addRowToTable }) => {
            // Set loading state if needed
            // dispatch(setTableDataLoading(true));

            console.log("Sending row data to backend:", rowData);
            return addRowToTable(projectId, selectedTable.oid, rowData);
          })
          .then((response) => {
            console.log("Row added successfully to backend:", response);
            // You could update the row with any additional data returned from the API if needed
          })
          .catch((error) => {
            console.error("Failed to add row to backend:", error);
            console.error("API error details:", error.response?.data);
            errorToast(
              "Failed to add row to the table. Local changes will be lost on refresh.",
            );
            // You may want to implement a rollback mechanism here to remove the row from local state
            // if the API call fails, or provide a retry mechanism
          });
      }

      // Close the modal
      dispatch(closeRowModal());
    }
  };

  // Handle saving the column
  const handleSaveColumn = (columnData) => {
    // Find the selected table
    const selectedTable = tables.find((table) => table.id === selectedTableId);

    if (selectedTable) {
      // Get the max ordinal position
      const maxOrdinalPosition = Math.max(
        ...selectedTable.schema.Columns.map((col) => col.OrdinalPosition),
        0,
      );

      // Create new column object
      const newColumn = {
        CharacterMaximumLength: 255,
        ColumnDefault: columnData.DefaultValue || null,
        ColumnName: columnData.ColumnName,
        DataType: columnData.DataType,
        IsNullable: true,
        NumericPrecision: null,
        NumericScale: null,
        OrdinalPosition: maxOrdinalPosition + 1,
        TableName: selectedTable.name,
      };

      // Update the table's columns
      const updatedTables = tables.map((table) => {
        if (table.id === selectedTableId) {
          // Add the column to the schema
          const updatedColumns = [...table.schema.Columns, newColumn];

          // Add a new field in the data for this column (with null values)
          const updatedData = table.data.map((row) => ({
            ...row,
            [columnData.ColumnName]: null,
          }));

          return {
            ...table,
            schema: {
              ...table.schema,
              Columns: updatedColumns,
            },
            data: updatedData,
          };
        }
        return table;
      });

      dispatch(updateTables(updatedTables));
      dispatch(closeColumnModal());
    }
  };

  // Get the table data to display
  const getTableDataToDisplay = () => {
    if (!selectedTableId) return null;

    // Find the selected table to get its OID
    const selectedTable = tables.find((table) => table.id === selectedTableId);
    if (!selectedTable) return null;

    // First try to get data from API response using the OID
    const apiData = apiTableData[selectedTable.oid];
    if (apiData) {
      return apiData;
    }

    // Fall back to table.data if available (legacy data structure)
    if (selectedTable && selectedTable.data) {
      return {
        columns: selectedTable.schema.Columns.map((col) => ({
          name: col.ColumnName,
          type: col.DataType,
        })),
        rows: selectedTable.data,
      };
    }

    return null;
  };

  return (
    <div className="flex flex-col h-screen bg-primary">
      {tables.length > 0 && <TableEditorHeader />}

      <div className="flex-1 flex items-center justify-center bg-primary">
        {/* Display the table data or an empty state */}
        {tables.length > 0 ? (
          selectedTableId ? (
            <div className="w-full h-full">
              {tableDataLoading ? (
                <div className="text-center text-gray-400 p-10">
                  <p>Loading table data...</p>
                </div>
              ) : tableDataError ? (
                <div className="text-center text-red-500 p-10">
                  <p>Error: {tableDataError}</p>
                  <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={() => {
                      // Find the selected table to get its OID
                      const selectedTable = tables.find(
                        (table) => table.id === selectedTableId,
                      );
                      if (!selectedTable) {
                        dispatch(setTableDataError("Selected table not found"));
                        return;
                      }

                      dispatch(setTableDataLoading(true));
                      fetchTableData(projectId, selectedTable.oid, dispatch, {
                        page: 1,
                        limit: 50,
                      }).catch((error) => {
                        dispatch(
                          setTableDataError(
                            error.message || "Failed to fetch table data",
                          ),
                        );
                      });
                    }}
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <TableData
                  data={getTableDataToDisplay()}
                  tableName={
                    tables.find((t) => t.id === selectedTableId)?.name ||
                    "Table"
                  }
                />
              )}
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <p>Select a table from the sidebar to view its data</p>
            </div>
          )
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Create Table Modal */}
      {isModalOpen && (
        <CreateTableModal
          onClose={handleCloseModal}
          onSave={handleSaveTable}
          tableData={tableData}
          onTableDataChange={handleTableDataChange}
        />
      )}

      {/* Add Column Modal */}
      {isColumnModalOpen && selectedTableId && (
        <AddColumnModal
          onClose={handleCloseColumnModal}
          onSave={handleSaveColumn}
          tableName={
            tables.find((table) => table.id === selectedTableId)?.name || ""
          }
        />
      )}

      {/* Add Row Modal */}
      {isRowModalOpen && selectedTableId && (
        <AddRowModal
          onClose={handleCloseRowModal}
          onSave={handleSaveRow}
          tableId={selectedTableId}
        />
      )}
    </div>
  );
}
