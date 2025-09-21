import { Link } from "react-router";
import Button from "../../components/elements/Button";
import Input from "../../components/elements/Input";
import { setUser } from "../../redux/slices/userSlice";
import { login } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const dispatch = useDispatch();
  const handleLogin = (event) => {
    event.preventDefault();
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    login(data, (status, res) => {
      if (status) {
        toast.success("Login Success");
        localStorage.setItem("token", res.token);
        dispatch(setUser(res));
        window.location.href = "/";
      } else {
        toast.error("Login Failed");
      }
      console.log("RES : " + res);
    });
  };
  return (
    <div className="px-8 py-0 flex flex-col justify-center h-full md:h-screen">
      <h1 className="font-bold text-2xl mb-6">Login</h1>
      <form onSubmit={handleLogin}>
        <Input
          label={"Username"}
          name={"username"}
          placeholder={"Input your username..."}
          type="text"
        />
        <div className="h-3" />
        <Input
          label={"Password"}
          name={"password"}
          placeholder={"********"}
          type="password"
        />
        <Button classname={"h-10 w-full mt-6"} type="submit">
          Login
        </Button>
        <div className="flex gap-1 justify-center mt-2 w-full text-sm md:text-base">
          Don't have an account?{" "}
          <Link to={"/register"} className="font-semibold">
            Register here
          </Link>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default LoginPage;
