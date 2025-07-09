export const aiRoutes = [
  {
    path: "send-prompt/",
    action: () => {
      console.log("Send Prompt Action Triggered");
    },
  },
  {
    path: "accept-query/",
    action: () => {
      console.log("Accept Query Action Triggered");
    },
  },
  {
    path: "cancel-query/",
    action: () => {
      console.log("Cancel Query Action Triggered");
    },
  },
  {
    path: "ask-chat-bot/",
    action: () => {
      console.log("Ask Chat Bot Action Triggered");
    },
  },
];
