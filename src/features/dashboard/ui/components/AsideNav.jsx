import React from "react";

import NavigationTab from "./NavigationTab";
import { MessageCircle, LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import { useAuth } from "../../../auth/hooks/useAuth";
import {
  adminNavigation,
  employeeNavigation,
} from "../../../../app/constants/navigations";

const AsideNav = () => {
  let { employee } = useSelector((store) => store.auth);
  const { onLogout } = useAuth();

  let navigations =
    employee?.role === "admin" ? adminNavigation : employeeNavigation;

  return (
    <div className="h-full bg-[var(--bg-surface)] flex flex-col justify-between py-6">
      <div>
        <div className="flex flex-col gap-1 p-6 mb-4">
          <h1 className="text-2xl font-bold tracking-wide flex items-center gap-1.5 select-none">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-extrabold text-xs shadow-sm shrink-0">
              TS
            </div>
            <span className="text-[var(--text-primary)]">team-</span>
            <span className="text-[var(--active-nav-text)] -ml-1">sync</span>
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1.5 uppercase tracking-widest font-semibold">
            Enterprise workspace
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          {navigations.map((route) => {
            return (
              <NavigationTab
                key={route.path}
                path={route.path}
                Icon={route.icon}
                title={route.title}
              />
            );
          })}
        </div>
      </div>

      {employee && (
        <div className="mx-3 p-3 mb-2 rounded-xl bg-[var(--bg-hover)]/30 border border-white/5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              {employee.avatar ? (
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-10 h-10 rounded-xl object-cover border border-white/10 shadow-[0_4px_12px_rgba(96,99,238,0.2)]"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-[var(--active-nav-bg)] text-[var(--active-nav-text)] flex items-center justify-center font-bold text-base shadow-sm border border-[var(--border-color)] select-none">
                  {employee.name ? employee.name[0].toUpperCase() : 'U'}
                </div>
              )}
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-[var(--bg-surface)]"></span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-[var(--text-primary)] truncate">{employee.name}</span>
              <span className="text-xs text-[var(--text-muted)] truncate capitalize">{employee.role}</span>
            </div>
          </div>
          <button
            onClick={onLogout}
            title="Log Out"
            className="p-2.5 rounded-lg bg-[var(--bg-surface)] hover:bg-red-500/10 hover:text-red-400 text-[var(--text-secondary)] border border-[var(--border-color)] transition duration-200 cursor-pointer shrink-0"
          >
            <LogOut size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AsideNav;