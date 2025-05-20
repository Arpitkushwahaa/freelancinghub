import { User, Project, Bid, Message } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'client',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Tech entrepreneur looking for talented developers',
    joinedAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'freelancer',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    skills: ['React', 'Node.js', 'TypeScript'],
    bio: 'Full-stack developer with 5 years of experience',
    joinedAt: new Date('2023-02-20')
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    role: 'client',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Marketing agency owner looking for designers',
    joinedAt: new Date('2023-03-10')
  },
  {
    id: '4',
    name: 'Emily Wang',
    email: 'emily@example.com',
    role: 'freelancer',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    skills: ['UI/UX Design', 'Figma', 'Adobe XD'],
    bio: 'UI/UX designer passionate about creating user-friendly interfaces',
    joinedAt: new Date('2023-01-05')
  }
];

// Mock Projects
export const projects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Website Development',
    description: 'Looking for an experienced developer to build a modern e-commerce website with payment integration and inventory management.',
    clientId: '1',
    budget: {
      min: 2000,
      max: 5000
    },
    deadline: new Date('2023-06-30'),
    tags: ['Web Development', 'React', 'Node.js', 'E-commerce'],
    status: 'open',
    createdAt: new Date('2023-04-15')
  },
  {
    id: '2',
    title: 'Mobile App UI Design',
    description: 'Need a talented UI designer to create modern and user-friendly interfaces for a fitness tracking mobile app.',
    clientId: '3',
    budget: {
      min: 1500,
      max: 3000
    },
    deadline: new Date('2023-05-25'),
    tags: ['UI/UX Design', 'Mobile App', 'Figma'],
    status: 'open',
    createdAt: new Date('2023-04-10')
  },
  {
    id: '3',
    title: 'Data Analysis for Marketing Campaign',
    description: 'Looking for a data scientist to analyze our marketing campaign results and provide actionable insights.',
    clientId: '3',
    budget: {
      min: 1000,
      max: 2500
    },
    deadline: new Date('2023-05-15'),
    tags: ['Data Science', 'Marketing', 'Analysis'],
    status: 'in-progress',
    createdAt: new Date('2023-03-20')
  },
  {
    id: '4',
    title: 'WordPress Blog Customization',
    description: 'Need help customizing a WordPress blog with specific features and a custom theme.',
    clientId: '1',
    budget: {
      min: 500,
      max: 1200
    },
    deadline: new Date('2023-05-10'),
    tags: ['WordPress', 'Web Development', 'PHP'],
    status: 'completed',
    createdAt: new Date('2023-03-15')
  },
  {
    id: '5',
    title: 'AI Chatbot Development',
    description: 'Looking for an AI expert to develop a customer service chatbot for our website.',
    clientId: '1',
    budget: {
      min: 3000,
      max: 7000
    },
    deadline: new Date('2023-07-15'),
    tags: ['AI', 'Machine Learning', 'Natural Language Processing'],
    status: 'open',
    createdAt: new Date('2023-04-20')
  }
];

// Mock Bids
export const bids: Bid[] = [
  {
    id: '1',
    projectId: '1',
    freelancerId: '2',
    amount: 3500,
    deliveryTime: 30,
    proposal: 'I have extensive experience with e-commerce websites and can deliver a high-quality solution within your timeline.',
    status: 'pending',
    createdAt: new Date('2023-04-16')
  },
  {
    id: '2',
    projectId: '2',
    freelancerId: '4',
    amount: 1800,
    deliveryTime: 15,
    proposal: 'As a UI/UX designer with experience in fitness apps, I can create intuitive and engaging interfaces for your project.',
    status: 'accepted',
    createdAt: new Date('2023-04-12')
  },
  {
    id: '3',
    projectId: '3',
    freelancerId: '2',
    amount: 1200,
    deliveryTime: 7,
    proposal: 'I can analyze your marketing data and provide actionable insights to improve your campaign performance.',
    status: 'accepted',
    createdAt: new Date('2023-03-22')
  }
];

// Mock Messages
export const messages: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: '2',
    projectId: '1',
    content: 'Hi, I\'m interested in your proposal for my e-commerce project. Do you have any examples of similar projects?',
    read: true,
    createdAt: new Date('2023-04-17T10:30:00')
  },
  {
    id: '2',
    senderId: '2',
    receiverId: '1',
    projectId: '1',
    content: 'Hello! Yes, I\'ve worked on several e-commerce projects. I\'ll send you some links to my portfolio.',
    read: true,
    createdAt: new Date('2023-04-17T11:45:00')
  },
  {
    id: '3',
    senderId: '3',
    receiverId: '4',
    projectId: '2',
    content: 'Your design proposal looks great! When can you start working on the project?',
    read: false,
    createdAt: new Date('2023-04-13T09:15:00')
  },
  {
    id: '4',
    senderId: '4',
    receiverId: '3',
    projectId: '2',
    content: 'Thank you! I can start right away. Let\'s discuss the details further.',
    read: false,
    createdAt: new Date('2023-04-13T10:20:00')
  }
];