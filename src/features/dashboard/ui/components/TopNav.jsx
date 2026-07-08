import { Bell, Lightbulb, Menu, Moon, Search } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../../shared/state/themeSlice";

const TopNav = () => {
  let dispatch = useDispatch();
  let { mode } = useSelector((store) => store.theme);

  let handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="flex justify-between items-center py-2 px-1">
      {/* Search Bar */}
      <div className="flex gap-3 items-center w-full max-w-sm rounded-xl px-4 py-2.5 bg-[var(--bg-surface)] border border-[var(--border-color)] focus-within:border-[#CAB8F9]/50 transition-all duration-300">
        <Search className="text-[var(--text-muted)]" size={18} />
        <input
          className="bg-transparent outline-none border-none w-full text-[var(--text-primary)] text-sm placeholder-[var(--text-muted)]"
          type="text"
          placeholder="Search workspace..."
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={handleThemeChange}
          className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-color)] hover:bg-[var(--bg-hover)] text-[var(--text-primary)] cursor-pointer transition duration-200"
        >
          {mode === "light" ? <Moon size={18} /> : <Lightbulb size={18} />}
        </button>

        {/* Notifications */}
        <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-color)] hover:bg-[var(--bg-hover)] text-[var(--text-primary)] relative cursor-pointer transition duration-200">
          <Bell size={18} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-purple-500 ring-2 ring-[var(--bg-surface)] animate-pulse"></span>
        </button>

        {/* Menu */}
        <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-color)] hover:bg-[var(--bg-hover)] text-[var(--text-primary)] cursor-pointer transition duration-200">
          <Menu size={18} />
        </button>
      </div>
    </div>
  );
};

export default TopNav;