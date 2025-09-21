import { useId } from "react";

const Input = ({ type = "text", name, label, placeholder }) => {
  const generatedId = useId();
  return (
    <div className="flex flex-col gap-2 text-dark-blue">
      <label htmlFor={name} id={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={generatedId}
        placeholder={placeholder}
        className="border border-dark-blue rounded px-4 py-2 focus:border focus:border-primary-yellow outline-none"
      />
    </div>
  );
};

export default Input;
