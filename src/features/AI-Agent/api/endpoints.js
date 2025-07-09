export const AI_ENDPOINTS = {
  // AI Agent Query "POST"
  sendPrompt: (projectId) => `/projects/${projectId}/ai/agent`,
  
  // Accept AI Agent Query "POST"
  acceptQuery: (projectId) => `/projects/${projectId}/ai/agent/accept`,

  // Cancel AI Agent Query "POST"
  cancelQuery: (projectId) => `/projects/${projectId}/ai/agent/cancel`,

  // Chat Bot Ask "POST"
  askChatBot: (projectId) => `/projects/${projectId}/ai/chatbot/ask`
};
