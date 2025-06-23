import PropTypes from "prop-types";

/**
 * MessageDialog component displays a modal dialog with a message and action buttons.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The title of the dialog
 * @param {string} props.message - The message to display
 * @param {function} props.onCancel - Function to call when cancelling
 * @param {function} props.onConfirm - Function to call when confirming
 * @param {string} props.confirmText - Text for the confirm button
 * @param {string} props.cancelText - Text for the cancel button
 * @param {string} props.confirmButtonClass - Additional classes for confirm button
 */
const MessageDialog = ({
  title,
  message,
  onCancel,
  onConfirm,
  confirmText = "Discard",
  cancelText = "Cancel",
  confirmButtonClass = "bg-purple-600",
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-secondary p-6 rounded-lg w-[570px] text-left">
        {/* Dialog Title */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-xl font-medium">{title}</h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Message content */}
        <div className="py-4 text-gray-200">
          <p>{message}</p>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between mt-4">
          <button
            className="w-[217px] px-8 py-2 rounded-md bg-secondary text-white font-medium border border-tertiary"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className={` w-[217px] px-8 py-2 custom-gradient rounded-md ${confirmButtonClass} text-white font-medium`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

MessageDialog.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmButtonClass: PropTypes.string,
};

export default MessageDialog;
