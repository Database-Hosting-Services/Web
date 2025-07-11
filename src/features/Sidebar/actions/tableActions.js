import { privateAxios } from "../../../api";
import { SIDEBAR_ENDPOINTS } from "../api/endpoints";
import { errorToast } from "../../../utils/toastConfig";
import { setTables, setTableData } from "../../../store/tableEditorSlice";

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

      // Make sure each table has an ID for internal reference
      // (if they don't already have one)
      const tablesWithIds = tables.map((table, index) => ({
        ...table,
        id: table.id || index + 1, // Use existing ID or generate one
      }));

      // Update the Redux store with the fetched tables
      dispatch(setTables(tablesWithIds));

      return tablesWithIds;
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
    console.error("Error fetching table details:", error);
    errorToast(
      error?.response?.data?.message || "Failed to fetch table details",
    );
    return null;
  }
};

/**
 * Fetches table data with pagination, sorting, and filtering
 * @param {string|number} projectId - The ID of the project
 * @param {string|number} tableId - The ID of the table
 * @param {Function} dispatch - Redux dispatch function
 * @param {Object} options - Pagination, sorting, and filtering options
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.limit - Records per page (default: 50)
 * @param {string} options.orderBy - Column to order by
 * @param {string} options.order - Sort order (asc or desc)
 * @param {string} options.filter - Filter condition
 * @returns {Promise<Object|null>} - The table data or null if error
 */
export const fetchTableData = async (
  projectId,
  tableId,
  dispatch,
  options = {},
) => {
  const {
    page = 1,
    limit = 50,
    orderBy = "",
    order = "",
    filter = "",
  } = options;

  try {
    // Build query parameters
    let queryParams = `page=${page}&limit=${limit}`;
    if (orderBy) queryParams += `&order_by=${orderBy}`;
    if (order) queryParams += `&order=${order}`;
    if (filter) queryParams += `&filter=${filter}`;

    const url = `/projects/${projectId}/tables/${tableId}?${queryParams}`;
    const response = await privateAxios.get(url);

    if (response.data) {
      // The API response has the format:
      // { data: { columns: [...], rows: [...] }, message: "Operation successful" }
      const tableData = response.data;

      // If dispatch is provided, update Redux store
      // Store table data using the OID (tableId is the OID in this case)
      if (dispatch) {
        dispatch(
          setTableData({
            tableId, // This is the OID
            data: tableData,
          }),
        );
      }

      return tableData;
    }

    return null;
  } catch (error) {
    console.error("Error fetching table data:", error);
    errorToast(error?.response?.data?.message || "Failed to fetch table data");
    return null;
  }
};
