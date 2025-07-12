import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ForeignKeyModal from "../modals/ForeignKeyModal";
import { useSelector } from "react-redux";

const ForeignKeys = ({ tableId, tableData, onTableDataChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [foreignKeys, setForeignKeys] = useState([]);
  const { selectedTableId, tables } = useSelector((state) => state.tableEditor);

  // Use the provided tableId or fallback to the selectedTableId from Redux
  const effectiveTableId = tableId || selectedTableId;

  // Initialize foreign keys from tableData if available
  useEffect(() => {
    if (tableData && tableData.schema && tableData.schema.Constraints) {
      // Log all constraints for debugging
      console.log(
        "All constraints in tableData:",
        tableData.schema.Constraints,
      );

      const existingForeignKeys = tableData.schema.Constraints.filter(
        (constraint) =>
          constraint.ConstraintType === "FOREIGN KEY" &&
          constraint.ForeignTableName &&
          constraint.ForeignColumnName,
      ).map((constraint) => ({
        tableId: tableData.id,
        tableColumn: constraint.ColumnName,
        referenceTableId: null, // We don't have this info directly from constraints
        referenceTableName: constraint.ForeignTableName,
        referenceColumnName: constraint.ForeignColumnName,
        constraintName: constraint.ConstraintName,
      }));

      console.log("Extracted foreign keys:", existingForeignKeys);
      setForeignKeys(existingForeignKeys);
    }
  }, [tableData]);

  const handleOpenModal = () => {
    if (effectiveTableId || tableData) {
      setShowModal(true);
    } else {
      console.error("No table selected or provided");
      // You could show a toast notification here
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveForeignKey = (foreignKeyData) => {
    // Log the incoming data from the modal
    console.log("ForeignKeys: Received foreign key data:", foreignKeyData);

    // Use the reference table name from foreignKeyData if it exists, otherwise find it from tables
    let referenceTableName = foreignKeyData.referenceTableName;

    if (!referenceTableName) {
      // Find the reference table to get its name if not provided
      const referenceTable = tables.find(
        (t) => t.id === foreignKeyData.referenceTableId,
      );

      if (!referenceTable || !referenceTable.name) {
        console.error("Cannot create foreign key: missing reference table", {
          referenceTableId: foreignKeyData.referenceTableId,
          tables,
        });
        return;
      }

      referenceTableName = referenceTable.name;
    }

    // Ensure we have valid values for the foreign key
    if (!referenceTableName || !foreignKeyData.referenceColumnName) {
      console.error(
        "Cannot create foreign key: missing reference table or column",
        {
          referenceTableName,
          referenceColumnName: foreignKeyData.referenceColumnName,
        },
      );
      return;
    }

    // Use the provided constraint name or generate one
    const constraintName =
      foreignKeyData.constraintName ||
      `${tableData ? tableData.name : ""}_fk_${
        foreignKeyData.tableColumn
      }_${referenceTableName}_${foreignKeyData.referenceColumnName}`;

    const newForeignKey = {
      ...foreignKeyData,
      referenceTableName,
      constraintName,
    };

    // Add to our local state for UI display
    setForeignKeys((prevKeys) => [...prevKeys, newForeignKey]);

    // Create a constraint object for the table schema
    const tableName = tableData ? tableData.name : "";

    // Create a single constraint object with the foreign key information
    const newConstraint = {
      TableName: tableName,
      ConstraintName: constraintName,
      ConstraintType: "FOREIGN KEY",
      ColumnName: foreignKeyData.tableColumn,
      ForeignTableName: referenceTableName,
      ForeignColumnName: foreignKeyData.referenceColumnName,
      CheckClause: null,
      OrdinalPosition: null,
    };

    // Debug logging for verification
    console.log("Creating new foreign key constraint:", {
      newConstraint,
      referenceTableName,
      column: foreignKeyData.tableColumn,
      referencedColumn: foreignKeyData.referenceColumnName,
    });

    // Update the tableData schema by adding the new constraint
    if (tableData && onTableDataChange) {
      // Get existing constraints but filter out any that might already exist for this column
      const existingConstraints = (tableData.schema.Constraints || []).filter(
        (constraint) =>
          !(
            constraint.ColumnName === foreignKeyData.tableColumn &&
            constraint.ConstraintType === "FOREIGN KEY"
          ),
      );

      // Add the new constraint to the filtered list
      onTableDataChange({
        ...tableData,
        schema: {
          ...tableData.schema,
          Constraints: [...existingConstraints, newConstraint],
        },
      });
    }

    console.log("Foreign key data:", foreignKeyData);
    console.log("New constraint:", newConstraint);

    handleCloseModal();
  };

  // Function to handle removing a foreign key
  const handleRemoveForeignKey = (index, constraintName) => {
    // Remove from local state for UI
    setForeignKeys((prevKeys) => prevKeys.filter((_, i) => i !== index));

    // Also remove from tableData's Constraints array
    if (tableData && onTableDataChange && constraintName) {
      const updatedConstraints = (tableData.schema.Constraints || []).filter(
        (constraint) => constraint.ConstraintName !== constraintName,
      );

      onTableDataChange({
        ...tableData,
        schema: {
          ...tableData.schema,
          Constraints: updatedConstraints,
        },
      });
    }
  };

  return (
    <div className="mb-8">
      <h4 className="mb-4 font-normal text-white text-lg">Foreign keys</h4>

      {/* Display existing foreign keys */}
      {foreignKeys.length > 0 && (
        <div className="mb-4 space-y-2">
          {foreignKeys.map((fk, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 rounded-md bg-secondary text-white border border-tertiary"
            >
              <div className="flex items-center">
                <span className="text-sm">{fk.tableColumn}</span>
                <span className="mx-2 text-gray-400">→</span>
                <span className="text-sm">
                  {fk.referenceColumnName}.{fk.referenceTableName}
                </span>
              </div>
              <button
                className="text-red-400 hover:text-red-600 px-2 transition-colors"
                onClick={() => handleRemoveForeignKey(index, fk.constraintName)}
                title="Remove foreign key"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Button to add a new foreign key */}
      <div
        className="flex justify-center p-3 border border-tertiary border-dashed rounded-md hover:cursor-pointer hover:bg-secondary/50 transition-colors duration-200"
        onClick={handleOpenModal}
      >
        <button className="text-gray-400 text-sm hover:cursor-pointer w-full h-full text-center">
          Add foreign key relation
        </button>
      </div>

      {showModal && (
        <ForeignKeyModal
          onClose={handleCloseModal}
          onSave={handleSaveForeignKey}
          tableId={effectiveTableId}
          tableData={tableData}
        />
      )}
    </div>
  );
};

ForeignKeys.propTypes = {
  tableId: PropTypes.number,
  tableData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    schema: PropTypes.shape({
      Columns: PropTypes.array,
      Constraints: PropTypes.array,
    }),
  }),
  onTableDataChange: PropTypes.func,
};

ForeignKeys.defaultProps = {
  tableId: null,
  tableData: null,
  onTableDataChange: null,
};

export default ForeignKeys;
