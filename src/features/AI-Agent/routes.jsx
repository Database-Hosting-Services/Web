import { askChatBot, sendPrompt, acceptQuery, cancelQuery } from "./actions";

export const aiRoutes = [
  {
    path: "send-prompt/",
    action: sendPrompt,
    element: null,
  },
  {
    path: "accept-query/",
    action: acceptQuery,
    element: null,
  },
  {
    path: "cancel-query/",
    action: cancelQuery,
    element: null,
  },
  {
    path: "ask-chat-bot/",
    action: askChatBot,
    element: null,
  },
];
