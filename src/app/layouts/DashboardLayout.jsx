import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import AsideNav from "../../features/dashboard/ui/components/AsideNav";
import TopNav from "../../features/dashboard/ui/components/TopNav";

const DashboardLayout = () => {
  let { mode } = useSelector((store) => store.theme);

  useEffect(() => {
    if (mode === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [mode]);

  return (
    <div className="h-screen grid grid-cols-[260px_1fr] bg-(--bg-main)">
      <div className="border-r border-white/5 bg-(--bg-surface)">
        <AsideNav />
      </div>
      <div className="flex flex-col gap-6 px-8 py-6 overflow-auto">
        <TopNav />

        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;