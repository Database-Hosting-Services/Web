import PropTypes from "prop-types";

const ForeignKeys = () => {
  return (
    <div className="mb-8">
      <h4 className="mb-4 font-normal text-white text-lg">Foreign keys</h4>
      <div className="flex justify-center p-3 border border-tertiary border-dashed rounded-md hover:cursor-pointer">
        <button className="text-gray-400 text-sm hover:cursor-pointer">
          Add foreign key relation
        </button>
      </div>
    </div>
  );
};

ForeignKeys.propTypes = {
  // Add props here when implementing foreign key functionality
};

export default ForeignKeys;
