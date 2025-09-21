const Button = ({
  children,
  onClick,
  disabled = false,
  classname,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classname} ${
        !disabled
          ? "bg-primary-yellow text-black"
          : "bg-gray-500 text-white border-2 border-gray-500"
      } border-2  cursor-pointer`}
    >
      {children}
    </button>
  );
};

// w-fit px-6 md:px-10

export default Button;
