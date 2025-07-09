import { useRef, useEffect, useState } from "react";

const SortPanel = ({ isOpen, onClose }) => {
  const sortPanelRef = useRef(null);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Sample columns from the table - in a real implementation these would come from props
  const columns = [
    { id: 'id', name: 'id' },
    { id: 'created_at', name: 'created_at' }
  ];

  // Handle click outside to close sort panel
  useEffect(() => {
    function handleClickOutside(event) {
      if (sortPanelRef.current && !sortPanelRef.current.contains(event.target)) {
        onClose();
      }
    }

    // Add event listener if sort panel is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleColumnSelect = (columnId) => {
    setSelectedColumn(columnId);
    setIsDropdownOpen(false);
  };
  
  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={sortPanelRef} 
      className="absolute top-full left-0 mt-2 w-[350px] bg-secondary rounded-lg shadow-lg z-10"
    >
      <div className="p-5">
        <p className="text-white font-medium mb-1">No sorts applied to this view</p>
        <p className="text-gray-400 text-sm mb-4">Add a column below to sort this view</p>
        
        <div className="flex items-center mb-4 relative">
          <div 
            className="bg-[#1A1B29] rounded-md p-2 text-white relative w-full cursor-pointer"
            onClick={toggleDropdown}
          >
            <div className="flex items-center justify-between">
              <span>{selectedColumn || 'Pick a column to sort by'}</span>
              <span>▼</span>
            </div>
            
            {/* Dropdown for columns */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#1A1B29] rounded-md z-20 max-h-32 overflow-y-auto">
                {columns.map(column => (
                  <div 
                    key={column.id} 
                    className="p-2 hover:bg-[#282939] cursor-pointer"
                    onClick={() => handleColumnSelect(column.name)}
                  >
                    {column.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button className="bg-[#682EC7] bg-gradient-to-b from-[#682EC7] to-[#5A12D3] text-white px-4 py-1 rounded-lg text-sm">
            Apply sorting
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortPanel;
