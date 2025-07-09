export const TABLE_EDITOR_ENDPOINTS = {
  // Get all tables for a project
  getTables: (projectId) => `/api/projects/${projectId}/tables`,

  // Create a new table for a project
  createTable: (projectId) => `/api/projects/${projectId}/tables`,

  // Get a specific table by ID
  getTable: (projectId, tableId) => `/api/projects/${projectId}/tables/${tableId}`,

  // Update a specific table
  updateTable: (projectId, tableId) => `/api/projects/${projectId}/tables/${tableId}`,

  // Delete a specific table
  deleteTable: (projectId, tableId) => `/api/projects/${projectId}/tables/${tableId}`,
};
