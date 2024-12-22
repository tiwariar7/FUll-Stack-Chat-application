import React from 'react';
import { ChatSidebar } from '../ChatSidebar';

export const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <ChatSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};