export const SIDEBAR_ENDPOINTS = {
  // Tables
  getTables: (projectId) => `/projects/${projectId}/tables`,
  getTableById: (projectId, tableId) =>
    `/projects/${projectId}/tables/${tableId}`,
  createTable: (projectId) => `/projects/${projectId}/tables`,
  updateTable: (projectId, tableId) =>
    `/projects/${projectId}/tables/${tableId}`,
  deleteTable: (projectId, tableId) =>
    `/projects/${projectId}/tables/${tableId}`,

  // Table data with pagination
  getTableData: (projectId, tableId, page = 1, limit = 50) =>
    `/projects/${projectId}/tables/${tableId}?page=${page}&limit=${limit}`,
};
