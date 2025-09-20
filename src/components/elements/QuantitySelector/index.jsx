import { Minus, Plus } from "lucide-react";

const QuantitySelector = ({
  totalItem,
  setTotalItem,
  min = 0,
  classname,
  iconSize = 16,
}) => {
  return (
    <div
      className={`${classname} flex border items-center rounded w-fit justify-between py-2 px-2`}
    >
      <Minus
        size={iconSize}
        onClick={() => {
          if (totalItem > min) {
            setTotalItem(totalItem - 1);
          }
        }}
        className="cursor-pointer"
        color={totalItem > min ? "black" : "gray"}
      />
      <input
        value={totalItem}
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d*$/.test(value)) {
            const number = parseInt(value || "0", 10);
            setTotalItem(number < min ? min : number); // minimal 0
          }
        }}
        type="text"
        className="border-none focus:outline-none w-12 md:w-20 text-center font-bold"
      />
      <Plus
        size={iconSize}
        className="cursor-pointer"
        onClick={() => setTotalItem(totalItem + 1)}
      />
    </div>
  );
};

export default QuantitySelector;
