export interface ChatRoom {
  id: string;
  name: string;
  type: 'direct' | 'group';
  created_at: string;
  last_message?: Message;
}

export interface ChatInvite {
  id: string;
  sender_id: string;
  recipient_id: string;
  room_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

export interface GroupMember {
  user_id: string;
  room_id: string;
  role: 'admin' | 'member';
  joined_at: string;
}