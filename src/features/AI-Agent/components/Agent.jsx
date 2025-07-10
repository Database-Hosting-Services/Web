import { useEffect, useRef, useState } from "react";
import { Form, useFetcher, useNavigate } from "react-router-dom";

import { xImg, historyClockImg, sendTextImg } from "../assets";
import TopIcon from "./ui/TopIcon";
import { useDashboardContext } from "../../dashboard/store/DashboardContext";
import Visualizer from "./Visualizer";
import ChatText from "./ChatText";

const Agent = ({ onSwitchToChat }) => {
  const chatContainerRef = useRef();

  const [questionInput, setQuestionInput] = useState("");

  const [messages, setMessages] = useState([]);

  const [dbSchema, setDbSchema] = useState([]);

  const [counter, setCounter] = useState(0);

  const fetcher = useFetcher();
  const { data: { responseText, newSchema } = {} } = fetcher;

  const navigate = useNavigate();

  useEffect(() => {
    if (responseText) {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages.pop();
        newMessages.push({ text: responseText, type: "response" });
        return newMessages;
      });

      setDbSchema(newSchema || []);
      setCounter((prevCnt) => prevCnt + 1);
    }
  }, [responseText, newSchema]);

  useEffect(() => {
    if (fetcher.state === "submitting") {
      setQuestionInput("");
    }
  }, [fetcher.state]);

  const {
    projectData: { _id: projectId },
  } = useDashboardContext();

  const scrollToBottom = () => {
    if (!chatContainerRef.current) return;

    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  scrollToBottom();

  return (
    <>
      {/* ****************************** Left Part (Chat) ****************************** */}
      <div className="flex flex-col gap-5.5 px-8 py-10 w-1/2 h-full">
        {/* ==================== Top Icons ==================== */}
        <div className="flex justify-between gap-6">
          <TopIcon
            icon={xImg}
            alt="Close Chat"
            onClick={() => navigate("../")}
          />
          <TopIcon icon={historyClockImg} alt="History" onClick={null} />
        </div>
        {/* ==================== Welcome ==================== */}
        <h3 className="font-medium text-2xl text-center">
          Welcome to
          <span className="text-[#682EC7]"> orbix </span>
          AI Agent!
        </h3>
        {/* ==================== Chat Text ==================== */}
        <div
          ref={chatContainerRef}
          className="flex flex-col flex-1 gap-1 p-4 border-2 border-tertiary border-solid rounded-lg overflow-y-auto scroll-smooth"
        >
          <ChatText messages={messages} />
        </div>

        {/* ========================= Chat Input ========================= */}
        <fetcher.Form
          method="post"
          action="send-prompt/"
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
        {/* ========================= Agent Actions ========================= */}
        <div className="flex justify-center items-center gap-8">
          <div className="flex justify-center items-center">
            <button
              onClick={onSwitchToChat}
              className="bg-tertiary hover:bg-secondary px-4 py-2 rounded-lg w-55 text-white text-center transition-colors cursor-pointer"
            >
              Switch to Chat Mode
            </button>
          </div>

          <Form method="post" action="cancel-query/">
            <input type="hidden" name="projectId" value={projectId} />
            <button
              type="submit"
              className="bg-[#FF5C5C] opacity-80 hover:opacity-100 px-4 py-2 rounded-lg w-55 text-white text-center transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </Form>
          <Form method="post" action="accept-query/">
            <input type="hidden" name="projectId" value={projectId} />
            <button
              type="submit"
              className="bg-success opacity-80 hover:opacity-100 px-4 py-2 rounded-lg w-55 text-white text-center transition-colors cursor-pointer"
            >
              Accept
            </button>
          </Form>
        </div>
      </div>

      {/* ****************************** Right Part (Schema Visualizer) ****************************** */}
      <div className="bg-[#131424] w-1/2 h-full">
        <Visualizer key={counter} tableNodesAndEdges={dbSchema} />
      </div>
    </>
  );
};

export default Agent;
