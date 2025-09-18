import { Search, ShoppingCart, User2, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts } from "../../../services/products.service";
import { Link, useLocation } from "react-router";
import { slugify } from "../../../utils/slugify";

const Navbar = () => {
  const [navItems, setNavItems] = useState([]);
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
      return location.pathname.split("/products/")[1]; // sudah slugified
    }
    return "";
  };

  const navActive = getActiveItem();
  return (
    <div className="w-9/10 mx-auto h-20 border-b border-b-light-gray flex justify-between items-center">
      <div className=" flex gap-20 items-center ">
        <div className=" flex gap-3 items-center ">
          <Menu size={32} className="lg:hidden" />
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
  );
};

export default Navbar;
