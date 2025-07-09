export const PROJECTS_ENDPOINTS = {
  // Get all user projects "GET"
  getProjects: () => "/projects",

  // Create a new project "POST"
  createProject: () => "/projects",

  // Get a specific project "GET"
  getProject: (projectId) => `/projects/${projectId}`,

  // Update a project "PATCH"
  updateProject: (projectId) => `/projects/${projectId}`,

  // Delete a project "DELETE"
  deleteProject: (projectId) => `/projects/${projectId}`,
};
