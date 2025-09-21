import { Link } from "react-router";
import Button from "../../components/elements/Button";
import Input from "../../components/elements/Input";
const Register = () => {
  return (
    <div className="px-8 py-0 flex flex-col justify-center h-full md:h-screen">
      <h1 className="font-bold text-2xl mb-6">Register</h1>
      <form>
        <Input
          label={"First Name"}
          name={"firstName"}
          placeholder={"John"}
          type="text"
        />
        <Input
          label={"Last Name"}
          name={"lastName"}
          placeholder={"Doe"}
          type="text"
        />
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
        <Button classname={"h-10 w-full mt-6"} type="button">
          Register
        </Button>
        <div className="flex gap-1 justify-center mt-2 w-full text-sm md:text-base">
          Have an account?
          <Link to={"/login"} className="font-semibold">
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
