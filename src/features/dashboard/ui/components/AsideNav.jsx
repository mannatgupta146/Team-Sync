import React from "react";

import NavigationTab from "./NavigationTab";
import { MessageCircle } from "lucide-react";
import { useSelector } from "react-redux";
import {
  adminNavigation,
  employeeNavigation,
} from "../../../../app/constants/navigations";

const AsideNav = () => {
  let { employee } = useSelector((store) => store.auth);

  let navigations =
    employee?.role === "admin" ? adminNavigation : employeeNavigation;

  return (
    <div className="h-full bg-[var(--bg-surface)] flex flex-col justify-between py-6">
      <div>
        <div className="flex flex-col gap-1 p-6 mb-4">
          <h1 className="text-3xl font-bold text-[#CAB8F9] tracking-wide flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-purple-400 flex items-center justify-center text-black font-extrabold text-sm shadow-[0_0_15px_rgba(168,85,247,0.35)]">
              T
            </div>
            team-sync
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
        <div className="px-6 py-4 border-t border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white uppercase shadow-md">
            {employee.name ? employee.name[0] : 'U'}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-[var(--text-primary)] truncate">{employee.name}</span>
            <span className="text-xs text-[var(--text-muted)] truncate capitalize">{employee.role}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AsideNav;