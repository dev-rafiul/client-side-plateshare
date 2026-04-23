import { useState, useContext } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import { useTheme } from '../Context/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Plus,
  List,
  FileText,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  BarChart3,
  Users,
  Shield,
  Bell
} from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const { toggleTheme, isDark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Check if user is admin (you can modify this logic based on your user roles)
  const isAdmin = user?.email === 'rafiulislam040@gmail.com' || user?.role === 'admin';

  // Sidebar menu items for regular users (minimum 2 items)
  const userMenuItems = [
    {
      to: '/',
      label: 'Dashboard Home',
      icon: Home,
      end: true
    },
    {
      to: '/dashboard/add-food',
      label: 'Add Food',
      icon: Plus
    },
    {
      to: '/dashboard/manage-foods',
      label: 'Manage Foods',
      icon: List
    },
    {
      to: '/dashboard/my-requests',
      label: 'My Requests',
      icon: FileText
    }
  ];

  // Additional admin menu items (minimum 3 items for admin)
  const adminMenuItems = [
    ...userMenuItems,
    {
      to: '/dashboard/all-users',
      label: 'All Users',
      icon: Users
    },
    {
      to: '/dashboard/admin-panel',
      label: 'Admin Panel',
      icon: Shield
    },
    {
      to: '/dashboard/analytics',
      label: 'Analytics',
      icon: BarChart3
    }
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Top Navigation Bar */}
      <nav className="navbar bg-base-100 border-b border-base-200 sticky top-0 z-40 shadow-sm">
        <div className="navbar-start">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="btn btn-ghost btn-circle lg:hidden"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <NavLink to="/" className="btn btn-ghost text-xl font-bold">
            <img 
              src="https://i.ibb.co.com/wZLf9dTJ/logo-plateshare.png" 
              className="w-8 h-8 rounded-lg" 
              alt="PlateShare Logo" 
            />
            <span className="hidden sm:inline text-primary">PLATESHARE</span>
            <span className="text-base-content/60 text-sm ml-2">Dashboard</span>
          </NavLink>
        </div>

        <div className="navbar-center">
          {/* Breadcrumb or page title can go here */}
        </div>

        <div className="navbar-end flex items-center gap-2">
          {/* Notifications */}
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <Bell className="w-5 h-5" />
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>

          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
            whileTap={{ scale: 0.9 }}
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

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
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
                  {isAdmin && (
                    <span className="badge badge-primary badge-xs mt-1">Admin</span>
                  )}
                </div>
              </li>
              <div className="divider my-1"></div>
              
              {/* Menu items */}
              <li>
                <NavLink 
                  to="/profile"
                  className="px-4 py-3 flex items-center gap-3 rounded-md font-medium transition-colors focus-ring hover:bg-base-200"
                >
                  <User className="w-4 h-4" />
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard"
                  className="px-4 py-3 flex items-center gap-3 rounded-md font-medium transition-colors focus-ring hover:bg-base-200"
                >
                  <Home className="w-4 h-4" />
                  Dashboard Home
                </NavLink>
              </li>
              <li>
                <button 
                  className="px-4 py-3 flex items-center gap-3 rounded-md font-medium transition-colors focus-ring hover:bg-base-200"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </li>
              
              <div className="divider my-1"></div>
              <li>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-3 flex items-center gap-3 rounded-md font-medium text-error hover:bg-error/10 focus-ring"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-base-200 border-r border-base-300 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          variants={sidebarVariants}
          animate={sidebarOpen ? 'open' : 'closed'}
          transition={{ type: 'tween', duration: 0.3 }}
        >
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-base-300">
              <h2 className="text-lg font-semibold text-base-content">
                {isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
              </h2>
              <p className="text-sm text-base-content/60">
                Welcome back, {user?.displayName?.split(' ')[0] || 'User'}
              </p>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                          isActive
                            ? 'bg-primary text-primary-content shadow-md'
                            : 'text-base-content hover:bg-base-300'
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-base-300">
              <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-base-content truncate">
                    {user?.displayName || 'User'}
                  </p>
                  <p className="text-xs text-base-content/60 truncate">
                    {isAdmin ? 'Administrator' : 'Community Member'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;