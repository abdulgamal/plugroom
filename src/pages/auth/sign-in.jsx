import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginFn } from "../../../requests";
import { UserContext } from "@/ContextProvider";

export function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleUser, user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const { data } = await loginFn({ username, password });
      handleUser(data);
      navigate("/venue");
    } catch ({ response: { data } }) {
      setErrorMessage(data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/venue");
    }
  }, []);
  return (
    <section className="m-8 flex gap-4">
      <div className="mt-24 w-full lg:w-3/5">
        <div className="text-center">
          <Typography variant="h2" className="mb-4 font-bold">
            Sign In
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your username and password to Sign In.
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
              placeholder="JaneDoe"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
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
            {loading ? "Loading ..." : "Sign In"}
          </Button>

          <div className="mt-6 flex items-center justify-between gap-2">
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center justify-start font-medium"
                >
                  Subscribe me to newsletter
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">Forgot Password</a>
            </Typography>
          </div>

          <Typography
            variant="paragraph"
            className="mt-4 text-center font-medium text-blue-gray-500"
          >
            Not registered?
            <Link to="/auth/sign-up" className="ml-1 text-gray-900">
              Create account
            </Link>
          </Typography>
        </form>
      </div>
      <div className="hidden h-full w-2/5 lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full rounded-3xl object-cover"
        />
      </div>
    </section>
  );
}

export default SignIn;
