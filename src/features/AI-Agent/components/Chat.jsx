import { Form, Link, useNavigate } from "react-router-dom";

import {
  historyClockImg,
  externalLinkImg,
  closeChatImg,
  sendTextImg,
} from "../assets";

import TopIcon from "./ui/TopIcon";
import { useDashboardContext } from "../../dashboard/store/DashboardContext";

const Chat = ({ onSwitchToAgent }) => {
  const navigate = useNavigate();
  const {
    projectData: { _id: projectId },
  } = useDashboardContext();

  console.log(projectId);

  return (
    <div className="flex flex-col gap-5.5 px-8 py-10 w-full h-full">
      {/* ========================= Top Icons ========================= */}
      <div className="flex justify-end gap-6">
        <TopIcon icon={historyClockImg} alt="History" onClick={null} />
        <TopIcon
          icon={externalLinkImg}
          alt="External Link"
          onClick={() => alert("External link clicked")}
        />
        <TopIcon
          icon={closeChatImg}
          alt="Close Chat"
          onClick={() => navigate("../")}
        />
      </div>

      {/* ========================= Welcome ========================= */}
      <h3 className="font-medium text-2xl text-center">
        Welcome to
        <span className="text-[#682EC7]"> orbix </span>
        chat!
      </h3>

      {/* ========================= Chat Text ========================= */}
      <div className="flex-1 p-4 border-2 border-tertiary border-solid rounded-lg overflow-y-auto">
        <p className="text-white text-sm">
          This is a chat interface where you can interact with the AI agent. You
          can ask questions, get help with your project, or just have a
          conversation. The AI is here to assist you with anything you need.
        </p>
      </div>

      {/* ========================= Chat Input ========================= */}
      <Form method="post" action="" className="flex items-center gap-1">
        <input
          name="question"
          type="text"
          className="bg-secondary px-5 py-2.5 border-2 border-tertiary rounded-2xl focus:outline-none w-full"
          placeholder="Ask Anything..."
        />
        <input type="hidden" name="projectId" value={projectId} />
        <button className="cursor-pointer" type="submit">
          <img src={sendTextImg} alt="Send" />
        </button>
      </Form>

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
