import PropTypes from 'prop-types';

const ForeignKeys = () => {
  return (
    <div className="mb-8 ">
      <h4 className="text-white text-lg font-normal mb-4 ">Foreign keys</h4>
      <div className="border border-dashed border-tertiary rounded-md p-3 flex justify-center hover:cursor-pointer">
        <button className="text-gray-400 text-sm hover:cursor-pointer">Add foreign key relation</button>
      </div>
    </div>
  );
};

ForeignKeys.propTypes = {
  // Add props here when implementing foreign key functionality
};

export default ForeignKeys;
