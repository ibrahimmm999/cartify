import { Range } from "react-range";
import { useEffect, useState, useRef } from "react";
import { ChevronDown, Funnel, ArrowDownUp } from "lucide-react";
import { getProducts } from "../../services/products.service";
import ProductCard from "../../components/fragments/ProductCard";
import { useParams } from "react-router";
import { slugify } from "../../utils/slugify";

const ProductsPage = () => {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState("Price");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
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
          filterProducts={filterProducts}
          ratings={ratings}
          setRatings={setRatings}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
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
  ratings,
  setRatings,
  priceRange,
  setPriceRange,
  filterProducts,
  sortBy,
  setSortBy,
}) => {
  const [showSortBy, setShowSortBy] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
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
        <h1 className="font-bold text-base md:text-xl lg:text-2xl">
          Mens Category
        </h1>
        <p className="text-sm md:text-base">(57)</p>
      </div>
      {/* Sort and Filter MD and SM */}
      <div className="md:hidden flex gap-4">
        <Funnel />
        <ArrowDownUp />
      </div>
      {/* Sort and Filter LG */}
      <div ref={dropdownRef} className="md:flex gap-8 hidden relative">
        <button
          className="flex md-custom:hidden items-end gap-1 cursor-pointer"
          onClick={() => {
            setShowSortBy(false);
            setShowFilter(!showFilter);
          }}
        >
          <div className="flex items-end gap-2 ">
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
          className={` md-custom:hidden absolute top-8 bg-light-gray rounded-xl w-full py-4 px-6 flex flex-col gap-2 shadow-md transition-all overflow-y-scroll custom-scroll duration-300 origin-top ${
            showFilter
              ? "max-h-100 opacity-100 scale-y-100"
              : "max-h-0 opacity-0 scale-y-0"
          }`}
        >
          <FilterSection
            filterProducts={filterProducts}
            ratings={ratings}
            setRatings={setRatings}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            isDropDown={true}
          />
        </div>
        <div className="flex gap-2 items-end justify-start w-46 ">
          <p>Sort by:</p>
          <button
            onClick={() => {
              setShowFilter(false);
              setShowSortBy(!showSortBy);
            }}
            className="flex items-end gap-1 cursor-pointer"
          >
            <p className="font-bold ml-2">{sortBy}</p>
            <ChevronDown
              size={22}
              className={`transition-transform duration-300 ${
                showSortBy && "rotate-180"
              } `}
            />
          </button>
        </div>
        <div
          className={`absolute top-8 bg-light-gray rounded-2xl w-full  flex flex-col gap-2 shadow-md overflow-hidden transition-all duration-300 origin-top ${
            showSortBy
              ? "max-h-60 opacity-100 scale-y-100"
              : "max-h-0 opacity-0 scale-y-0"
          }`}
        >
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
              isDropDown ? "w-8 lg:w-16" : "w-18"
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
              isDropDown ? "w-8 lg:w-16" : "w-18"
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
