import "./index.css";
import { useEffect, useState } from "react";
import { MoveRight } from "lucide-react";
import { getProducts } from "../../services/products.service";
import ProductCard from "../../components/fragments/ProductCard";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.user.data);
  const [popularProducts, setPopularProducts] = useState([]);
  useEffect(() => {
    getProducts((products) => {
      if (Array.isArray(products)) {
        const filteredProducts = products
          .sort((a, b) => b.rating.count - a.rating.count)
          .slice(0, 10);
        setPopularProducts(filteredProducts);
      } else {
        console.log("error fetching products");
      }
    });
  }, []);

  return (
    <>
      <div className="bg-gray-800 w-full flex">
        <div className=" w-full md:w-5/7 flex flex-col justify-center items-center">
          <div className="p-10 flex flex-col justify-center items-start gap-4">
            <h1 className="text-white font-bold text-2xl md:text-5xl lg:text-6xl">
              Get up to 30% off
            </h1>
            <h1 className="text-primary-yellow font-bold text-2xl md:text-5xl lg:text-6xl">
              Popular Products
            </h1>
            <p className="text-white">
              Introducing our popular collection of products
            </p>
            <a
              href="#popular"
              className="border-white border text-white flex gap-2 py-2 px-3 mt-4 hover:bg-dark-blue"
            >
              Place your Order
              <MoveRight color="white" />
            </a>
          </div>
        </div>
        <div className="w-2/7 hidden md:flex justify-center bg-primary-yellow rounded-l-4xl relative h-120">
          <img
            src={"./public/model.png"}
            alt="Model"
            className="object-cover h-128 absolute top-5"
          />
        </div>
      </div>
      <div id="popular" className="mt-18 w-9/10 mx-auto">
        <div className="flex justify-center gap-4 items-center flex-col mb-10">
          <h3 className="text-2xl text-center font-semibold text-dark-blue">
            POPULAR THIS WEEK
          </h3>
          <div className="h-1 w-24 bg-dark-blue rounded-3xl"></div>
        </div>
        <div className="flex gap-6 justify-between flex-wrap mb-24">
          {popularProducts.map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
        </div>
      </div>
    </>
  );
};

export default HomePage;
