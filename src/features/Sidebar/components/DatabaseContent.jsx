const DatabaseContent = () => (
  <div className="h-full">
    <h1 className="text-xl text-center font-semibold text-white mb-6 px-5 pt-4">
      Database
    </h1>

    <div className="border-b-gradient w-full"></div>

    <div className="space-y-3 px-4 pt-5">
      <div className="bg-secondary rounded-xl px-4 py-2.5 text-gray-300 border border-tertiary">
        scheme visualizer
      </div>

      <div className="px-1 py-2">
        <div className="text-white mb-2">Tables</div>
      </div>

      <div className="px-1 py-2">
        <div className="text-gray-400">Indexes</div>
      </div>
    </div>
  </div>
);

export default DatabaseContent;
