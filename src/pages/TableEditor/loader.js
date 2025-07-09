import { fetchTables } from "../../features/Sidebar/actions";
import store from "../../store/store";

/**
 * Loader function for the TableEditor page
 * Fetches tables for the current project and loads them into the Redux store
 * @param {Object} params - Route parameters including projectId
 * @returns {Promise<Object>} - Data needed for the component
 */
export async function loader({ params }) {
  const { projectId } = params;

  if (!projectId) {
    console.warn("No project ID provided to TableEditor loader");
    return { tables: [] };
  }

  try {
    // Fetch tables and update Redux store
    await fetchTables(projectId, store.dispatch);
    return { success: true, projectId };
  } catch (error) {
    console.error("Error in TableEditor loader:", error);
    return {
      success: false,
      error: error?.message || "Failed to load tables",
      projectId,
    };
  }
}
