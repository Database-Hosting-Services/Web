import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  openColumnModal,
  openRowModal,
} from "../../../../store/tableEditorSlice";

const InsertPanel = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const insertPanelRef = useRef(null);

  // Handle click outside to close insert panel
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        insertPanelRef.current &&
        !insertPanelRef.current.contains(event.target)
      ) {
        onClose();
      }
    }

    // Add event listener if insert panel is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={insertPanelRef}
      className="absolute top-full left-0 mt-2 w-[300px] bg-secondary rounded-lg shadow-lg z-10"
    >
      <div className="p-2">
        {/* Insert Row Option */}
        <div
          className="p-3 hover:bg-[#353644] rounded-md cursor-pointer"
          onClick={() => {
            dispatch(openRowModal());
            onClose(); // Close the panel after selecting an option
          }}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="2" y="5" width="20" height="3" rx="1" fill="white" />
                <rect
                  x="2"
                  y="10.5"
                  width="20"
                  height="3"
                  rx="1"
                  fill="white"
                />
                <rect x="2" y="16" width="20" height="3" rx="1" fill="white" />
              </svg>
            </div>
            <div>
              <p className="text-white font-medium text-base">insert row</p>
              <p className="text-gray-400 text-xs">
                insert a new row into table's name
              </p>
            </div>
          </div>
        </div>

        {/* Insert Column Option */}
        <div
          className="p-3 hover:bg-[#353644] rounded-md cursor-pointer mt-1"
          onClick={() => {
            dispatch(openColumnModal());
            onClose(); // Close the panel after selecting an option
          }}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="2" width="4" height="20" rx="1" fill="white" />
                <rect x="10" y="2" width="4" height="20" rx="1" fill="white" />
                <rect x="16" y="2" width="4" height="20" rx="1" fill="white" />
              </svg>
            </div>
            <div>
              <p className="text-white font-medium text-base">insert column</p>
              <p className="text-gray-400 text-xs">
                insert a new column into table's name
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsertPanel;
