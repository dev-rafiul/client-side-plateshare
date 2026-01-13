import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { useTheme } from "../Context/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, User, Settings, LogOut, Plus, List, FileText } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme, isDark } = useTheme();

  // Navigation link styling with design system colors
  const navLinkStyle = ({ isActive }) =>
    `relative px-4 py-2 font-semibold text-base-content hover:text-primary
     after:absolute after:left-1/2 after:-bottom-1
     after:h-[3px] after:bg-gradient-to-r after:from-primary after:via-secondary after:to-accent
     after:transition-all after:duration-300 after:ease-out
     after:-translate-x-1/2 focus-ring touch-target
     ${isActive
       ? "after:w-full text-primary"
       : "after:w-0 hover:after:w-full"}`;

  // Public navigation links (minimum 3 for logged out users)
  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/availableFoods", label: "Available Foods" },
    { to: "/login", label: "Login" }
  ];

  // Protected navigation links (minimum 5 for logged in users)
  const protectedLinks = [
    { to: "/", label: "Home" },
    { to: "/availableFoods", label: "Available Foods" },
    { to: "/add-food", label: "Add Food" },
    { to: "/manage-my-foods", label: "Manage Foods" },
    { to: "/my-food-request", label: "My Requests" }
  ];

  // Get appropriate links based on authentication state
  const navigationLinks = user ? protectedLinks : publicLinks;

  // Profile dropdown menu items
  const profileMenuItems = [
    { to: "/profile", label: "Profile", icon: User },
    { to: "/add-food", label: "Add Food", icon: Plus },
    { to: "/manage-my-foods", label: "Manage Foods", icon: List },
    { to: "/my-food-request", label: "My Requests", icon: FileText }
  ];

  return (
    <nav className="navbar bg-opacity-95 backdrop-blur-sm text-base-content shadow-sm sticky top-0 z-50 space-container">
      {/* Mobile menu button and logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-ghost lg:hidden touch-target focus-ring"
            aria-label="Open mobile menu"
          >
            <Menu className="h-5 w-5" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-lg z-20 mt-3 w-52 p-4 shadow-lg border border-base-200"
          >
            {navigationLinks.map((link) => (
              <li key={link.to}>
                <NavLink 
                  to={link.to} 
                  className={({ isActive }) => 
                    `px-4 py-3 rounded-md font-medium transition-colors focus-ring ${
                      isActive 
                        ? 'bg-primary text-primary-content' 
                        : 'text-base-content hover:bg-base-200'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Logo */}
        <NavLink 
          to="/" 
          className="btn btn-ghost text-xl font-bold focus-ring touch-target"
          aria-label="PlateShare Home"
        >
          <img 
            src="https://i.ibb.co.com/wZLf9dTJ/logo-plateshare.png" 
            className="w-12 h-12 rounded-lg" 
            alt="PlateShare Logo" 
          />
          <span className="hidden sm:inline text-primary">PLATESHARE</span>
        </NavLink>
      </div>

      {/* Desktop navigation links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">
          {navigationLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={navLinkStyle}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Theme toggle and authentication */}
      <div className="navbar-end flex items-center gap-3">
        {/* Theme toggle button */}
        <motion.button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle touch-target focus-ring"
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Sun className="w-5 h-5 text-warning" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Moon className="w-5 h-5 text-info" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Authentication section */}
        {!user ? (
          <div className="flex gap-2">
            <NavLink 
              to="/login" 
              className="btn btn-primary btn-sm touch-target focus-ring"
            >
              Login
            </NavLink>
            <NavLink 
              to="/register" 
              className="btn btn-outline btn-primary btn-sm touch-target focus-ring"
            >
              Register
            </NavLink>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar touch-target focus-ring"
              aria-label="User menu"
            >
              <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                <img
                  alt={user?.displayName || "User avatar"}
                  src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || user?.email || 'User')}&background=ebc15e&color=fff`}
                  className="rounded-full"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-20 p-2 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-lg w-64 border border-base-200"
            >
              {/* User info header */}
              <li className="menu-title px-4 py-2">
                <div className="flex flex-col">
                  <span className="font-semibold text-base-content">
                    {user?.displayName || 'User'}
                  </span>
                  <span className="text-xs text-base-content/60">
                    {user?.email}
                  </span>
                </div>
              </li>
              <div className="divider my-1"></div>
              
              {/* Menu items */}
              {profileMenuItems.map((item) => (
                <li key={item.to}>
                  <NavLink 
                    to={item.to}
                    className="px-4 py-3 flex items-center gap-3 rounded-md font-medium transition-colors focus-ring hover:bg-base-200"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
              
              <div className="divider my-1"></div>
              <li>
                <button 
                  onClick={logout}
                  className="px-4 py-3 flex items-center gap-3 rounded-md font-medium text-error hover:bg-error/10 focus-ring"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
