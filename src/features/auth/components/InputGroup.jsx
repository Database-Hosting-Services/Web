const InputGroup = ({
  label,
  name,
  error,
  type = "text",
  placeholder = "",
  defaultValue = "",
  inputWidth = "500px",
}) => {
  return (
    <div className="flex flex-col">
      {/* Label */}
      <label className="block mt-5 mb-2 p-0.5 font-light text-text text-base">
        {label}
      </label>

      {/* Input */}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        style={{ width: inputWidth }}
        className={`h-[50px] p-6 mb-1 rounded-3xl bg-secondary text-text border
          ${error?.length ? "border-[#FF0000]" : "border-tertiary"}
          focus:outline-none transition-all duration-300
          autofill:bg-secondary autofill:text-text
          [-webkit-text-fill-color:#FFFFFF]
          [box-shadow:0_0_1000px_1000px#191A30_inset]`}
      />

      {/* Error */}
      {error?.length && (
        <ul>
          {error.map((e) => (
            <li key={e}>
              <p className="min-h-[20px] font-light text-[#FF0000] text-sm duration-200">
                {e}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputGroup;
