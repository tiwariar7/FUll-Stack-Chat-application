/*
  # Add Dummy Data for Testing
  
  1. Test Users
  2. Chat Rooms
  3. Messages
  4. Group Chats
*/

-- Insert test users
INSERT INTO auth.users (id, email)
VALUES 
  ('d0d4eef5-80f2-4983-9f0c-885ef1d4a1a1', 'john@example.com'),
  ('b1d4eef5-80f2-4983-9f0c-885ef1d4a1a2', 'sarah@example.com'),
  ('c2d4eef5-80f2-4983-9f0c-885ef1d4a1a3', 'mike@example.com'),
  ('a3d4eef5-80f2-4983-9f0c-885ef1d4a1a4', 'emma@example.com');

-- Insert user profiles
INSERT INTO users (id, username, email)
VALUES 
  ('d0d4eef5-80f2-4983-9f0c-885ef1d4a1a1', 'John Dev', 'john@example.com'),
  ('b1d4eef5-80f2-4983-9f0c-885ef1d4a1a2', 'Sarah Designer', 'sarah@example.com'),
  ('c2d4eef5-80f2-4983-9f0c-885ef1d4a1a3', 'Mike PM', 'mike@example.com'),
  ('a3d4eef5-80f2-4983-9f0c-885ef1d4a1a4', 'Emma Engineer', 'emma@example.com');

-- Create chat rooms
INSERT INTO chat_rooms (id, name, type)
VALUES 
  ('e1d4eef5-80f2-4983-9f0c-885ef1d4a1b1', 'Project Discussion', 'group'),
  ('e2d4eef5-80f2-4983-9f0c-885ef1d4a1b2', 'John-Sarah Chat', 'direct'),
  ('e3d4eef5-80f2-4983-9f0c-885ef1d4a1b3', 'Tech Team', 'group');

-- Add group members
INSERT INTO group_members (user_id, chat_room_id, role)
VALUES 
  ('d0d4eef5-80f2-4983-9f0c-885ef1d4a1a1', 'e1d4eef5-80f2-4983-9f0c-885ef1d4a1b1', 'admin'),
  ('b1d4eef5-80f2-4983-9f0c-885ef1d4a1a2', 'e1d4eef5-80f2-4983-9f0c-885ef1d4a1b1', 'member'),
  ('c2d4eef5-80f2-4983-9f0c-885ef1d4a1a3', 'e1d4eef5-80f2-4983-9f0c-885ef1d4a1b1', 'member'),
  ('a3d4eef5-80f2-4983-9f0c-885ef1d4a1a4', 'e1d4eef5-80f2-4983-9f0c-885ef1d4a1b1', 'member');

-- Add chat messages
INSERT INTO chat_messages (chat_room_id, sender_id, content)
VALUES 
  ('e1d4eef5-80f2-4983-9f0c-885ef1d4a1b1', 'd0d4eef5-80f2-4983-9f0c-885ef1d4a1a1', 'Welcome to the project discussion!'),
  ('e1d4eef5-80f2-4983-9f0c-885ef1d4a1b1', 'b1d4eef5-80f2-4983-9f0c-885ef1d4a1a2', 'Thanks! Excited to collaborate'),
  ('e1d4eef5-80f2-4983-9f0c-885ef1d4a1b1', 'c2d4eef5-80f2-4983-9f0c-885ef1d4a1a3', 'Let''s discuss the timeline');