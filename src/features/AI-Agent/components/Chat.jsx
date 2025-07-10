import { useFetcher } from "react-router-dom";

import { sendTextImg } from "../assets";

import { useDashboardContext } from "../../dashboard/store/DashboardContext";
import { useEffect, useRef, useState } from "react";
import ChatText from "./ChatText";
import ChatHeader from "./ChatHeader";

const Chat = ({ onSwitchToAgent }) => {
  const chatContainerRef = useRef();

  const {
    projectData: { _id: projectId },
  } = useDashboardContext();

  const [questionInput, setQuestionInput] = useState("");

  const [messages, setMessages] = useState([]);

  const fetcher = useFetcher();
  const { data: { responseText } = {} } = fetcher;

  useEffect(() => {
    if (responseText) {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages.pop();
        newMessages.push({ text: responseText, type: "response" });
        return newMessages;
      });
    }
  }, [responseText]);

  useEffect(() => {
    if (fetcher.state === "submitting") {
      setQuestionInput("");
    }
  }, [fetcher.state]);

  const scrollToBottom = () => {
    if (!chatContainerRef.current) return;
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  scrollToBottom();

  return (
    <div className="flex flex-col gap-5.5 px-8 py-10 w-full h-full">
      {/* ========================= Chat Header ========================= */}
      <ChatHeader />
      {/* ========================= Chat Text ========================= */}
      <div
        ref={chatContainerRef}
        className="flex flex-col flex-1 gap-1 p-4 border-2 border-tertiary border-solid rounded-lg overflow-y-auto"
      >
        <ChatText messages={messages} />
      </div>

      {/* ========================= Chat Input ========================= */}
      <fetcher.Form
        method="post"
        action="ask-chat-bot/"
        className="flex items-center gap-1"
      >
        <input
          name="question"
          type="text"
          className="bg-secondary px-5 py-2.5 border-2 border-tertiary rounded-2xl focus:outline-none w-full"
          placeholder="Ask Anything..."
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
        />
        <input type="hidden" name="projectId" value={projectId} />
        <button
          disabled={fetcher.state === "submitting" || !questionInput.trim()}
          className={
            fetcher.state === "submitting" || !questionInput.trim()
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }
          type="submit"
          onClick={() => {
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: questionInput, type: "prompt" },
              {},
            ]);
          }}
        >
          <img src={sendTextImg} alt="Send" />
        </button>
      </fetcher.Form>

      {/* ========================= switch to Agent mode ========================= */}
      <div className="flex justify-center items-center">
        <button
          onClick={onSwitchToAgent}
          className="bg-tertiary hover:bg-secondary px-4 py-2 rounded-lg w-55 text-white text-center transition-colors cursor-pointer"
        >
          Switch to Agent Mode
        </button>
      </div>
    </div>
  );
};

export default Chat;
