import React from 'react';
import { Shield, Eye, UserX } from 'lucide-react';

export const PrivacySettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Privacy Settings</h2>

      {/* Contact Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Who Can Contact Me
        </h3>
        <label>
          <span className="block mb-1 text-gray-600">
            Choose who can contact you
          </span>
          <select className="w-full p-2 border rounded-lg">
            <option>Everyone</option>
            <option>Friends Only</option>
            <option>No One</option>
          </select>
        </label>
      </div>

      {/* Online Status */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Eye className="w-5 h-5 mr-2" />
          Last Seen/Online Status
        </h3>
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span>Show when I'm online</span>
        </label>
      </div>

      {/* Blocked Users */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center">
          <UserX className="w-5 h-5 mr-2" />
          Blocked Users
        </h3>
        <div className="space-y-2">
          {/* Example blocked user */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span>John Doe</span>
            <button className="text-red-600 hover:text-red-700">Unblock</button>
          </div>
          {/* Add more blocked users dynamically here */}
        </div>
      </div>
    </div>
  );
};
