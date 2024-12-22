/*
  # Add Support Tables

  1. New Tables
    - `faqs`: Stores frequently asked questions
    - `support_tickets`: Stores user support requests
    - `guides`: Stores help guides and documentation

  2. Security
    - Enable RLS on all tables
    - Add policies for viewing and managing content
*/

-- FAQs Table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Support Tickets Table
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  subject text NOT NULL,
  description text NOT NULL,
  status text DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);

ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Guides Table
CREATE TABLE IF NOT EXISTS guides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE guides ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- FAQs Policies
CREATE POLICY "FAQs are viewable by everyone"
  ON faqs
  FOR SELECT
  TO authenticated
  USING (true);

-- Support Tickets Policies
CREATE POLICY "Users can view their own tickets"
  ON support_tickets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create tickets"
  ON support_tickets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Guides Policies
CREATE POLICY "Guides are viewable by everyone"
  ON guides
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample FAQs
INSERT INTO faqs (question, answer, category) VALUES
  ('How do I create a group?', 'Click the "+" button in the Groups section and follow the prompts.', 'groups'),
  ('How do I change my password?', 'Go to Settings > Account > Change Password.', 'account'),
  ('Can I delete messages?', 'Yes, hover over your message and click the delete icon.', 'messages'),
  ('How do I report inappropriate content?', 'Click the three dots menu on any message and select "Report".', 'general');