import { useNavigate } from "react-router-dom";
import { historyClockImg, externalLinkImg, closeChatImg } from "../assets";
import TopIcon from "./ui/TopIcon";

const ChatHeader = ({ onSwitchToAgent }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* ========================= Top Icons ========================= */}
      <div className="flex justify-end gap-6">
        <TopIcon icon={historyClockImg} alt="History" onClick={null} />
        <TopIcon
          icon={externalLinkImg}
          alt="External Link"
          onClick={onSwitchToAgent}
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
    </>
  );
};

export default ChatHeader;
