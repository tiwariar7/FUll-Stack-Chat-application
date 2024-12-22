import { supabase } from '../lib/supabase';
import { ChatRoom, ChatInvite } from '../types/chat';

export const chatService = {
  async createDirectChat(recipientUsername: string) {
    const { data: recipient, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('username', recipientUsername)
      .single();

    if (userError || !recipient) throw new Error('User not found');

    const { data: room, error: roomError } = await supabase
      .from('chat_rooms')
      .insert([
        {
          type: 'direct',
          name: `${recipientUsername}-chat`,
        },
      ])
      .select()
      .single();

    if (roomError) throw roomError;

    // Create chat invite
    const { error: inviteError } = await supabase
      .from('chat_invites')
      .insert([
        {
          sender_id: (await supabase.auth.getUser()).data.user?.id,
          recipient_id: recipient.id,
          room_id: room.id,
          status: 'pending',
        },
      ]);

    if (inviteError) throw inviteError;

    return room;
  },

  async createGroupChat(name: string, memberUsernames: string[]) {
    const { data: room, error: roomError } = await supabase
      .from('chat_rooms')
      .insert([
        {
          type: 'group',
          name,
        },
      ])
      .select()
      .single();

    if (roomError) throw roomError;

    const currentUser = (await supabase.auth.getUser()).data.user;
    if (!currentUser) throw new Error('Not authenticated');

    // Add creator as admin
    await supabase.from('group_members').insert([
      {
        user_id: currentUser.id,
        room_id: room.id,
        role: 'admin',
      },
    ]);

    // Add members
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id')
      .in('username', memberUsernames);

    if (usersError) throw usersError;

    const memberInserts = users.map((user) => ({
      user_id: user.id,
      room_id: room.id,
      role: 'member',
    }));

    await supabase.from('group_members').insert(memberInserts);

    return room;
  },

  async respondToInvite(inviteId: string, accept: boolean) {
    const { error } = await supabase
      .from('chat_invites')
      .update({ status: accept ? 'accepted' : 'rejected' })
      .eq('id', inviteId);

    if (error) throw error;
  },

  async sendMessage(roomId: string, content: string) {
    const { error } = await supabase.from('messages').insert([
      {
        room_id: roomId,
        sender_id: (await supabase.auth.getUser()).data.user?.id,
        content,
      },
    ]);

    if (error) throw error;
  },

  subscribeToMessages(roomId: string, callback: (message: any) => void) {
    return supabase
      .channel(`room:${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `room_id=eq.${roomId}`,
        },
        callback
      )
      .subscribe();
  },

  async getPendingInvites() {
    const { data, error } = await supabase
      .from('chat_invites')
      .select('*, sender:users(username)')
      .eq('status', 'pending');

    if (error) throw error;
    return data;
  },
};