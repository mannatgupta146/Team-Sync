import React from "react";
import { NavLink } from "react-router";

const NavigationTab = ({ path, title, Icon }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `flex gap-3 items-center px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl mx-3 relative ${
          isActive
            ? "bg-(--active-nav-bg) text-(--active-nav-text)"
            : "text-(--text-secondary) hover:bg-(--bg-hover)/30 hover:text-(--text-primary)"
        }`
      }
      to={path}
      end
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div className="absolute left-0 top-3 bottom-3 w-1 bg-(--active-nav-border) rounded-r-md" />
          )}
          <div className="flex items-center gap-3 pl-2">
            {Icon && React.isValidElement(Icon)
              ? React.cloneElement(Icon, { size: 18, className: "transition-colors" })
              : Icon}
            <span>{title}</span>
          </div>
        </>
      )}
    </NavLink>
  );
};

export default NavigationTab;