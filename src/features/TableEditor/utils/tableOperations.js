import { addRowToTable } from "../api/tableService";
import { fetchTableData } from "../../../features/Sidebar/actions";
import {
  setTableDataError,
  setTableDataLoading,
  updateTables,
  setTableData,
} from "../../../store/tableEditorSlice";

/**
 * Adds a row to a table and refreshes the table data
 *
 * @param {string|number} projectId - The ID of the project
 * @param {string} tableOid - The OID of the table
 * @param {object} rowData - The row data to add
 * @param {function} dispatch - The Redux dispatch function
 * @returns {Promise<object|null>} - The response from the API or null on error
 */
export const addRowAndRefreshTable = async (
  projectId,
  tableOid,
  rowData,
  dispatch,
) => {
  try {
    // Set loading state while adding the row
    dispatch(setTableDataLoading(true));

    console.log("Sending row data to backend:", rowData);

    // Add the row to the table
    const addRowResponse = await addRowToTable(projectId, tableOid, rowData);
    console.log("Row added successfully to backend:", addRowResponse);

    // Refresh the table data to get the latest data including the new row
    await fetchTableData(projectId, tableOid, dispatch, {
      page: 1,
      limit: 50,
    });

    console.log("Table data refreshed after adding row");
    return addRowResponse;
  } catch (error) {
    console.error("Failed to add row to backend:", error);
    console.error("API error details:", error.response?.data);

    dispatch(
      setTableDataError(
        error.message || "Failed to add row or refresh table data",
      ),
    );

    throw error;
  }
};

/**
 * Creates a new column object based on user input
 *
 * @param {object} columnData - The column data from the form
 * @param {string} tableName - The name of the table
 * @param {number} ordinalPosition - The position of the column in the table
 * @returns {object} - The formatted column object
 */
export const createColumnObject = (columnData, tableName, ordinalPosition) => {
  const isVarcharType = columnData.DataType?.toLowerCase() === "varchar";
  const isIntegerType = columnData.DataType?.toLowerCase() === "integer";

  return {
    CharacterMaximumLength: isVarcharType ? 256 : isIntegerType ? null : 255,
    ColumnDefault: columnData.DefaultValue || null,
    ColumnName: columnData.ColumnName,
    DataType: isVarcharType ? "varchar" : columnData.DataType,
    IsNullable:
      columnData.isNullable !== undefined ? columnData.isNullable : true,
    NumericPrecision: isIntegerType ? 32 : null,
    NumericScale: isIntegerType ? 0 : null,
    OrdinalPosition: ordinalPosition,
    TableName: tableName,
  };
};

/**
 * Adds a column to a table in the local state
 *
 * @param {object} columnData - The column data from the form
 * @param {number} selectedTableId - The ID of the selected table
 * @param {array} tables - The current tables array from Redux state
 * @param {function} dispatch - The Redux dispatch function
 * @returns {boolean} - True if the column was added successfully, false otherwise
 */
export const addColumnToTable = (
  columnData,
  selectedTableId,
  tables,
  dispatch,
) => {
  // Find the selected table
  const selectedTable = tables.find((table) => table.id === selectedTableId);

  if (selectedTable) {
    // Get the max ordinal position
    const maxOrdinalPosition = Math.max(
      ...selectedTable.schema.Columns.map((col) => col.OrdinalPosition),
      0,
    );

    // Create new column object
    const newColumn = createColumnObject(
      columnData,
      selectedTable.name,
      maxOrdinalPosition + 1,
    );

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
    return true;
  }

  return false;
};

/**
 * Prepares and updates the local state when a new row is added
 *
 * @param {object} rowData - The row data to add
 * @param {number} selectedTableId - The ID of the selected table
 * @param {array} tables - The current tables array from Redux state
 * @param {object} apiTableData - The API table data from Redux state
 * @param {function} dispatch - The Redux dispatch function
 * @returns {object} - The selected table object
 */
export const prepareRowAddition = (
  rowData,
  selectedTableId,
  tables,
  apiTableData,
  dispatch,
) => {
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
    }

    return selectedTable;
  }

  return null;
};
