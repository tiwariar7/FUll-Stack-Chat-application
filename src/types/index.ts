export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  recipientId: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
}