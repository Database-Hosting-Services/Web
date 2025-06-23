import { useState } from "react";
import {
  EmptyState,
  TableList,
  CreateTableModal,
} from "../components/TableEditor";

export default function TableEditor() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [tables, setTables] = useState([]);
  const [newTable, setNewTable] = useState({
    name: "",
    description: "",
    columns: [
      { name: "Id", type: "int 8", default: "Null", primary: true },
      { name: "", type: "int 8", default: "Null", primary: false },
    ],
  });

  // Handle updating the table data
  const handleTableDataChange = (updates) => {
    setNewTable((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  // Handle saving the table
  const handleSaveTable = (tableData) => {
    setTables((prev) => [...prev, tableData]);
    setShowCreateModal(false);

    // Reset newTable to default state
    setNewTable({
      name: "",
      description: "",
      columns: [
        { name: "Id", type: "int 8", default: "Null", primary: true },
        { name: "", type: "int 8", default: "Null", primary: false },
      ],
    });
  };

  // Handle selecting a table (currently just stores the selection)
  const handleSelectTable = (table) => {
    console.log("Selected table:", table);
    // Implement table selection functionality here when needed
  };

  return (
    <div className="flex items-center justify-center h-screen bg-primary">
      {/* Show table list if tables exist, otherwise show empty state */}
      {tables.length > 0 ? (
        <TableList tables={tables} onSelectTable={handleSelectTable} />
      ) : (
        <EmptyState onCreateTable={() => setShowCreateModal(true)} />
      )}

      {/* Create Table Modal */}
      {showCreateModal && (
        <CreateTableModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleSaveTable}
          tableData={newTable}
          onTableDataChange={handleTableDataChange}
        />
      )}
    </div>
  );
}
