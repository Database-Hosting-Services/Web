import { useState } from "react";
import { AddColumnModal } from "../modals";
import PropTypes from "prop-types";

const TableData = ({ data, tableName = "Table" }) => {
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);

  // Check if data is missing or empty
  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">No data available for this table</p>
      </div>
    );
  }

  // Handle both API format and legacy format
  let columns = [];
  let rows = [];

  // Check if data is in API format (has columns and rows properties)
  if (data.columns && data.rows) {
    // API format: { data: { columns: [...], rows: [...] }, message: "..." }
    columns = data.columns.map((col) => col.name);
    rows = data.rows;
  }
  // Check if data has nested data property (from API response)
  else if (data.data && data.data.columns && data.data.rows) {
    // Unwrap the nested data structure
    columns = data.data.columns.map((col) => col.name);
    rows = data.data.rows;
  }
  // Legacy format (array of objects)
  else if (Array.isArray(data)) {
    if (data.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400">This table has no data</p>
        </div>
      );
    }
    columns = Object.keys(data[0]);
    rows = data;
  }
  // If it's neither format, show an error
  else {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">Invalid data format</p>
      </div>
    );
  }

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
          {rows.map((row, index) => (
            <tr
              key={index}
              className="border-b border-tertiary hover:bg-secondary"
            >
              {columns.map((column) => (
                <td
                  key={`${index}-${column}`}
                  className="py-2 px-4 text-sm text-white border-r border-tertiary"
                >
                  {row[column] !== null && row[column] !== undefined
                    ? String(row[column])
                    : "NULL"}
                </td>
              ))}
              <td className="border-tertiary w-12"></td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddColumnModal && (
        <AddColumnModal
          onClose={() => setShowAddColumnModal(false)}
          tableName={tableName}
        />
      )}
    </div>
  );
};

TableData.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.shape({
      columns: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
        }),
      ),
      rows: PropTypes.arrayOf(PropTypes.object),
    }),
    PropTypes.shape({
      data: PropTypes.shape({
        columns: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
          }),
        ),
        rows: PropTypes.arrayOf(PropTypes.object),
      }),
      message: PropTypes.string,
    }),
  ]),
  tableName: PropTypes.string,
};

export default TableData;
