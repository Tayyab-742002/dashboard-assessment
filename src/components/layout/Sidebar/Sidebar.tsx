import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, BarChart3, Settings, X } from "lucide-react";

import { ROUTES } from "../../../utils/constants";
import type { SidebarProps } from "./Sidebar.types";
import { cn } from "../../../utils/cn";

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navItems = [
    {
      label: "Dashboard",
      path: ROUTES.DASHBOARD,
      icon: <LayoutDashboard size={20} />,
    },
    { label: "Users", path: ROUTES.USERS, icon: <Users size={20} /> },
    {
      label: "Analytics",
      path: ROUTES.ANALYTICS,
      icon: <BarChart3 size={20} />,
    },
    { label: "Settings", path: ROUTES.SETTINGS, icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen transition-transform duration-300",
          "w-64 bg-white border-r border-gray-400",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard size={20} className="text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">
              Analytics
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => onClose()}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  "text-sm font-medium",
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-700 hover:bg-gray-100"
                )
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
