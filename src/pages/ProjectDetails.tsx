import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, DollarSign, User, ChevronLeft, Send } from 'lucide-react';
import { projects, users, bids, messages } from '../data/mockData';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import BidForm, { BidFormData } from '../components/project/BidForm';
import { useAuth } from '../contexts/AuthContext';
import MessageList from '../components/messaging/MessageList';
import MessageInput from '../components/messaging/MessageInput';
import { Message } from '../types';

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { currentUser } = useAuth();
  const [isSubmittingBid, setIsSubmittingBid] = useState(false);
  const [showBidForm, setShowBidForm] = useState(false);
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  
  // Find the project
  const project = useMemo(() => {
    return projects.find(p => p.id === projectId);
  }, [projectId]);
  
  // Find the client
  const client = useMemo(() => {
    if (!project) return null;
    return users.find(u => u.id === project.clientId);
  }, [project]);
  
  // Find existing bids for this project
  const projectBids = useMemo(() => {
    return bids.filter(bid => bid.projectId === projectId);
  }, [projectId]);
  
  // Check if current user has already bid on this project
  const currentUserBid = useMemo(() => {
    if (!currentUser) return null;
    return projectBids.find(bid => bid.freelancerId === currentUser.id);
  }, [currentUser, projectBids]);
  
  // Get project-related messages
  const projectMessages = useMemo(() => {
    // If user is not logged in, return empty array
    if (!currentUser) return [];
    
    // Get messages related to this project
    const existingMessages = messages.filter(
      msg => msg.projectId === projectId && 
        (msg.senderId === currentUser.id || msg.receiverId === currentUser.id)
    );
    
    // Combine with user sent messages
    return [...existingMessages, ...userMessages].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [projectId, currentUser, messages, userMessages]);
  
  // Calculate remaining time until deadline
  const remainingTime = useMemo(() => {
    if (!project) return '';
    
    const now = new Date();
    const deadline = new Date(project.deadline);
    const diffTime = Math.abs(deadline.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return `${diffDays} days`;
  }, [project]);
  
  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  
  // Handle bid submission
  const handleBidSubmit = (formData: BidFormData) => {
    if (!currentUser || !project) return;
    
    setIsSubmittingBid(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, we would save the bid to the database
      console.log('Submitted bid:', formData);
      
      // Close the form and reset loading state
      setShowBidForm(false);
      setIsSubmittingBid(false);
      
      // Show a success message or redirect
      alert('Your bid has been submitted successfully!');
    }, 1500);
  };
  
  // Handle sending a message
  const handleSendMessage = (content: string) => {
    if (!currentUser || !client) return;
    
    const newMessage: Message = {
      id: `temp-${Date.now()}`,
      senderId: currentUser.id,
      receiverId: client.id,
      projectId,
      content,
      read: false,
      createdAt: new Date(),
    };
    
    setUserMessages([...userMessages, newMessage]);
  };
  
  // If project not found
  if (!project || !client) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project not found</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/explore">
          <Button leftIcon={<ChevronLeft size={16} />}>
            Back to Projects
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/explore" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          <ChevronLeft size={16} className="mr-1" />
          Back to Projects
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main project details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex justify-between items-start mb-4">
              <Badge variant={
                project.status === 'open' ? 'success' :
                project.status === 'in-progress' ? 'warning' : 'primary'
              } className="capitalize">
                {project.status.replace('-', ' ')}
              </Badge>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Posted on {formatDate(project.createdAt)}
              </span>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {project.title}
            </h1>
            
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {project.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <DollarSign size={20} className="mr-2 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Budget</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(project.budget.min)} - {formatCurrency(project.budget.max)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar size={20} className="mr-2 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Deadline</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatDate(project.deadline)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock size={20} className="mr-2 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Remaining</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {remainingTime}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Skills Required
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" size="md" rounded>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Bid CTA for freelancers */}
            {currentUser && currentUser.role === 'freelancer' && project.status === 'open' && (
              <div className="mt-6 border-t pt-6 dark:border-gray-700">
                {currentUserBid ? (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <p className="text-blue-800 dark:text-blue-200 font-medium">
                      You've already placed a bid on this project
                    </p>
                    <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                      Your bid: {formatCurrency(currentUserBid.amount)} - 
                      Delivery in {currentUserBid.deliveryTime} days
                    </p>
                  </div>
                ) : (
                  showBidForm ? (
                    <BidForm 
                      projectId={project.id} 
                      onSubmit={handleBidSubmit}
                      isLoading={isSubmittingBid}
                    />
                  ) : (
                    <Button 
                      onClick={() => setShowBidForm(true)}
                      fullWidth
                    >
                      Place a Bid
                    </Button>
                  )
                )}
              </div>
            )}
          </Card>
          
          {/* Messaging section if user is logged in */}
          {currentUser && (
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Messages
              </h2>
              
              <MessageList 
                messages={projectMessages}
                currentUserId={currentUser.id}
              />
              
              <div className="mt-4">
                <MessageInput 
                  onSendMessage={handleSendMessage}
                  placeholder="Type your message..."
                  disabled={!currentUser}
                />
              </div>
            </Card>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client information */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              About the Client
            </h2>
            
            <div className="flex items-center mb-4">
              <img 
                src={client.avatar}
                alt={client.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="ml-3">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {client.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Member since {new Date(client.joinedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            {client.bio && (
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {client.bio}
              </p>
            )}
            
            {currentUser && currentUser.id !== client.id && (
              <div className="mt-4">
                <Button 
                  variant="outline"
                  leftIcon={<Send size={16} />}
                  fullWidth
                >
                  Contact Client
                </Button>
              </div>
            )}
          </Card>
          
          {/* Bid information */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Bid Summary
            </h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Bids:</span>
                <span className="font-medium text-gray-900 dark:text-white">{projectBids.length}</span>
              </div>
              
              {projectBids.length > 0 && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Avg. Bid:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(
                        projectBids.reduce((sum, bid) => sum + bid.amount, 0) / projectBids.length
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Lowest Bid:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(
                        Math.min(...projectBids.map(bid => bid.amount))
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Highest Bid:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(
                        Math.max(...projectBids.map(bid => bid.amount))
                      )}
                    </span>
                  </div>
                </>
              )}
            </div>
            
            {/* Show only to client */}
            {currentUser && currentUser.id === project.clientId && projectBids.length > 0 && (
              <div className="mt-4">
                <Button 
                  fullWidth
                >
                  View All Bids
                </Button>
              </div>
            )}
          </Card>
          
          {/* Similar projects */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Similar Projects
            </h2>
            
            <div className="space-y-4">
              {projects
                .filter(p => 
                  p.id !== project.id && 
                  p.tags.some(tag => project.tags.includes(tag))
                )
                .slice(0, 3)
                .map(p => (
                  <Link 
                    key={p.id}
                    to={`/project/${p.id}`}
                    className="block p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                      {p.description}
                    </p>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-blue-600 dark:text-blue-400">
                        {formatCurrency(p.budget.min)} - {formatCurrency(p.budget.max)}
                      </span>
                      <Badge variant={
                        p.status === 'open' ? 'success' :
                        p.status === 'in-progress' ? 'warning' : 'primary'
                      } size="sm" className="capitalize">
                        {p.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </Link>
                ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;