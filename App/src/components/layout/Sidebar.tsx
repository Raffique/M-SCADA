import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  HardDrive, 
  Bell, 
  BarChart, 
  Settings,
  X 
} from 'lucide-react';

interface SidebarProps {
  closeSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-800">
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center">
          <div className="flex items-center justify-center h-8 w-8 rounded bg-teal-600 text-white font-bold">
            S
          </div>
          <span className="ml-2 text-xl font-bold text-slate-900 dark:text-white">SCADA</span>
        </div>
        {closeSidebar && (
          <button
            type="button"
            className="lg:hidden text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-white"
            onClick={closeSidebar}
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => 
            `sidebar-link ${isActive ? 'active' : ''}`
          }
          onClick={closeSidebar}
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </NavLink>

        <NavLink 
          to="/devices" 
          className={({ isActive }) => 
            `sidebar-link ${isActive ? 'active' : ''}`
          }
          onClick={closeSidebar}
        >
          <HardDrive className="h-5 w-5" />
          Devices
        </NavLink>

        <NavLink 
          to="/alarms" 
          className={({ isActive }) => 
            `sidebar-link ${isActive ? 'active' : ''}`
          }
          onClick={closeSidebar}
        >
          <Bell className="h-5 w-5" />
          Alarms
        </NavLink>

        <NavLink 
          to="/reports" 
          className={({ isActive }) => 
            `sidebar-link ${isActive ? 'active' : ''}`
          }
          onClick={closeSidebar}
        >
          <BarChart className="h-5 w-5" />
          Reports
        </NavLink>

        <NavLink 
          to="/settings" 
          className={({ isActive }) => 
            `sidebar-link ${isActive ? 'active' : ''}`
          }
          onClick={closeSidebar}
        >
          <Settings className="h-5 w-5" />
          Settings
        </NavLink>
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Company Status</p>
          <div className="mt-2 flex items-center">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
            <p className="text-sm text-slate-600 dark:text-slate-400">All systems operational</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;