import { useRef, useEffect } from "react";

const FilterPanel = ({ isOpen, onClose }) => {
  const filterPanelRef = useRef(null);

  // Handle click outside to close filter panel
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterPanelRef.current && !filterPanelRef.current.contains(event.target)) {
        onClose();
      }
    }

    // Add event listener if filter panel is open
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
      ref={filterPanelRef} 
      className="absolute top-full left-0 mt-2 w-[350px] bg-secondary rounded-lg shadow-lg z-10"
    >
      <div className="p-5">
        <p className="text-white font-medium mb-1">No filters applied to this view</p>
        <p className="text-gray-400 text-sm mb-4">Add a column below to filter the view</p>
        
        <div className="flex items-center mb-4">
          <button className="flex items-center text-white text-sm mr-2">
            <span className="text-xl mr-1">+</span> Add filters
          </button>
        </div>
        
        <div className="flex justify-end">
          <button className="bg-[#682EC7] bg-gradient-to-b from-[#682EC7] to-[#5A12D3] text-white px-4 py-1 rounded-lg text-sm">
            Apply filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
