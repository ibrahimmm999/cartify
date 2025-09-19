import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getDetailProduct } from "../../services/products.service";
import { slugify } from "../../utils/slugify";
import { Minus, Plus, Star } from "lucide-react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [totalItem, setTotalItem] = useState(1);
  useEffect(() => {
    getDetailProduct({
      id,
      callback: (data) => {
        setProduct(data);
      },
    });
  }, [id]);
  return (
    <>
      <div className="w-9/10 mx-auto bg-white flex flex-col items-center mt-6 mb-20 md:mb-8">
        <p className="text-base w-full">
          <Link
            to={`/products/${slugify(product?.category || "")}`}
            className="hover:underline capitalize text-blue-800"
          >
            {product?.category}
          </Link>
          <span>{` > ${product?.title}`}</span>
        </p>
        <h3 className="font-bold text-xl mt-6 w-full">{product?.title}</h3>
        <div className="flex gap-2 justify-start w-full mb-6 mt-2">
          <Star color="gold" fill="gold" />
          <p className="w-full text-left text-gray-600">
            {product?.rating.rate} • ({product?.rating.count} reviews)
          </p>
        </div>
        <img src={product?.image} alt="Product Image" className="h-50 mb-6" />
        <p className="font-bold text-2xl w-full text-left">${product?.price}</p>
        <p className="text-justify mb-8 mt-2 w-full">{product?.description}</p>
        <div className="flex w-full gap-6">
          <div className="flex border rounded w-fit justify-between py-2 px-2">
            <Minus
              onClick={() => {
                if (totalItem > 0) {
                  setTotalItem((prev) => prev - 1);
                }
              }}
              className="cursor-pointer"
              color={totalItem > 0 ? "black" : "gray"}
            />
            <input
              value={totalItem}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  const number = parseInt(value || "0", 10);
                  setTotalItem(number < 0 ? 0 : number); // minimal 0
                }
              }}
              type="text"
              className="border-none focus:outline-none w-12 md:w-20 text-center font-bold"
            />
            <Plus
              className="cursor-pointer"
              onClick={() => setTotalItem((prev) => prev + 1)}
            />
          </div>
          <button
            onClick={() => console.log(totalItem)}
            disabled={totalItem < 1}
            className={`${
              totalItem > 0
                ? "bg-primary-yellow text-black"
                : "bg-gray-500 text-white border-2 border-gray-500"
            } border-2 w-fit px-6 md:px-10 cursor-pointer`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
