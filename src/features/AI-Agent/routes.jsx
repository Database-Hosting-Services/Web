import { askChatBot, sendPrompt } from "./actions";

export const aiRoutes = [
  {
    path: "send-prompt/",
    action: sendPrompt,
    element: null,
  },
  {
    path: "accept-query/",
    action: () => {
      console.log("Accept Query Action Triggered");
    },
    element: null,
  },
  {
    path: "cancel-query/",
    action: () => {
      console.log("Cancel Query Action Triggered");
    },
    element: null,
  },
  {
    path: "ask-chat-bot/",
    action: askChatBot,
    element: null,
  },
];
