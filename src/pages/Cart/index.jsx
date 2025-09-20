import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuantitySelector from "../../components/elements/QuantitySelector";
import { Trash2 } from "lucide-react";
import { removeFromCart, updateQuantity } from "../../redux/slices/cartSlice";
import Button from "../../components/elements/Button";

const CartPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const cart = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const sum = cart.reduce((acc, item) => {
      return acc + item.data.price * item.qty;
    }, 0);
    setTotalPrice(sum);
  }, [cart]);

  return (
    <div className="w-9/10 flex flex-col items-start mt-6  mx-auto">
      <h2 className="font-bold text-2xl">Shipping Cart</h2>
      <div className="block md:flex w-full justify-between mt-6 items-start">
        {cart.length > 0 ? (
          <div className="w-full md:w-3/5 flex flex-col gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className=" border px-10 py-4 w-full flex flex-col md:flex-row md:items-center md:justify-between items-end"
              >
                <div className="flex items-center justify-start w-full gap-6">
                  <img
                    src={item.data.image}
                    className="h-18 w-18 md-for-cart:w-26 md-for-cart:h-26 object-contain"
                    alt={item.id}
                  />
                  <div className="md:w-2/3 w-full">
                    <p className="font-medium text-base line-clamp-1 ">
                      {item.data.title}
                    </p>
                    <p className="text-base">${item.data.price}</p>
                    <div className="flex md-for-cart:hidden flex-col items-start md-for-cart:items-center justify-start mt-2 md-for-cart:mt-0 md-for-cart:justify-center gap-2 ">
                      <QuantitySelector
                        classname={"h-8"}
                        totalItem={item.qty}
                        setTotalItem={(newQty) => {
                          if (newQty == 0) {
                            dispatch(removeFromCart(item.id));
                          } else {
                            dispatch(
                              updateQuantity({ id: item.id, qty: newQty })
                            );
                          }
                        }}
                      />
                      <p className="font-semibold">
                        Subtotal: ${item.data.price * item.qty}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="hidden md-for-cart:flex flex-col items-center justify-center gap-2 ">
                  <QuantitySelector
                    totalItem={item.qty}
                    setTotalItem={(newQty) => {
                      if (newQty == 0) {
                        dispatch(removeFromCart(item.id));
                      } else {
                        dispatch(updateQuantity({ id: item.id, qty: newQty }));
                      }
                    }}
                  />
                  <p className="font-semibold">
                    Subtotal: ${item.data.price * item.qty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Your cart is empty!</div>
        )}

        <div className="w-full md:w-1/3 mt-6 md:mt-0">
          <div className="border  w-full px-6 py-5 flex flex-col gap-3">
            <h3 className="font-semibold text-xl">Order Summary</h3>
            <div className="flex justify-between">
              <p>Order</p>
              <p>${totalPrice}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery</p>
              <p>${cart.length > 0 ? totalPrice : "0"}</p>
            </div>
            <div className="bg-gray-300 h-0.5 rounded-4xl w-full" />
            <div className="flex justify-between">
              <p>Total</p>
              <p>${cart.length > 0 ? totalPrice + 50 : "0"}</p>
            </div>
          </div>
          <Button classname={"w-full py-2 mt-3 "} disabled={cart.length < 0}>
            Check Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
