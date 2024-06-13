import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerFn } from "../../../requests";
import { UserContext } from "@/ContextProvider";

export function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { handleUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const { data } = await registerFn({ username, email, password, phone });
      handleUser(data);
      navigate("/venue");
    } catch ({ response: { data } }) {
      setErrorMessage(data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="m-8 flex">
      <div className="hidden h-full w-2/5 lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full rounded-3xl object-cover"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center lg:w-3/5">
        <div className="text-center">
          <Typography variant="h2" className="mb-4 font-bold">
            Join Us Today
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your email and password to register.
          </Typography>
        </div>
        <form className="mx-auto mb-2 mt-8 w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Username
            </Typography>
            <Input
              size="lg"
              placeholder="JohnDoe"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Phone
            </Typography>
            <Input
              size="lg"
              placeholder="0712345678"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Password
            </Typography>
            <Input
              size="lg"
              placeholder="******"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          {errorMessage && (
            <span className="text-xs text-red-400">{errorMessage}</span>
          )}
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black underline transition-colors hover:text-gray-900"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button
            disabled={loading}
            className="mt-6"
            fullWidth
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Register Now"}
          </Button>

          <Typography
            variant="paragraph"
            className="mt-4 text-center font-medium text-blue-gray-500"
          >
            Already have an account?
            <Link to="/auth/sign-in" className="ml-1 text-gray-900">
              Sign in
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
