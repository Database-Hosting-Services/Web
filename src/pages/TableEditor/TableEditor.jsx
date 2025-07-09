import { useSelector, useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";
import {
  EmptyState,
  CreateTableModal,
  TableEditorHeader,
  TableData,
  AddColumnModal,
} from "../../features/TableEditor/components";
import {
  closeCreateTableModal,
  closeColumnModal,
  updateTableData,
  resetTableData,
  addTable,
  updateTables,
} from "../../store/tableEditorSlice";
import { errorToast } from "../../utils/toastConfig";

export default function TableEditor() {
  const dispatch = useDispatch();
  const loaderData = useLoaderData();
  const { isModalOpen, isColumnModalOpen, tableData, tables, selectedTableId } =
    useSelector((state) => state.tableEditor);

  // Show error toast if loader failed
  if (loaderData && !loaderData.success && loaderData.error) {
    errorToast(loaderData.error);
  }

  const handleTableDataChange = (updates) => {
    dispatch(updateTableData(updates));
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    dispatch(closeCreateTableModal());
  };

  // Handle saving the table
  const handleSaveTable = (tableData) => {
    // Generate a new ID and OID for the table
    const newTable = {
      ...tableData,
      id: tables.length + 1,
      oid: `table_oid_${Date.now()}`,
      // Update the TableName in the schema to match the table name
      schema: {
        ...tableData.schema,
        TableName: tableData.name,
        // Update TableName in all Columns
        Columns: tableData.schema.Columns.map((col) => ({
          ...col,
          TableName: tableData.name,
        })),
        // Update TableName in all Constraints
        Constraints: tableData.schema.Constraints.map((constraint) => ({
          ...constraint,
          TableName: tableData.name,
        })),
        // Update TableName in all Indexes
        Indexes: tableData.schema.Indexes.map((index) => ({
          ...index,
          TableName: tableData.name,
        })),
      },
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

  // Table selection is now handled in the sidebar component

  return (
    <div className="flex flex-col h-screen bg-primary">
      {tables.length > 0 && <TableEditorHeader />}

      <div className="flex-1 flex items-center justify-center bg-primary">
        {/* Display the table data or an empty state */}
        {tables.length > 0 ? (
          selectedTableId ? (
            <div className="w-full h-full">
              <TableData
                data={
                  tables.find((table) => table.id === selectedTableId)?.data ||
                  []
                }
              />
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
    </div>
  );
}
