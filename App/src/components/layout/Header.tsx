import React, { useState } from 'react';
import { Menu, X, Bell, Moon, Sun, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  openSidebar: () => void;
  user: {
    name: string;
    company: string;
  };
}

const Header: React.FC<HeaderProps> = ({ openSidebar, user }) => {
  const { logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm z-10">
      <div className="px-4 py-3 lg:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <button
            type="button"
            className="lg:hidden text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            onClick={openSidebar}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="ml-3 lg:ml-0 text-xl font-semibold text-slate-800 dark:text-white">
            {user.company} SCADA
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="relative p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white rounded-full"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-800"></span>
          </button>

          <button
            type="button"
            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white rounded-full"
            onClick={toggleDarkMode}
          >
            <span className="sr-only">Toggle dark mode</span>
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <div className="relative">
            <button
              type="button"
              className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center text-white">
                {user.name.charAt(0)}
              </div>
              <span className="ml-2 font-medium text-slate-700 dark:text-slate-200 hidden md:block">
                {user.name}
              </span>
              <ChevronDown className="ml-1 h-4 w-4 text-slate-500 dark:text-slate-400" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <a
                    href="#profile"
                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                    role="menuitem"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#settings"
                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                    role="menuitem"
                  >
                    Settings
                  </a>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;