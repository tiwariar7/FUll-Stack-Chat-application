import React from 'react';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ChatRoom } from '../../types/chat';

interface GroupCardProps {
  group: ChatRoom;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/chat/group/${group.id}`)}
      className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <Users className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{group.name}</h3>
          <p className="text-sm text-gray-500">
            {group.last_message?.content || 'No messages yet'}
          </p>
        </div>
      </div>
    </div>
  );
};