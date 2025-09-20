import { Search, ShoppingCart, User2, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts } from "../../../services/products.service";
import { Link, useLocation, useNavigate } from "react-router";
import { slugify } from "../../../utils/slugify";
import { useSelector } from "react-redux";

const SIDEBAR_ANIM_DURATION = 1000;

const Navbar = () => {
  const [navItems, setNavItems] = useState([]);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [keyword, setKeyword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.data);

  useEffect(() => {
    getProducts((products) => {
      if (Array.isArray(products)) {
        const uniqueCategories = [...new Set(products.map((p) => p.category))];
        setNavItems(["Home", ...uniqueCategories]);
      } else {
        console.error("error");
      }
    });
  }, []);

  const getActiveItem = () => {
    if (location.pathname === "/") return "home";
    if (location.pathname.startsWith("/products")) {
      return location.pathname.split("/products/")[1];
    }
    return "";
  };

  const navActive = getActiveItem();

  const openNav = () => {
    setIsMounted(true);
    requestAnimationFrame(() => {
      setIsNavOpen(true);
    });
  };

  const closeNav = () => {
    setIsNavOpen(false);
    setTimeout(() => {
      setIsMounted(false);
    }, SIDEBAR_ANIM_DURATION);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`${location.pathname}?search=${keyword}`);
  };

  useEffect(() => {
    setKeyword("");
    closeNav();
  }, [location.pathname]);

  return (
    <div className="relative">
      {isMounted && (
        <>
          <div
            className={`py-6 px-12 fixed top-0 left-0 h-screen w-full bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-lg
              ${isNavOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex items-center justify-between border-b border-b-gray-400 pb-6">
              <div className="flex items-center gap-3">
                <img src="/logo.svg" alt="logo" className="h-12" />
                <p className="font-bold text-xl logo hidden md:block">
                  Cartify
                </p>
              </div>
              <button onClick={closeNav} aria-label="Close menu">
                <X size={28} />
              </button>
            </div>

            <nav
              className={`flex flex-col gap-6 mt-8 transition-opacity duration-200 ease-in-out ${
                isNavOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              {navItems?.map((item, index) => {
                const slug = item === "Home" ? "home" : slugify(item);
                return (
                  <Link
                    key={index}
                    to={item === "Home" ? "/" : `/products/${slug}`}
                    onClick={closeNav}
                  >
                    <button
                      className={`text-xl capitalize w-full text-left py-2 ${
                        slug === navActive
                          ? "font-bold text-black cursor-default"
                          : "hover:font-semibold text-dark-gray font-medium"
                      }`}
                      type="button"
                    >
                      {item.split(" ")[0]}
                    </button>
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}

      <div
        className={`w-9/10 mx-auto h-20 border-b border-b-light-gray flex justify-between items-center`}
      >
        <div className=" flex gap-8 items-center ">
          <div className=" flex gap-3 items-center ">
            <button onClick={openNav}>
              <Menu size={32} className="lg:hidden" />
            </button>
            <img src="/logo.svg" alt="logo" className="h-12 hidden md:block" />
            <p className="font-bold text-xl logo hidden md:block">Cartify</p>
          </div>
          <ul className="hidden lg:flex gap-6 ">
            {navItems?.map((item, index) => {
              const slug = item === "Home" ? "home" : slugify(item);
              return (
                <li key={index}>
                  <Link to={item === "Home" ? "/" : `/products/${slug}`}>
                    <button
                      className={` text-base capitalize ${
                        slug === navActive
                          ? "font-bold text-black cursor-default"
                          : "hover:font-bold text-dark-gray font-medium cursor-pointer "
                      }`}
                      type="button"
                      // onClick={() => setNavActive(item)}
                    >
                      {item.split(" ")[0]}
                    </button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex gap-4 md:gap-8 h-full items-center justify-end">
          <form
            className={`${
              navActive == "home" && "hidden"
            } border pl-2 px-1 py-1 flex gap-1 rounded relative w-1/2`}
            onSubmit={handleSearch}
          >
            <input
              value={keyword}
              type="text"
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search..."
              className="border-none focus:outline-none flex-1 w-full"
            />
            <button type="submit" className="cursor-pointer">
              <Search />
            </button>
          </form>
          <Link to={"/cart"}>
            <div className={`${cart.length > 0 && "relative pr-1"}`}>
              <div
                className={`${
                  cart.length < 1 && "hidden"
                } h-3 w-3 rounded-4xl absolute right-0 border-2 border-white bg-red`}
              />
              <ShoppingCart />
            </div>
          </Link>
          <User2 />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
