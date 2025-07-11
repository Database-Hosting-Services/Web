import PropTypes from "prop-types";
import ColumnRow from "./ColumnRow";

const ColumnList = ({ columns, onColumnChange, onAddColumn, tableData }) => {
  // Handler for column modification
  const handleColumnChange = (index, field, value) => {
    const updatedColumns = columns.map((col, i) => {
      if (i === index) {
        return { ...col, [field]: value };
      }
      return col;
    });

    onColumnChange({
      Columns: updatedColumns,
    });
  };

  // Toggle column as primary key
  const handleSetPrimary = (index) => {
    const selectedColumn = columns[index];

    console.log("Toggling primary key on column:", selectedColumn.ColumnName);

    // Check if this column is already a primary key
    const isPrimaryKey = tableData?.schema?.Constraints?.some(
      (constraint) =>
        constraint.ConstraintType === "PRIMARY KEY" &&
        constraint.ColumnName === selectedColumn.ColumnName,
    );

    // Get existing constraints
    const existingConstraints = tableData?.schema?.Constraints || [];
    let updatedConstraints = [];
    let updatedIndexes = tableData?.schema?.Indexes || [];

    if (isPrimaryKey) {
      // If it's already a primary key, remove the constraint
      console.log(
        "Removing PRIMARY KEY constraint from column:",
        selectedColumn.ColumnName,
      );
      updatedConstraints = existingConstraints.filter(
        (constraint) =>
          !(
            constraint.ConstraintType === "PRIMARY KEY" &&
            constraint.ColumnName === selectedColumn.ColumnName
          ),
      );

      // Also remove the matching index
      updatedIndexes = updatedIndexes.filter(
        (index) =>
          !(index.IsPrimary && index.ColumnName === selectedColumn.ColumnName),
      );
    } else {
      // If it's not a primary key, make it one

      // First, remove any existing PRIMARY KEY constraints
      updatedConstraints = existingConstraints.filter(
        (constraint) => constraint.ConstraintType !== "PRIMARY KEY",
      );

      // Create a new PRIMARY KEY constraint for the selected column
      const newPrimaryKeyConstraint = {
        TableName: tableData?.name || "",
        ConstraintName: `${tableData?.name || ""}_pk_${
          selectedColumn.ColumnName
        }`,
        ConstraintType: "PRIMARY KEY",
        ColumnName: selectedColumn.ColumnName,
        ForeignTableName: null,
        ForeignColumnName: null,
        CheckClause: null,
        OrdinalPosition: 1,
      };

      // Add the new constraint
      updatedConstraints.push(newPrimaryKeyConstraint);

      console.log(
        "Created new PRIMARY KEY constraint:",
        newPrimaryKeyConstraint,
      );

      // Remove any existing primary key indexes
      updatedIndexes = updatedIndexes.filter((index) => !index.IsPrimary);

      // Create a new primary key index
      const newPrimaryKeyIndex = {
        TableName: tableData?.name || "",
        IndexName: `${tableData?.name || ""}_pk_${selectedColumn.ColumnName}`,
        IndexType: "btree",
        ColumnName: selectedColumn.ColumnName,
        IsPrimary: true,
        IsUnique: true,
      };

      // Add the new index
      updatedIndexes.push(newPrimaryKeyIndex);
    }

    // Update the schema with new constraints and indexes
    onColumnChange({
      Columns: columns,
      Constraints: updatedConstraints,
      Indexes: updatedIndexes,
    });

    console.log(
      "Updated schema with PRIMARY KEY changes for column:",
      selectedColumn.ColumnName,
    );
    console.log("Constraints after update:", updatedConstraints);
  };

  // Remove a column
  const handleRemoveColumn = (index) => {
    const updatedColumns = columns.filter((_, i) => i !== index);
    onColumnChange({
      Columns: updatedColumns,
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
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1"
              ></circle>
              <text
                x="12"
                y="16"
                textAnchor="middle"
                fontSize="14"
                fill="currentColor"
              >
                i
              </text>
            </svg>
          </span>
        </div>
        <span className="w-1/4">Type</span>
        <div className="w-1/4">
          <span className="flex items-center">
            Default value
            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1"
              ></circle>
              <text
                x="12"
                y="16"
                textAnchor="middle"
                fontSize="14"
                fill="currentColor"
              >
                i
              </text>
            </svg>
          </span>
        </div>
        <span className="w-1/4">Primary</span>
      </div>

      {/* Column rows */}
      {columns.map((column, index) => (
        <ColumnRow
          key={index}
          column={column}
          index={index}
          onChange={handleColumnChange}
          onSetPrimary={() => handleSetPrimary(index)}
          onRemove={handleRemoveColumn}
          disableRemove={columns.length <= 1}
          tableData={tableData}
        />
      ))}

      {/* Add column button */}
      <div className="border border-dashed border-[#262840] rounded-md p-3 flex justify-center hover:cursor-pointer">
        <button className="text-gray-400 text-sm " onClick={onAddColumn}>
          Add column
        </button>
      </div>
    </div>
  );
};

ColumnList.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      CharacterMaximumLength: PropTypes.number,
      ColumnDefault: PropTypes.string,
      ColumnName: PropTypes.string.isRequired,
      DataType: PropTypes.string.isRequired,
      IsNullable: PropTypes.bool.isRequired,
      NumericPrecision: PropTypes.number,
      NumericScale: PropTypes.number,
      OrdinalPosition: PropTypes.number.isRequired,
      TableName: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onColumnChange: PropTypes.func.isRequired,
  onAddColumn: PropTypes.func.isRequired,
  tableData: PropTypes.shape({
    name: PropTypes.string,
    schema: PropTypes.shape({
      Constraints: PropTypes.array,
      Indexes: PropTypes.array,
    }),
  }),
};

ColumnList.defaultProps = {
  tableData: null,
};

export default ColumnList;
