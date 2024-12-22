/*
  # Add group features

  1. New Tables
    - `group_settings`
      - Group-specific settings like media permissions
    - `group_media`
      - Store media files shared in groups
    - `group_reports`
      - Track reported content/users in groups

  2. Changes
    - Add description and image_url to chat_rooms table
    - Add media_enabled flag to chat_rooms

  3. Security
    - Enable RLS on new tables
    - Add policies for group admins and members
*/

-- Add new columns to chat_rooms
ALTER TABLE chat_rooms
ADD COLUMN IF NOT EXISTS description text,
ADD COLUMN IF NOT EXISTS image_url text,
ADD COLUMN IF NOT EXISTS media_enabled boolean DEFAULT true;

-- Group Settings
CREATE TABLE IF NOT EXISTS group_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES chat_rooms(id) ON DELETE CASCADE,
  allow_media boolean DEFAULT true,
  allow_member_invites boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE group_settings ENABLE ROW LEVEL SECURITY;

-- Group Media
CREATE TABLE IF NOT EXISTS group_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  file_url text NOT NULL,
  file_type text NOT NULL,
  file_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE group_media ENABLE ROW LEVEL SECURITY;

-- Group Reports
CREATE TABLE IF NOT EXISTS group_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES chat_rooms(id) ON DELETE CASCADE,
  reporter_id uuid REFERENCES auth.users(id),
  reported_user_id uuid REFERENCES auth.users(id),
  reason text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed')),
  created_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);

ALTER TABLE group_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Group Settings
CREATE POLICY "Group admins can manage settings"
  ON group_settings
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM group_members
      WHERE user_id = auth.uid()
      AND chat_room_id = group_id
      AND role = 'admin'
    )
  );

CREATE POLICY "Members can view settings"
  ON group_settings
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM group_members
      WHERE user_id = auth.uid()
      AND chat_room_id = group_id
    )
  );

-- Group Media
CREATE POLICY "Members can view media"
  ON group_media
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM group_members
      WHERE user_id = auth.uid()
      AND chat_room_id = group_id
    )
  );

CREATE POLICY "Members can upload media"
  ON group_media
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM group_members gm
      JOIN chat_rooms cr ON cr.id = gm.chat_room_id
      WHERE gm.user_id = auth.uid()
      AND gm.chat_room_id = group_id
      AND cr.media_enabled = true
    )
  );

-- Group Reports
CREATE POLICY "Members can create reports"
  ON group_reports
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM group_members
      WHERE user_id = auth.uid()
      AND chat_room_id = group_id
    )
  );

CREATE POLICY "Admins can view and manage reports"
  ON group_reports
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM group_members
      WHERE user_id = auth.uid()
      AND chat_room_id = group_id
      AND role = 'admin'
    )
  );