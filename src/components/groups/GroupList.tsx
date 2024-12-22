import React, { useState, useEffect } from 'react';
import { Search, Plus, Settings } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { GroupCard } from './GroupCard';
import { CreateGroupModal } from './CreateGroupModal';
import type { ChatRoom } from '../../types/chat';

export const GroupList = () => {
  const [groups, setGroups] = useState<ChatRoom[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const { data, error } = await supabase
      .from('chat_rooms')
      .select('*')
      .eq('type', 'group');

    if (error) {
      console.error('Error fetching groups:', error);
      return;
    }

    setGroups(data || []);
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-white">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Groups</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {filteredGroups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>

      {showCreateModal && (
        <CreateGroupModal
          onClose={() => setShowCreateModal(false)}
          onGroupCreated={fetchGroups}
        />
      )}
    </div>
  );
};