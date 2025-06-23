const TableList = ({ tables, onSelectTable }) => {
  if (tables.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#17182B] p-6 rounded-lg shadow-lg max-w-md">
      <h2 className="text-white text-2xl font-medium mb-4 text-left">
        Tables
      </h2>
      <ul className="space-y-2">
        {tables.map((table, idx) => (
          <li 
            key={idx} 
            className="bg-[#1F2035] p-3 rounded-md text-white cursor-pointer hover:bg-[#282A45]"
            onClick={() => onSelectTable(table)}
          >
            {table.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableList;
