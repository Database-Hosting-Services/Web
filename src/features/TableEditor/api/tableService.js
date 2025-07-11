import { privateAxios } from "../../../api";
import { TABLE_EDITOR_ENDPOINTS } from "./endpoints";
import { errorToast, successToast } from "../../../utils/toastConfig";

/**
 * Creates a new table in the specified project
 * @param {number|string} projectId - The ID of the project
 * @param {object} tableData - The table data to be created
 * @returns {Promise<object|null>} - The created table or null if error
 */
export const createTable = async (projectId, tableData) => {
  try {
    // The minimal payload is now prepared in syncTableWithBackend
    // Just add the project_id if it's not already included
    const payload = {
      ...tableData,
      project_id: parseInt(projectId),
    };

    const response = await privateAxios.post(
      TABLE_EDITOR_ENDPOINTS.createTable(projectId),
      payload,
    );

    if (response.data) {
      successToast("Table created successfully");
      return response.data;
    }

    return null;
  } catch (error) {
    console.error("Error creating table:", error);
    errorToast(error?.response?.data?.message || "Failed to create table");
    throw error;
  }
};

/**
 * Updates an existing table in the specified project
 * @param {number|string} projectId - The ID of the project
 * @param {number|string} tableId - The ID of the table
 * @param {object} tableData - The updated table data
 * @returns {Promise<object|null>} - The updated table or null if error
 */
export const updateTable = async (projectId, tableId, tableData) => {
  try {
    const response = await privateAxios.put(
      TABLE_EDITOR_ENDPOINTS.updateTable(projectId, tableId),
      tableData,
    );

    if (response.data) {
      successToast("Table updated successfully");
      return response.data;
    }

    return null;
  } catch (error) {
    console.error("Error updating table:", error);
    errorToast(error?.response?.data?.message || "Failed to update table");
    throw error;
  }
};

/**
 * Adds a new row to a table
 * @param {number|string} projectId - The ID of the project
 * @param {number|string} tableId - The OID of the table
 * @param {object} rowData - The row data to add as an object with column names as keys
 * @returns {Promise<object|null>} - The added row or null if error
 */
export const addRowToTable = async (projectId, tableId, rowData) => {
  try {
    // Transform rowData from {columnName: value} format to API's expected format
    // API expects: [{ columnName: "name", value: "value" }, ...]
    const formattedData = Object.entries(rowData).map(
      ([columnName, value]) => ({
        columnName,
        value,
      }),
    );

    const response = await privateAxios.post(
      TABLE_EDITOR_ENDPOINTS.addRow(projectId, tableId),
      formattedData,
    );

    if (response.data) {
      successToast("Row added successfully");
      return response.data;
    }

    return null;
  } catch (error) {
    console.error("Error adding row to table:", error);
    errorToast(error?.response?.data?.message || "Failed to add row to table");
    throw error;
  }
};
