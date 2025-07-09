import PropTypes from "prop-types";

const ColumnRow = ({
  column,
  index,
  onChange,
  onSetPrimary,
  onRemove,
  disableRemove,
}) => {
  // Determine if this column is a primary key by checking its name
  // This is a workaround since we don't have direct access to Constraints/Indexes here
  const isPrimary = column.ColumnName.toLowerCase() === "id";

  return (
    <div className="mb-3 flex items-center group">
      <div className="flex items-center mr-2">
        <svg
          className="text-gray-400 w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>

      <div className="w-1/4 pr-2">
        <input
          className="w-full bg-secondary border border-tertiary rounded-md py-1.5 px-2 text-white"
          value={column.ColumnName}
          onChange={(e) => onChange(index, "ColumnName", e.target.value)}
        />
      </div>

      <div className="w-1/4 pr-2 relative">
        <div className="flex items-center w-full bg-secondary border border-tertiary rounded-md py-1.5 px-2 text-white">
          <span className="text-gray-400 mr-1">#</span>
          <select
            className="w-full bg-secondary text-white font-light appearance-none border-0 outline-none"
            value={column.DataType}
            onChange={(e) => onChange(index, "DataType", e.target.value)}
          >
            <option value="INTEGER">int 8</option>
            <option value="VARCHAR">VARCHAR</option>
            <option value="TEXT">TEXT</option>
            <option value="TIMESTAMP">TIMESTAMP</option>
            <option value="BOOLEAN">BOOLEAN</option>
          </select>
          <div className="pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="w-1/4 pr-2">
        <input
          className="w-full font-light bg-primary border border-tertiary rounded-md py-1.5 px-2 text-gray-400"
          value={column.ColumnDefault || ""}
          onChange={(e) => onChange(index, "ColumnDefault", e.target.value)}
          placeholder="NULL"
        />
      </div>

      <div className="w-1/4 flex items-center">
        <input
          type="checkbox"
          checked={isPrimary}
          onChange={() => onSetPrimary(index)}
          className="mr-auto accent-purple-600"
        />
        <button
          className="p-1 text-gray-400 hover:text-gray-200 mr-1"
          onClick={() => {
            /* Toggle settings */
          }}
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
          </svg>
        </button>
        <button
          className="p-1 text-gray-400 hover:text-gray-200"
          onClick={() => onRemove(index)}
          disabled={disableRemove}
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

ColumnRow.propTypes = {
  column: PropTypes.shape({
    CharacterMaximumLength: PropTypes.number,
    ColumnDefault: PropTypes.string,
    ColumnName: PropTypes.string.isRequired,
    DataType: PropTypes.string.isRequired,
    IsNullable: PropTypes.bool.isRequired,
    NumericPrecision: PropTypes.number,
    NumericScale: PropTypes.number,
    OrdinalPosition: PropTypes.number.isRequired,
    TableName: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onSetPrimary: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  disableRemove: PropTypes.bool,
};

ColumnRow.defaultProps = {
  disableRemove: false,
};

export default ColumnRow;
