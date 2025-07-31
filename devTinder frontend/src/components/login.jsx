import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/contstant";

const Login = () => {
  const [email, setEmail] = useState("kavya.n@example.com");
  const [password, setPassword] = useState("TestAuto!25");
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleLogin = async () => {
    try {
      let res = await axios.post(
        BASE_URL,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data))
      navigate('/feed')
    } catch (error) {
      console.error("Login API Error:", error.response.data);
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email id</legend>
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
