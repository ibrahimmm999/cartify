import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getDetailProduct } from "../../services/products.service";
import { slugify } from "../../utils/slugify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import QuantitySelector from "../../components/elements/QuantitySelector";
import { Star } from "lucide-react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [totalItem, setTotalItem] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
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
        {user && (
          <div className="flex w-full gap-6">
            <QuantitySelector
              totalItem={totalItem}
              setTotalItem={setTotalItem}
            />
            <button
              onClick={() => {
                dispatch(addToCart({ id, data: product, qty: totalItem }));
              }}
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
        )}
      </div>
    </>
  );
};

export default ProductDetailPage;
