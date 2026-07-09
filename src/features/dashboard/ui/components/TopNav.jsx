import { Bell, Lightbulb, Menu, Moon } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../../shared/state/themeSlice";

const TopNav = () => {
  let dispatch = useDispatch();
  let { mode } = useSelector((store) => store.theme);
  let { employee } = useSelector((store) => store.auth);

  let handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hours = new Date().getHours();
    const name = employee?.name || employee?.fullname || "";
    const greetingBase = hours < 12 ? "Good morning" : hours < 18 ? "Good afternoon" : "Good evening";
    return name ? `${greetingBase}, ${name}` : `${greetingBase}!`;
  };

  return (
    <div className="flex justify-between items-center py-2 px-1">
      {/* Welcome Message / Workspace Title */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-extrabold text-(--text-primary) leading-tight tracking-tight">
          {getGreeting()}
        </h2>
        <p className="text-sm font-medium text-(--text-muted) mt-1">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={handleThemeChange}
          className="w-10 h-10 rounded-xl flex items-center justify-center bg-(--bg-surface) border border-(--border-color) hover:bg-(--bg-hover) text-(--text-primary) cursor-pointer transition duration-200"
        >
          {mode === "light" ? <Moon size={18} /> : <Lightbulb size={18} />}
        </button>

        {/* Notifications */}
        <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-(--bg-surface) border border-(--border-color) hover:bg-(--bg-hover) text-(--text-primary) relative cursor-pointer transition duration-200">
          <Bell size={18} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-purple-500 ring-2 ring-(--bg-surface) animate-pulse"></span>
        </button>

        {/* Menu (Mobile only) */}
        <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-(--bg-surface) border border-(--border-color) hover:bg-(--bg-hover) text-(--text-primary) cursor-pointer transition duration-200 md:hidden">
          <Menu size={18} />
        </button>
      </div>
    </div>
  );
};

export default TopNav;