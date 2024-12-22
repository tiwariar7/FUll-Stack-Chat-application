import React from 'react';
import { User, Moon, Globe } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const GeneralSettings: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">General Settings</h2>

      {/* Profile Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Profile</h3>
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-8 h-8 text-gray-500" />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Change Photo
          </button>
        </div>
        <label>
          <span className="block mb-1 text-gray-600">Username</span>
          <input
            type="text"
            defaultValue={user?.username || ''}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your username"
          />
        </label>
        <label>
          <span className="block mb-1 text-gray-600">Status</span>
          <select className="w-full p-2 border rounded-lg">
            <option>Available</option>
            <option>Busy</option>
            <option>Away</option>
          </select>
        </label>
      </div>

      {/* Language Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          Language
        </h3>
        <select className="w-full p-2 border rounded-lg">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </div>

      {/* Theme Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Moon className="w-5 h-5 mr-2" />
          Theme
        </h3>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input type="radio" name="theme" defaultChecked />
            <span className="ml-2">Light</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="theme" />
            <span className="ml-2">Dark</span>
          </label>
        </div>
      </div>
    </div>
  );
};
