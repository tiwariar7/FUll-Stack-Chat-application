import React, { useState } from 'react';
import { GeneralSettings } from './GeneralSettings';
import { PrivacySettings } from './PrivacySettings';
import { NotificationSettings } from './NotificationSettings';

type SettingsTab = 'general' | 'privacy' | 'notifications';

export const SettingsLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Tab Navigation */}
        <div className="flex border-b mb-6">
          {['general', 'privacy', 'notifications'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab as SettingsTab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'general' && <GeneralSettings />}
          {activeTab === 'privacy' && <PrivacySettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
        </div>
      </div>
    </div>
  );
};
