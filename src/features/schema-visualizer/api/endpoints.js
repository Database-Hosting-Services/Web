export const SCHEMA_VISUALIZER_ENDPOINTS = {
  // Get a list of all tables in the specified project "GET"
  getTables: (projectId) => `/projects/${projectId}/tables`,

  // Get the schema of the specified table in the project "GET"
  getTableSchema: (projectId, tableId) =>
    `/projects/${projectId}/tables/${tableId}/schema`,
};
