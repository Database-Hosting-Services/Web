// InputGroup.jsx
import React from "react";

const InputGroup = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder = "",
}) => {
  return (
    <div className="flex flex-col">
      {/* Label */}
      <label className="block mb-2 p-0.5 font-light text-text text-base">
        {label}
      </label>

      {/* Input */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-[500px] h-[50px] p-6 mb-1 rounded-3xl bg-secondary text-text border
          ${error ? "border-[#FF0000]" : "border-tertiary"}
          focus:outline-none transition-all duration-300
          autofill:bg-secondary autofill:text-text
          [-webkit-text-fill-color:#FFFFFF]
          [box-shadow:0_0_1000px_1000px#191A30_inset]`}
      />

      {/* Error */}
      <p className="min-h-[20px] font-light text-[#FF0000] text-sm duration-200">
        {error || " "}
      </p>
    </div>
  );
};

export default InputGroup;
