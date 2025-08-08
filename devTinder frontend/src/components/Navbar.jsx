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
//       <div className="flex-1">
//         <Link to="/" className="btn btn-ghost text-xl">
//           DevTinder
//         </Link>
//       </div>
//       <div className="flex gap-2 items-center">
//         {/* Theme toggle between light and dark */}
//         <label className="flex items-center gap-2 cursor-pointer">
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
//           <span className="text-xs">Dark Mode</span>
//         </label>
//         {user && (
//           <div className="dropdown dropdown-end">
//             <div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost btn-circle avatar"
//             >
//               <div className="w-10 rounded-full">
//                 <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
//               </div>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
//             >
//               <li>
//                 <Link to="/profile" className="justify-between">
//                   Profile
//                   <span className="badge">New</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to={'/connections'}>connections</Link>
//               </li>
//               <li>
//                 <Link to={'/requests'}>Requests</Link>
//               </li>
//               <li>
//                 <a onClick={handleLogout}>Logout</a>
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;



// src/components/Navbar.jsx

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";
import ThemeSwitcher from "../ThemeSwitcher"; // Assuming you have the advanced ThemeSwitcher

// Import icons from react-icons
import {
  FiUser, FiLogOut, FiGitBranch, FiUsers, FiBell, FiCommand, FiSearch
} from "react-icons/fi";

// --- The Command Palette Component (⌘K) ---
const CommandPalette = ({ onClose }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const commands = [
    { name: "My Profile", path: "/profile", icon: <FiUser /> },
    { name: "My Connections", path: "/connections", icon: <FiUsers /> },
    { name: "Connection Requests", path: "/requests", icon: <FiGitBranch /> },
    { name: "Discover Feed", path: "/feed", icon: <FiSearch /> },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(search.toLowerCase())
  );

  const execute = (path) => {
    navigate(path);
    onClose();
  };
  
  // Effect to close the palette with the "Escape" key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-start pt-20" onClick={onClose}>
      <div className="card bg-base-200 w-full max-w-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="card-body p-4">
          <div className="flex items-center gap-2 border-b border-base-content/10 pb-2">
            <FiSearch className="text-xl opacity-50"/>
            <input 
              type="text" 
              placeholder="Type a command or search..." 
              className="input input-ghost w-full focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
          <ul className="menu">
            {filteredCommands.map(cmd => (
              <li key={cmd.path}>
                <a onClick={() => execute(cmd.path)}>
                  {cmd.icon}
                  {cmd.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};


// --- The Main Navbar Component ---
const Navbar = () => {
  const user = useSelector((store) => store.user?.data); // Select the nested data object
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Effect to listen for Cmd+K / Ctrl+K to open the command palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* The main navbar with "glassmorphism" effect */}
      <div className="navbar sticky top-0 z-40 bg-base-100/80 backdrop-blur-sm shadow-sm border-b border-base-content/10">
        <div className="navbar-start">
          <Link to={user ? "/feed" : "/"} className="btn btn-ghost text-xl">
            dev<span className="text-primary">Tinder</span>
          </Link>
        </div>

        <div className="navbar-end flex gap-2 items-center">
          {/* Command Palette Button */}
          <button className="btn btn-ghost btn-circle" onClick={() => setIsCommandOpen(true)}>
            <div className="indicator">
              <FiCommand className="text-xl"/>
              <kbd className="kbd kbd-xs absolute -top-1 -right-1">K</kbd>
            </div>
          </button>

          {/* Notification Bell */}
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <FiBell className="text-xl"/>
              {/* This badge can be shown conditionally based on new requests */}
              {/* <span className="badge badge-xs badge-primary indicator-item"></span> */}
            </div>
          </button>
          
          <ThemeSwitcher />

          {/* User Profile Dropdown */}
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img alt="User profile photo" src={user.photoUrl || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`} />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><Link to="/profile"><FiUser className="mr-2"/> Profile</Link></li>
                <li><Link to="/connections"><FiUsers className="mr-2"/> Connections</Link></li>
                <li><Link to="/requests"><FiGitBranch className="mr-2"/> Requests</Link></li>
                <div className="divider my-1"></div>
                <li><a onClick={handleLogout}><FiLogOut className="mr-2"/> Logout</a></li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
        </div>
      </div>
      
      {/* Conditionally render the Command Palette */}
      {isCommandOpen && <CommandPalette onClose={() => setIsCommandOpen(false)} />}
    </>
  );
};

export default Navbar;