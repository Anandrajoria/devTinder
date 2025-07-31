import { useState } from "react";

const themes = ["light", "dark"];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn m-1">
        Theme: {theme}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
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
