import { privateAxios } from "../../../api";
import { SIDEBAR_ENDPOINTS } from "../api/endpoints";
import { errorToast } from "../../../utils/toastConfig";
import { setTables } from "../../../store/tableEditorSlice";

/**
 * Fetches all tables for a project and updates the Redux store
 * @param {string|number} projectId - The ID of the project to fetch tables for
 * @param {Function} dispatch - Redux dispatch function
 * @returns {Promise<Array>} - The array of tables
 */
export const fetchTables = async (projectId, dispatch) => {
  try {
    const response = await privateAxios.get(
      SIDEBAR_ENDPOINTS.getTables(projectId),
    );

    if (response.data && response.data.data) {
      const tables = response.data.data;

      // Update the Redux store with the fetched tables
      dispatch(setTables(tables));

      return tables;
    }

    return [];
  } catch (error) {
    console.error("Error fetching tables:", error);
    errorToast(error?.response?.data?.message || "Failed to fetch tables");
    return [];
  }
};

/**
 * Fetches a specific table by ID
 * @param {string|number} projectId - The ID of the project
 * @param {string|number} tableId - The ID of the table to fetch
 * @returns {Promise<Object|null>} - The table object or null if error
 */
export const fetchTableById = async (projectId, tableId) => {
  try {
    const response = await privateAxios.get(
      SIDEBAR_ENDPOINTS.getTableById(projectId, tableId),
    );

    if (response.data && response.data.data) {
      return response.data.data;
    }

    return null;
  } catch (error) {
    console.error("Error fetching table:", error);
    errorToast(
      error?.response?.data?.message || "Failed to fetch table details",
    );
    return null;
  }
};

/**
 * Fetches the data for a specific table
 * @param {string|number} projectId - The ID of the project
 * @param {string|number} tableId - The ID of the table
 * @returns {Promise<Object|null>} - The table data or null if error
 */
export const fetchTableData = async (projectId, tableId) => {
  try {
    const response = await privateAxios.get(
      SIDEBAR_ENDPOINTS.getTableData(projectId, tableId),
    );

    if (response.data && response.data.data) {
      return response.data.data;
    }

    return null;
  } catch (error) {
    console.error("Error fetching table data:", error);
    errorToast(error?.response?.data?.message || "Failed to fetch table data");
    return null;
  }
};
