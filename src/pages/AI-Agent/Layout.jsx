import { useState } from "react";

import { Agent, Chat } from "../../features/AI-Agent/components";

const Layout = () => {
  const [isAgentMode, setIsAgentMode] = useState(false);

  const onSwitchToAgent = () => {
    setIsAgentMode(true);
  };

  const onSwitchToChat = () => {
    setIsAgentMode(false);
  };

  let containerStyle = {};

  if (isAgentMode) {
    containerStyle = {
      width: "calc(100% - 100px - 20px)",
      height: "calc(100% - 20px - 10px)",
      display: "flex",
    };
  } else {
    containerStyle = {
      width: "520px",
      height: "724px",
    };
  }

  return (
    <div
      style={containerStyle}
      className="right-5 bottom-5 fixed bg-primary shadow-[0_0_15px_1px_#682EC7] border-2 border-tertiary rounded-2xl overflow-hidden transition-all duration-300 ease-in-out"
    >
      {isAgentMode ? (
        <Agent onSwitchToChat={onSwitchToChat} />
      ) : (
        <Chat onSwitchToAgent={onSwitchToAgent} />
      )}
    </div>
  );
};

export default Layout;
