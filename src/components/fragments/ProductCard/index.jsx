const ProductCard = ({ product, isCarousel = false }) => {
  return (
    <>
      <div
        key={product.id}
        className={`${
          isCarousel
            ? "w-full flex justify-center items-center flex-col"
            : "w-3/7 md:w-1/4 lg:w-1/6"
        }  p-3 cursor-pointer hover:shadow-2xl rounded-2xl transition-all duration-400 h-fit `}
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-40 w-40 mb-6 object-contain mx-auto"
        />
        <div className="flex flex-col justify-between">
          <p className="line-clamp-1 font-bold text-sm lg:text-base">
            {product.title}
          </p>
          <div className="flex flex-col justify-end h-full">
            <p className="capitalize line-clamp-1 text-gray-500 text-[12px] lg:text-sm">
              {product.category}
            </p>
            <p>${product.price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
