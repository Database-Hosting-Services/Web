const SqlResults = ({ resultsData }) => {
  return resultsData.length > 0 ? (
    <table className="border-[#282939] border-solid rounded-md w-full">
      <thead>
        <tr className="bg-[#1c1c2e] font-semibold text-[#FFFFFF] text-xl text-center">
          {Object.keys(resultsData[0]).map((key) => (
            <th key={key} className="p-1 border border-[#282939] text-center">
              {key.toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {resultsData.map((row, idx) => (
          <tr key={idx} className="hover:bg-[#1c1c2e]">
            {Object.values(row).map((value, i) => (
              <td key={i} className="p-1 border border-[#282939] text-center">
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>Click Run to execute your query.</p>
  );
};

export default SqlResults;
