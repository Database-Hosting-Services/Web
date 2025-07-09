import { useState } from "react";
import { AddColumnModal } from "../modals";
import PropTypes from "prop-types";

const TableData = ({ data, tableName = "Table" }) => {
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">No data available for this table</p>
      </div>
    );
  }

  // Extract column names from the first data item
  const columns = Object.keys(data[0]);

  return (
    <div className="bg-primary overflow-auto w-full">
      <table className="min-w-full border-collapse bg-primary border border-tertiary rounded-md">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-r border-tertiary"
              >
                <div className="flex items-center">
                  <span>{column}</span>
                </div>
              </th>
            ))}
            <th className="py-3 px-4 border-b border-l border-tertiary w-12 text-right">
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setShowAddColumnModal(true)}
              >
                +
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b border-tertiary hover:bg-secondary"
            >
              {columns.map((column) => (
                <td
                  key={`${index}-${column}`}
                  className="py-3 px-4 text-sm text-white whitespace-nowrap border-r border-tertiary"
                >
                  {row[column]}
                </td>
              ))}
              <td className="py-3 px-4 text-right border-l border-tertiary"></td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddColumnModal && (
        <AddColumnModal
          tableName={tableName}
          onClose={() => setShowAddColumnModal(false)}
          onSave={(columnData) => {
            console.log("New column data:", columnData);
            // Here you would typically add the column to your table
            setShowAddColumnModal(false);
          }}
        />
      )}
    </div>
  );
};

// Add PropTypes
TableData.propTypes = {
  data: PropTypes.array,
  tableName: PropTypes.string,
};

export default TableData;
