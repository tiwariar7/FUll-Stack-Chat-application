import React from 'react';
import { Bell, Mail, Volume2 } from 'lucide-react';

export const NotificationSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Notification Settings</h2>

      {/* Message Notifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Message Notifications
        </h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" defaultChecked />
            Enable message notifications
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" defaultChecked />
            Show message preview
          </label>
        </div>
      </div>

      {/* Email Notifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Mail className="w-5 h-5 mr-2" />
          Email Notifications
        </h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Send email for new messages
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Send email for mentions
          </label>
        </div>
      </div>

      {/* Sound Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Volume2 className="w-5 h-5 mr-2" />
          Sound Settings
        </h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" defaultChecked />
            Enable message sounds
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" defaultChecked />
            Enable notification sounds
          </label>
        </div>
      </div>
    </div>
  );
};
