import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
const Navbar = () => {
  const user=useSelector(store=>store.user)

  

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to='/' className="btn btn-ghost text-xl">DevTinder</Link>
      </div>
      <div className="flex gap-2 items-center">
        {/* Theme toggle between light and dark */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="toggle theme-controller"
            value="dark"
            aria-label="Toggle dark mode"
            onChange={(e) => {
              document.documentElement.setAttribute(
                "data-theme",
                e.target.checked ? "dark" : "light"
              );
            }}
          />
          <span className="text-xs">Dark Mode</span>
        </label>
        {user && <div className="dropdown dropdown-end">
        
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user.photoUrl}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link  to='/profile' className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>}
      </div>
    </div>
  );
};

export default Navbar;
