import React from 'react';
import { User as UserIcon, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../types';

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const navigate = useNavigate();

  const startChat = async () => {
    try {
      // Create or get existing chat room
      const { data: room, error } = await supabase
        .from('chat_rooms')
        .insert([
          {
            type: 'direct',
            name: `${user.username}-chat`,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      navigate(`/chat/direct/${room.id}`);
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  return (
    <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <UserIcon className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold">{user.username}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <button
          onClick={startChat}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};