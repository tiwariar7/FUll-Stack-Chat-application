import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MessageCircle,
  Users,
  Settings,
  LogOut,
  User,
  HelpCircle,
  Info,
  Sun,
  Moon,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({
  icon,
  label,
  onClick,
  active,
}) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 w-full p-2 rounded ${
      active
        ? 'bg-blue-600 text-white'
        : 'text-gray-300 hover:bg-gray-700'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export const ChatSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const { isDark, toggleTheme } = useThemeStore();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen flex flex-col">
      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="font-semibold">{user?.username || 'Guest'}</div>
            <div className="text-sm text-gray-400">
              {user?.email || 'guest@example.com'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <NavButton
              icon={<MessageCircle className="w-5 h-5" />}
              label="Messages"
              onClick={() => navigate('/chat')}
              active={isActive('/chat')}
            />
          </li>
          <li>
            <NavButton
              icon={<Users className="w-5 h-5" />}
              label="Groups"
              onClick={() => navigate('/groups')}
              active={isActive('/groups')}
            />
          </li>
          <li>
            <NavButton
              icon={<User className="w-5 h-5" />}
              label="Users"
              onClick={() => navigate('/users')}
              active={isActive('/users')}
            />
          </li>
          <li>
            <NavButton
              icon={<Settings className="w-5 h-5" />}
              label="Settings"
              onClick={() => navigate('/settings')}
              active={isActive('/settings')}
            />
          </li>
          <li>
            <NavButton
              icon={<Info className="w-5 h-5" />}
              label="About"
              onClick={() => navigate('/about')}
              active={isActive('/about')}
            />
          </li>
          <li>
            <NavButton
              icon={<HelpCircle className="w-5 h-5" />}
              label="Help"
              onClick={() => navigate('/help')}
              active={isActive('/help')}
            />
          </li>
        </ul>
      </nav>

      {/* Theme Toggle and Logout */}
      <div className="p-4 border-t border-gray-700 space-y-2">
        <button
          onClick={toggleTheme}
          className="flex items-center space-x-3 w-full p-2 rounded hover:bg-gray-700 text-gray-300"
        >
          {isDark ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
          <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full p-2 rounded hover:bg-gray-700 text-gray-300"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};