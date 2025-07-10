import { Form, useNavigate } from "react-router-dom";

import { xImg, historyClockImg, sendTextImg } from "../assets";
import TopIcon from "./ui/TopIcon";
import { useDashboardContext } from "../../dashboard/store/DashboardContext";
import Visualizer from "./Visualizer";

import { getTableDataAndEdges } from "../../schema-visualizer/utils";
import { tmpFetchedTables2 } from "../../schema-visualizer/data/tmp";

const Agent = ({ onSwitchToChat }) => {
  const navigate = useNavigate();
  const {
    projectData: { _id: projectId },
  } = useDashboardContext();

  return (
    <>
      {/* ****************************** Left Part (Chat) ****************************** */}
      <div className="flex flex-col gap-5.5 px-8 py-10">
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
        {/* ==================== Welcome ==================== */}
        <div className="flex-1 p-4 border-2 border-tertiary border-solid rounded-lg overflow-y-auto">
          <p className="text-white text-sm">
            This is a chat interface where you can interact with the AI agent.
            You can ask questions, get help with your project, or just have a
            conversation. The AI is here to assist you with anything you need.
          </p>
        </div>
        {/* ========================= Chat Input ========================= */}
        <Form
          method="post"
          action="send-prompt/"
          className="flex items-center gap-1"
        >
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
      <div className="bg-[#131424]">
        <Visualizer
          tableNodesAndEdges={getTableDataAndEdges(tmpFetchedTables2)}
        />
      </div>
    </>
  );
};

export default Agent;
