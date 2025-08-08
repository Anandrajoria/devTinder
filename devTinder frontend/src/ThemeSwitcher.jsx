// import { useState, useEffect } from "react";

// const themes = [
//   "light",
//   "dark",
//   "cupcake",
//   "synthwave",
//   "retro",
//   "cyberpunk",
//   "valentine",
//   "aqua",
//   "forest",
//   "lofi",
// ]; // Added more themes for fun

// export default function ThemeSwitcher() {
//   // ✅ CHANGE: Initialize state from localStorage or default to "light"
//   const [theme, setTheme] = useState(() => {
//     // We check for a saved theme in localStorage
//     const savedTheme = localStorage.getItem("theme");
//     // If a theme is found, we use it. Otherwise, we default to "light".
//     return savedTheme || "light";
//   });

//   // This effect runs when the component mounts to set the initial theme
//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//   }, []);

//   const changeTheme = (newTheme) => {
//     // ✅ CHANGE: Save the new theme to localStorage
//     localStorage.setItem("theme", newTheme);

//     setTheme(newTheme);
//     document.documentElement.setAttribute("data-theme", newTheme);
//   };

//   return (
//     <div className="dropdown dropdown-end">
//       <label tabIndex={0} className="btn m-1">
//         Theme
//         <svg
//           width="12px"
//           height="12px"
//           className="h-2 w-2 fill-current opacity-60 inline-block"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 2048 2048"
//         >
//           <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
//         </svg>
//       </label>
//       <ul
//         tabIndex={0}
//         className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 z-[1]"
//       >
//         {themes.map((t) => (
//           <li key={t}>
//             <button
//               className={theme === t ? "active" : ""}
//               onClick={() => changeTheme(t)}
//             >
//               {t.charAt(0).toUpperCase() + t.slice(1)}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }




// src/components/ThemeSwitcher.jsx

import { useState, useEffect } from "react";

// ✅ UPDATED: The list of themes now matches your tailwind.config.js
const themes = [
  "light",
  "dark",
  "cupcake",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "aqua",
  "forest",
  "lofi",
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const changeTheme = (newTheme) => {
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn m-1">
        Theme
        <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 z-[1]"
      >
        {themes.map((t) => (
          <li key={t}>
            <button
              className={theme === t ? "active" : ""}
              onClick={() => changeTheme(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}