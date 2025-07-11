export const TABLE_EDITOR_ENDPOINTS = {
  // Get all tables for a project
  getTables: (projectId) => `/projects/${projectId}/tables`,

  // Create a new table for a project
  createTable: (projectId) => `/projects/${projectId}/tables`,

  // Get a specific table by ID
  getTable: (projectId, tableId) => `/projects/${projectId}/tables/${tableId}`,

  // Update a specific table
  updateTable: (projectId, tableId) =>
    `/projects/${projectId}/tables/${tableId}`,

  // Delete a specific table
  deleteTable: (projectId, tableId) =>
    `/projects/${projectId}/tables/${tableId}`,

  // Add a row to a table
  addRow: (projectId, tableId) => `/projects/${projectId}/tables/${tableId}`,
};
