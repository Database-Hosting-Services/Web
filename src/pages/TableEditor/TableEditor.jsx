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
  setTableDataLoading,
  setTableDataError,
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
    // The tableData should already have the real OID from the backend
    // since syncTableWithBackend was called in the modal
    const newTable = {
      ...tableData,
      id: tables.length + 1,
      // Use the OID from the backend response, not a temporary one
      oid: tableData.oid,
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
    import("../../features/TableEditor/utils")
      .then(({ prepareRowAddition, addRowAndRefreshTable }) => {
        // First update the UI with local data
        const selectedTable = prepareRowAddition(
          rowData,
          selectedTableId,
          tables,
          apiTableData,
          dispatch,
        );

        if (selectedTable) {
          // Then send to the backend and refresh
          addRowAndRefreshTable(
            projectId,
            selectedTable.oid,
            rowData,
            dispatch,
          ).catch(() => {
            errorToast(
              "Failed to add row to the table. Local changes will be lost on refresh.",
            );
          });
        }
      })
      .catch(() => {
        errorToast("Failed to prepare row data");
      });

    // Close the modal
    dispatch(closeRowModal());
  };

  // Handle saving the column
  const handleSaveColumn = (columnData) => {
    import("../../features/TableEditor/utils")
      .then(({ addColumnToTable }) => {
        const success = addColumnToTable(
          columnData,
          selectedTableId,
          tables,
          dispatch,
        );
        if (success) {
          dispatch(closeColumnModal());
        }
      })
      .catch((error) => {
        console.error("Error adding column:", error);
        errorToast("Failed to add column to the table");
      });
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
