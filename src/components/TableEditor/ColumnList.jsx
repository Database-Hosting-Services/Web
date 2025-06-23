import PropTypes from 'prop-types';
import ColumnRow from "./ColumnRow";

const ColumnList = ({ columns, onColumnChange, onAddColumn }) => {
  // Handler for column modification
  const handleColumnChange = (index, field, value) => {
    const updatedColumns = columns.map((col, i) => {
      if (i === index) {
        return { ...col, [field]: value };
      }
      return col;
    });

    onColumnChange({
      columns: updatedColumns,
    });
  };

  // Set column as primary
  const handleSetPrimary = (index) => {
    const updatedColumns = columns.map((col, i) => ({
      ...col,
      primary: i === index,
    }));

    onColumnChange({
      columns: updatedColumns,
    });
  };

  // Remove a column
  const handleRemoveColumn = (index) => {
    const updatedColumns = columns.filter((_, i) => i !== index);
    onColumnChange({
      columns: updatedColumns,
    });
  };

  return (
    <div className="mb-10">
      <h4 className="text-white text-lg font-normal mb-4">Column</h4>
      
      {/* Column headers */}
      <div className="mb-2 flex text-sm text-gray-400">
        <div className="w-1/4 pl-7">
          <span className="flex items-center">
            Name 
            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1"></circle>
              <text x="12" y="16" textAnchor="middle" fontSize="14" fill="currentColor">i</text>
            </svg>
          </span>
        </div>
        <span className="w-1/4">Type</span>
        <div className="w-1/4">
          <span className="flex items-center">
            Default value 
            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1"></circle>
              <text x="12" y="16" textAnchor="middle" fontSize="14" fill="currentColor">i</text>
            </svg>
          </span>
        </div>
        <span className="w-1/4">primary</span>
      </div>
      
      {/* Column rows */}
      {columns.map((column, index) => (
        <ColumnRow
          key={index}
          column={column}
          index={index}
          onChange={handleColumnChange}
          onSetPrimary={handleSetPrimary}
          onRemove={handleRemoveColumn}
          disableRemove={columns.length <= 1}
        />
      ))}
      
      {/* Add column button */}
      <div className="border border-dashed border-[#262840] rounded-md p-3 flex justify-center">
        <button 
          className="text-gray-400 text-sm"
          onClick={onAddColumn}
        >
          Add column
        </button>
      </div>
    </div>
  );
};

ColumnList.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      default: PropTypes.string.isRequired,
      primary: PropTypes.bool.isRequired
    })
  ).isRequired,
  onColumnChange: PropTypes.func.isRequired,
  onAddColumn: PropTypes.func.isRequired
};

export default ColumnList;
