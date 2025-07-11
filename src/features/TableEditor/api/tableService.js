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
    // Use the payload as is, without adding project_id
    // Project ID is already in the URL endpoint
    const payload = tableData;

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
 * @param {string} tableOid - The OID of the table (e.g., table_oid_1752247582297)
 * @param {object} rowData - The row data to add as an object with column names as keys
 * @returns {Promise<object|null>} - The added row or null if error
 */
export const addRowToTable = async (projectId, tableOid, rowData) => {
  try {
    // Send rowData directly as an object where keys are column names and values are the actual values
    // Example: { name: "John", age: 30, email: "john@example.com" }
    console.log("Sending row data to API:", rowData);

    const response = await privateAxios.post(
      TABLE_EDITOR_ENDPOINTS.addRow(projectId, tableOid),
      rowData,
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

/**
 * Gets table data by table OID with pagination
 * @param {number|string} projectId - The ID of the project
 * @param {string} tableOid - The OID of the table (e.g., table_oid_1752247582297)
 * @param {number} page - The page number for pagination (default: 1)
 * @param {number} limit - The number of rows per page (default: 50)
 * @returns {Promise<object|null>} - The table data or null if error
 */
export const getTableByOid = async (
  projectId,
  tableOid,
  page = 1,
  limit = 50,
) => {
  try {
    const response = await privateAxios.get(
      TABLE_EDITOR_ENDPOINTS.getTableByOid(projectId, tableOid, page, limit),
    );

    if (response.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching table with OID ${tableOid}:`, error);
    errorToast(error?.response?.data?.message || "Failed to fetch table data");
    throw error;
  }
};
