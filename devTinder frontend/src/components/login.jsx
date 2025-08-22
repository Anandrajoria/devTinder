import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="w-4 h-4 opacity-70"
  >
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
  </svg>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const location = useLocation();
  const [isLoginForm, setIsLoginForm] = useState(location.state?.isSignUp ? false : true);
  const [userName, setUsername] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const res = await axios.post(
      BASE_URL + "/login",
      { email, password },
      { withCredentials: true }
    );
    dispatch(addUser(res.data.user));
    return navigate("/feed");
  } catch (err) {
    setError(err?.response?.data?.message || "Something went wrong");
  }
};

const handleSignUp = async () => {
  try {
    const res = await axios.post(
      BASE_URL + "/signup",
      { firstName, lastName, userName, email, password },
      { withCredentials: true }
    );
    dispatch(addUser(res.data.data));
    return navigate("/profile");
  } catch (err) {
    setError(err?.response?.data?.message || "Something went wrong");
  }
};


  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          <div className="flex flex-col gap-4">
            {!isLoginForm && (
              <>
                <label className="input input-bordered flex items-center gap-2">
                  <UserIcon />
                  <input
                    type="text"
                    className="grow"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <UserIcon />
                  <input
                    type="text"
                    className="grow"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <UserIcon />
                  <input
                    type="text"
                    className="grow"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>
              </>
            )}

            <label className="input input-bordered flex items-center gap-2">
              <svg
                className="h-[1em] opacity-70"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
              </svg>
              <input
                type="email"
                className="grow"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <div>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  className="h-[1em] opacity-70"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="8"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters"
                />
              </label>
              {!isLoginForm && (
                <div className="label">
                  <span className="label-text-alt text-xs opacity-70">
                    Must be 8+ characters with uppercase, lowercase, and
                    numbers.
                  </span>
                </div>
              )}
            </div>
          </div>

          <p className="text-error text-center mt-4">{error}</p>

          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
