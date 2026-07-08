import { Bell, Lightbulb, Menu, Moon, Search, X } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../../shared/state/themeSlice";
import { setSearchQuery, clearSearchQuery } from "../../../../shared/state/searchSlice";

const TopNav = () => {
  let dispatch = useDispatch();
  let { mode } = useSelector((store) => store.theme);
  let { query } = useSelector((store) => store.search);

  let handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  let handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  let handleClearSearch = () => {
    dispatch(clearSearchQuery());
  };

  return (
    <div className="flex justify-between items-center py-2 px-1">
      {/* Search Bar */}
      <div className="flex gap-3 items-center w-full max-w-sm rounded-xl px-4 py-2.5 bg-[var(--bg-surface)] border border-[var(--border-color)] focus-within:border-[var(--active-nav-border)]/50 transition-all duration-300 relative">
        <Search className="text-[var(--text-muted)] shrink-0" size={18} />
        <input
          className="bg-transparent outline-none border-none w-full text-[var(--text-primary)] text-sm placeholder-[var(--text-muted)] pr-6"
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search workspace..."
        />
        {query && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3.5 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer transition duration-150"
          >
            <X size={15} />
          </button>
        )}
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

        {/* Menu (Mobile only) */}
        <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-color)] hover:bg-[var(--bg-hover)] text-[var(--text-primary)] cursor-pointer transition duration-200 md:hidden">
          <Menu size={18} />
        </button>
      </div>
    </div>
  );
};

export default TopNav;