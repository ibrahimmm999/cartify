import { Outlet, useLocation } from "react-router";

const AuthLayout = () => {
  const location = useLocation();
  const type = location.pathname.includes("login") ? "login" : "register";
  return (
    <div className="bg-white w-full h-screen block md:flex">
      {type === "login" ? (
        <>
          {" "}
          <img
            src={"./public/auth-bg.jpg"}
            alt="bg"
            className="block w-full md:w-1/2 h-1/3 md:h-full object-cover"
          />
          <div className="h-2/3 w-full md:w-1/2 lg:w-1/3 mx-auto">
            <Outlet />
          </div>
        </>
      ) : (
        <>
          <div className="hidden md:block h-2/3 w-full md:w-1/2 lg:w-1/3 mx-auto">
            <Outlet />
          </div>
          <img
            src={"./public/auth-bg.jpg"}
            alt="bg"
            className="block w-full md:w-1/2 h-1/3 md:h-full object-cover"
          />
          <div className="block md:hidden h-2/3 w-full md:w-1/2 lg:w-1/3 mx-auto">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default AuthLayout;
