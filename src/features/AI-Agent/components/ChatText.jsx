import Markdown from "react-markdown";

const ChatText = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">
          No messages yet. Start the conversation!
        </p>
      </div>
    );
  }

  return messages.map((message, index) => {
    if (message.type === "prompt") {
      return (
        <div key={index} className="flex justify-end">
          <div className="bg-[#682EC7] p-3 rounded-2xl rounded-tr-none max-w-[80%] text-white">
            <pre className="text-sm">{message.text}</pre>
          </div>
        </div>
      );
    } else if (message.type === "response") {
      return (
        <div key={index} className="flex justify-start">
          <div className="bg-tertiary p-3 rounded-2xl rounded-tl-none max-w-[80%] overflow-x-auto text-white">
            <Markdown>{message.text}</Markdown>
          </div>
        </div>
      );
    } else {
      // add a loader here
      return (
        <div key={index} className="flex justify-start">
          <div className="bg-tertiary p-3 rounded-2xl rounded-tl-none max-w-[80%] text-white">
            <p className="text-sm">generating response...</p>
          </div>
        </div>
      );
    }
  });
};

export default ChatText;
