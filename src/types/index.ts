export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'freelancer';
  avatar: string;
  skills?: string[];
  bio?: string;
  joinedAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  clientId: string;
  budget: {
    min: number;
    max: number;
  };
  deadline: Date;
  tags: string[];
  status: 'open' | 'in-progress' | 'completed';
  createdAt: Date;
}

export interface Bid {
  id: string;
  projectId: string;
  freelancerId: string;
  amount: number;
  deliveryTime: number; // In days
  proposal: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  projectId?: string;
  content: string;
  read: boolean;
  createdAt: Date;
}

export type AuthUser = User | null;