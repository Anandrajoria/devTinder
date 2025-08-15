import Navbar from "./Navbar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/UserSlice";
import { useEffect } from "react";
import ErrorBoundary from "./ErrorBoundary";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (error) {
      if (error.response) {
        const status = error.response.status;

        if (status === 401) {
          navigate("/login");
        } else if (status === 403) {
          navigate("/forbidden");
        } else if (status === 404) {
          navigate("/not-found");
        } else {
          navigate("/server-error");
        }
      } else {
        // No response from server (network error, CORS, etc.)
        navigate("/server-error");
      }

      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {/* <ErrorBoundary> */}
        <Navbar />
        <Outlet />
        <Footer />
      {/* </ErrorBoundary> */}
    </>
  );
};

export default Body;
