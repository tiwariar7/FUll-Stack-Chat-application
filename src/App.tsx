import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthForm } from './components/AuthForm';
import { ChatWindow } from './components/ChatWindow';
import { ChatSidebar } from './components/ChatSidebar';
import { SettingsLayout } from './components/settings/SettingsLayout';
import { GroupList } from './components/groups/GroupList';
import { CreateGroupModal } from './components/groups/CreateGroupModal';
import { UserList } from './components/users/UserList';
import { useAuthStore } from './store/authStore';

// Component to protect private routes
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<AuthForm type="login" />} />
        <Route path="/register" element={<AuthForm type="register" />} />

        {/* Protected Routes */}
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <div className="flex h-screen">
                <ChatSidebar />
                <ChatWindow
                  recipient={null} // Modify as per your logic
                  messages={[]} // Modify as per your logic
                  onSendMessage={() => console.log('Message sent')} // Add handler
                />
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <div className="flex h-screen">
                <ChatSidebar />
                <SettingsLayout />
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/groups"
          element={
            <PrivateRoute>
              <div className="flex h-screen">
                <ChatSidebar />
                <div className="flex-grow p-4">
                  <GroupList />
                  <CreateGroupModal />
                </div>
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <div className="flex h-screen">
                <ChatSidebar />
                <div className="flex-grow p-4">
                  <UserList />
                </div>
              </div>
            </PrivateRoute>
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Fallback for undefined routes */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
