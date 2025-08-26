// import axios from "axios";

// import { useDispatch, useSelector } from "react-redux";

// import { Link, useNavigate } from "react-router-dom";

// import { BASE_URL } from "../utils/constant";

// import { removeUser } from "../utils/UserSlice";

// const Navbar = () => {
//   const user = useSelector((store) => store.user);

//   const dispatch = useDispatch();

//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         BASE_URL + "/logout",

//         {},

//         {
//           withCredentials: true,
//         }
//       );

//       dispatch(removeUser());

//       return navigate("/");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="navbar bg-base-300 shadow-sm">
//       {" "}
//       <div className="flex-1">
//         {" "}
//         <Link to="/" className="btn btn-ghost text-xl">
//           DevTinder{" "}
//         </Link>{" "}
//       </div>{" "}
//       <div className="flex gap-2 items-center">
//         {/* Theme toggle between light and dark */}{" "}
//         <label className="flex items-center gap-2 cursor-pointer">
//           {" "}
//           <input
//             type="checkbox"
//             className="toggle theme-controller"
//             value="dark"
//             aria-label="Toggle dark mode"
//             onChange={(e) => {
//               document.documentElement.setAttribute(
//                 "data-theme",

//                 e.target.checked ? "dark" : "light"
//               );
//             }}
//           />
//           <span className="text-xs">Dark Mode</span>{" "}
//         </label>{" "}
//         {user && (
//           <div className="dropdown dropdown-end">
//             {" "}
//             <div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost btn-circle avatar"
//             >
//               {" "}
//               <div className="w-10 rounded-full">
//                 {" "}
//                 <img
//                   alt="Tailwind CSS Navbar component"
//                   src={user.photoUrl}
//                 />{" "}
//               </div>{" "}
//             </div>{" "}
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
//             >
//               {" "}
//               <li>
//                 {" "}
//                 <Link to="/profile" className="justify-between">
//                   Profile <span className="badge">New</span>{" "}
//                 </Link>{" "}
//               </li>{" "}
//               <li>
//                 <Link to={"/connections"}>connections</Link>{" "}
//               </li>{" "}
//               <li>
//                 <Link to={"/requests"}>Requests</Link>{" "}
//               </li>{" "}
//               <li>
//                 <a onClick={handleLogout}>Logout</a>{" "}
//               </li>{" "}
//             </ul>{" "}
//           </div>
//         )}{" "}
//       </div>{" "}
//     </div>
//   );
// };

// export default Navbar;

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/UserSlice";
import { useEffect, useState } from "react";
import ThemeSwitcher from '../ThemeSwitcher'
const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [showName, setShowName] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  useEffect(() => {
    if (user) {
      setTimeout(() => setShowName(true), 200); // Delay for smooth animation
    } else {
      setShowName(false);
    }
  }, [user]);

  return (
    <div className="navbar sticky top-0 z-50 bg-base-300/80 backdrop-blur-md shadow-lg border-b border-base-200">
      <div className="flex justify-between items-center w-full">
        
        {/* Left Side - Logo */}
        <div className="w-1/3 flex justify-start">
          <Link
            to="/"
            className="btn btn-ghost text-2xl font-bold tracking-wide hover:scale-105 transition-transform duration-300"
          >
            Dev<span className="text-primary">Tinder</span>
          </Link>
        </div>

        {/* Middle - Username */}
        <div className="w-1/3 flex justify-center">
          {user && (
            <span
              className={`font-semibold text-lg transition-all duration-700 ${
                showName
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
            >
              Welcome {user.firstName || user.username}
            </span>
          )}
        </div>

        {/* Right Side - Toggle & Profile */}
        <div className="w-1/3 flex justify-end items-center gap-4">
          <ThemeSwitcher/>
          {/* Profile Menu */}
          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border border-primary shadow-md hover:shadow-primary transition-all duration-300"
              >
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img alt="User avatar" src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-56 p-3 shadow-xl border border-base-200"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile <span className="badge badge-primary">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/feed" className="justify-between">
                    Feed <span className="badge badge-primary">New</span>
                  </Link>
                </li>
                
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <a onClick={handleLogout} className="text-error font-semibold">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
