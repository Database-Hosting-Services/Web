import React from 'react';
import PropTypes from 'prop-types';

const EmptyState = ({ onCreateTable }) => {
  return (
    <div className="bg-[#17182B] p-6 rounded-lg shadow-lg max-w-md border border-tertiary">
      <h2 className="text-white text-2xl font-medium mb-3 text-left">
        Table Editor
      </h2>
      <p className="text-gray-400 mb-6 text-left">
        There are no tables available in this schema.
      </p>
      <div>
        <button
          className="custom-gradient text-white font-normal px-5 py-2 rounded-lg inline-block text hover:cursor-pointer"
          onClick={onCreateTable}
        >
          Create new table
        </button>
      </div>
    </div>
  );
};

EmptyState.propTypes = {
  onCreateTable: PropTypes.func.isRequired
};

export default EmptyState;
