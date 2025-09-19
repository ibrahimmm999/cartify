import { Search, ShoppingCart, User2, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts } from "../../../services/products.service";
import { Link, useLocation } from "react-router";
import { slugify } from "../../../utils/slugify";

const SIDEBAR_ANIM_DURATION = 1000;

const Navbar = () => {
  const [navItems, setNavItems] = useState([]);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const location = useLocation();
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

  useEffect(() => {
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
        <div className=" flex gap-20 items-center ">
          <div className=" flex gap-3 items-center ">
            <button onClick={openNav}>
              <Menu size={32} className="lg:hidden" />
            </button>
            <img src="/logo.svg" alt="logo" className="h-12 hidden md:block" />
            <p className="font-bold text-xl logo hidden md:block">Cartify</p>
          </div>
          <ul className="hidden lg:flex gap-10 ">
            {navItems?.map((item, index) => {
              const slug = item === "Home" ? "home" : slugify(item);
              return (
                <li key={index}>
                  <Link to={item === "Home" ? "/" : `/products/${slug}`}>
                    <button
                      className={` text-xl capitalize ${
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
        <div className="flex gap-8">
          <Search />
          <ShoppingCart />
          <User2 />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
