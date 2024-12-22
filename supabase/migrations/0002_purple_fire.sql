/*
  # Chat Application Schema

  1. New Tables
    - chat_rooms: Stores chat rooms (direct and group)
    - chat_invites: Manages chat invitations
    - group_members: Tracks group chat membership
    - chat_messages: Stores chat messages

  2. Security
    - Enable RLS on all tables
    - Add policies for access control
*/

-- Chat Rooms
CREATE TABLE IF NOT EXISTS chat_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('direct', 'group')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;

-- Chat Messages (renamed from messages to avoid conflicts)
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_room_id uuid REFERENCES chat_rooms(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Chat Invites
CREATE TABLE IF NOT EXISTS chat_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES auth.users(id),
  recipient_id uuid REFERENCES auth.users(id),
  chat_room_id uuid REFERENCES chat_rooms(id) ON DELETE CASCADE,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_invites ENABLE ROW LEVEL SECURITY;

-- Group Members
CREATE TABLE IF NOT EXISTS group_members (
  user_id uuid REFERENCES auth.users(id),
  chat_room_id uuid REFERENCES chat_rooms(id) ON DELETE CASCADE,
  role text DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, chat_room_id)
);

ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Chat Rooms
CREATE POLICY "Users can view rooms they're part of"
  ON chat_rooms
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM group_members 
      WHERE user_id = auth.uid() 
      AND chat_room_id = chat_rooms.id
    ) OR
    EXISTS (
      SELECT 1 FROM chat_invites 
      WHERE (sender_id = auth.uid() OR recipient_id = auth.uid())
      AND chat_room_id = chat_rooms.id
      AND status = 'accepted'
    )
  );

-- Chat Messages
CREATE POLICY "Users can view messages in their rooms"
  ON chat_messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM group_members
      WHERE user_id = auth.uid() 
      AND chat_room_id = chat_messages.chat_room_id
    ) OR
    EXISTS (
      SELECT 1 FROM chat_invites
      WHERE (sender_id = auth.uid() OR recipient_id = auth.uid())
      AND chat_room_id = chat_messages.chat_room_id
      AND status = 'accepted'
    )
  );

CREATE POLICY "Users can send messages to their rooms"
  ON chat_messages
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM group_members
      WHERE user_id = auth.uid() 
      AND chat_room_id = chat_messages.chat_room_id
    ) OR
    EXISTS (
      SELECT 1 FROM chat_invites
      WHERE (sender_id = auth.uid() OR recipient_id = auth.uid())
      AND chat_room_id = chat_messages.chat_room_id
      AND status = 'accepted'
    )
  );

-- Chat Invites
CREATE POLICY "Users can view their invites"
  ON chat_invites
  FOR SELECT
  USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Users can create invites"
  ON chat_invites
  FOR INSERT
  WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Recipients can update invite status"
  ON chat_invites
  FOR UPDATE
  USING (recipient_id = auth.uid());

-- Group Members
CREATE POLICY "Members can view group membership"
  ON group_members
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM group_members gm
      WHERE gm.user_id = auth.uid()
      AND gm.chat_room_id = group_members.chat_room_id
    )
  );

CREATE POLICY "Admins can manage group membership"
  ON group_members
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM group_members gm
      WHERE gm.user_id = auth.uid()
      AND gm.chat_room_id = group_members.chat_room_id
      AND gm.role = 'admin'
    )
  );