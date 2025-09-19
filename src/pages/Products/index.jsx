import { Range } from "react-range";
import { useEffect, useState, useRef } from "react";
import { ChevronDown, Funnel, ArrowDownUp, X } from "lucide-react";
import { getProducts } from "../../services/products.service";
import ProductCard from "../../components/fragments/ProductCard";
import { useParams, useSearchParams } from "react-router";
import { slugify } from "../../utils/slugify";

const ProductsPage = () => {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState("Price");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showSortBy, setShowSortBy] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("search") || "";
  useEffect(() => {
    setSortBy("Price");
    setRatings([]);
    setPriceRange([0, 5000]);
    getProducts((data) => {
      if (Array.isArray(data)) {
        let filtered = data.filter(
          (item) => slugify(item.category) === category
        );

        setProducts(filtered);
        setFilteredProducts(filtered.sort((a, b) => a.price - b.price));
      }
    });
  }, [category]);

  useEffect(() => {
    if (Array.isArray(products)) {
      let filtered = products.filter((item) =>
        item.title.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [keyword]);

  const filterProducts = () => {
    let filtered = products;
    // filter by ratings
    if (ratings.length > 0) {
      filtered = products.filter((item) =>
        ratings.includes(Math.floor(item.rating.rate))
      );
    }

    // filter by price
    filtered = filtered.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    setFilteredProducts(sortProducts(filtered, sortBy));
    setShowFilter(false);
  };

  const sortProducts = (list, sortBy) => {
    let sorted = [...list];
    switch (sortBy) {
      case "Price":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "Rating":
        sorted.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "Name Asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Name Desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default: // Price
        sorted.sort((a, b) => a.price - b.price);
        break;
    }
    return sorted;
  };

  useEffect(() => {
    setFilteredProducts((prev) => sortProducts(prev, sortBy));
  }, [sortBy]);

  return (
    <>
      <div className=" w-9/10 mx-auto">
        <Header
          productsLength={filteredProducts.length}
          title={category}
          filterProducts={filterProducts}
          ratings={ratings}
          setRatings={setRatings}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
          showSortBy={showSortBy}
          setShowSortBy={setShowSortBy}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
        />

        <main className="flex">
          <aside className="bg-[#F9FAFB] w-1/6 px-6 py-10 h-fit rounded-2xl md-custom:block hidden">
            <FilterSection
              filterProducts={filterProducts}
              ratings={ratings}
              setRatings={setRatings}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </aside>
          <div className="flex flex-wrap justify-center px-6 gap-8 md:gap-16 lg:gap-20 w-full md-custom:w-5/6 mb-20">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

const Header = ({
  title,
  ratings,
  setRatings,
  priceRange,
  setPriceRange,
  filterProducts,
  productsLength,
  sortBy,
  setSortBy,
  showSortBy,
  setShowSortBy,
  showFilter,
  setShowFilter,
}) => {
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      // kalau klik di luar elemen dropdownRef → tutup
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFilter(false);
        setShowSortBy(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const sortByList = ["Price", "Rating", "Name Asc", "Name Desc"];
  return (
    <header className="flex justify-between items-center h-fit my-12 w-full">
      <div className="flex gap-2 items-center">
        <h1 className="font-bold text-base md:text-xl lg:text-2xl capitalize">
          {title.split("-")[0]}
        </h1>
        <p className="text-sm md:text-base">{`(${productsLength})`}</p>
      </div>
      {/* Sort and Filter */}
      <div
        className="flex gap-4 mr-4 md:mr-0 md:gap-8 relative"
        ref={dropdownRef}
      >
        <button
          type="button"
          className="flex md-custom:hidden items-end gap-1 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // cegah bubbling
            setShowSortBy(false);
            setShowFilter(!showFilter);
          }}
        >
          <div className="block md:hidden" type="button">
            <Funnel />
          </div>
          <div className="md:flex hidden items-end gap-2 ">
            Filter
            <ChevronDown
              size={22}
              className={`transition-transform duration-300 ${
                showFilter && "rotate-180"
              } `}
            />
          </div>
        </button>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white fixed top-0 left-0 right-0 bottom-0 px-8 py-4 transform transition-transform duration-300 ease-in-out z-50 md-custom:hidden md:absolute md:top-8 md:bg-light-gray md:rounded-xl md:w-full md:py-4 md:px-6 md:flex md:flex-col md:gap-2 md:shadow-md md:transition-all md:overflow-y-scroll md:custom-scroll md:duration-300 md:origin-top ${
            showFilter
              ? "md:h-100 md:opacity-100 md:scale-y-100 translate-x-0"
              : "md:max-h-0 md:opacity-0 md:scale-y-0 -translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-8 md:hidden">
            <h3 className="font-semibold text-2xl">Filter By</h3>
            <button
              onClick={() => {
                setShowFilter(false);
                setShowSortBy(false);
              }}
            >
              <X size={32} />
            </button>
          </div>
          <FilterSection
            filterProducts={filterProducts}
            ratings={ratings}
            setRatings={setRatings}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            isDropDown={true}
          />
        </div>
        <div className="flex md:gap-2 items-end justify-start md:w-46 ">
          <button
            onClick={() => {
              setShowFilter(false);
              setShowSortBy(!showSortBy);
            }}
            className="flex items-end gap-1 cursor-pointer"
          >
            <div className="block md:hidden">
              <ArrowDownUp />
            </div>
            <div className="md:flex items-end gap-1 cursor-pointer hidden">
              <p>Sort by:</p>
              <p className="font-bold ml-2">{sortBy}</p>
              <ChevronDown
                size={22}
                className={`transition-transform duration-300 ${
                  showSortBy && "rotate-180"
                } `}
              />
            </div>
          </button>
        </div>
        <div
          className={`bg-white fixed top-0 left-0 right-0 bottom-0 px-8 py-4 transform transition-transform duration-300 ease-in-out z-50 md:absolute md:top-8 md:bg-light-gray md:rounded-2xl md:w-full md:flex md:flex-col md:gap-2 md:shadow-md md:overflow-hidden md:transition-all md:duration-300 md:origin-top ${
            showSortBy
              ? "md:h-68 md:opacity-100 md:scale-y-100 translate-x-0"
              : "md:max-h-0 md:opacity-0 md:scale-y-0 -translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-8 md:hidden">
            <h3 className="font-semibold text-2xl">Filter By</h3>
            <button
              onClick={() => {
                setShowFilter(false);
                setShowSortBy(false);
              }}
            >
              <X size={32} />
            </button>
          </div>
          <div className="flex flex-col gap-6">
            {sortByList.map((filter, index) => (
              <button
                key={index}
                className={`px-3 pt-3 first:pt-3 last:pb-3 text-left ${
                  filter === sortBy
                    ? "font-bold cursor-default"
                    : "hover:font-semibold hover:text-gray-800 cursor-pointer"
                }`}
                type="button"
                onClick={() => {
                  setSortBy(filter);
                  setShowSortBy(!showSortBy);
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

const FilterSection = ({
  ratings,
  setRatings,
  priceRange,
  setPriceRange,
  isDropDown = false,
  filterProducts,
}) => {
  const toggleRating = (rating) => {
    if (ratings.includes(rating)) {
      setRatings(ratings.filter((r) => r !== rating));
    } else {
      setRatings([...ratings, rating]);
    }
  };
  return (
    <div className="w-full">
      <label
        htmlFor="startPrice"
        className="font-bold mb-5 lg:text-base text-sm"
      >
        PRICES
      </label>
      <div className="text-sm mb-6">
        <div className="flex w-full items-center gap-3 mt-4 text-sm lg:text-base">
          <input
            className={`bg-white border border-gray-300 px-3 py-0.5 rounded ${
              isDropDown ? "w-16" : "w-18"
            }`}
            type="number"
            id="startPrice"
            name="startPrice"
            min={0}
            max={5000}
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([
                Math.max(0, Math.min(Number(e.target.value), priceRange[1])),
                priceRange[1],
              ])
            }
          />
          -
          <input
            className={`bg-white border border-gray-300 px-3 py-0.5 rounded ${
              isDropDown ? "w-16" : "w-18"
            }`}
            type="number"
            id="endPrice"
            min={0}
            max={5000}
            name="endPrice"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([
                priceRange[0],
                Math.min(5000, Math.max(Number(e.target.value), priceRange[0])),
              ])
            }
          />
        </div>
      </div>
      <PriceRange
        isDropdown={isDropDown}
        range={priceRange}
        setPriceRange={setPriceRange}
      />
      {/* RATINGS */}
      <h3 className="font-bold mb-5 mt-10">RATINGS</h3>
      {[1, 2, 3, 4, 5].map((r) => (
        <FilterCheckbox
          key={r}
          htmlFor={String(r)}
          label={String(r)}
          checked={ratings.includes(r)}
          onChange={() => toggleRating(r)}
        />
      ))}
      <button
        onClick={filterProducts}
        className="bg-primary-yellow rounded px-6 py-2 text-center font-semibold border-2 cursor-pointer mt-8"
      >
        Apply
      </button>
    </div>
  );
};

const FilterCheckbox = ({ htmlFor, label, checked, onChange }) => {
  return (
    <div className="flex gap-2 mb-3">
      <input
        type="checkbox"
        name={htmlFor}
        id={htmlFor}
        className="accent-primary-yellow"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={htmlFor}>{label}</label>
    </div>
  );
};

const PriceRange = ({
  range = [0, 5000],
  setPriceRange,
  isDropdown = false,
}) => {
  if (!Array.isArray(range) || range.length < 2) return null;
  return (
    <div className={`w-full max-w-md  ${!isDropdown && "hidden lg:block"}`}>
      <Range
        step={10}
        min={0}
        max={5000}
        values={range}
        allowOverlap={false}
        onChange={(vals) => setPriceRange(vals)}
        renderTrack={({ props, children }) => (
          <div {...props} className="h-1 w-full bg-gray-300 rounded relative">
            <div
              className="h-1 bg-red absolute rounded"
              style={{
                left: `${(range[0] / 5000) * 100}%`,
                right: `${100 - (range[1] / 5000) * 100}%`,
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            key={props.key}
            className="h-3 w-3 bg-red-500 rounded-full border-white border-2 cursor-pointer"
          />
        )}
      />
    </div>
  );
};

export default ProductsPage;
