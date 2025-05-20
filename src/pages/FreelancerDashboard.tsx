import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase as BriefcaseBusiness, DollarSign, ThumbsUp, Clock, Eye, Briefcase } from 'lucide-react';
import { projects, bids } from '../data/mockData';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import StatsCard from '../components/dashboard/StatsCard';
import { useAuth } from '../contexts/AuthContext';

const FreelancerDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  
  // Get freelancer's bids
  const freelancerBids = useMemo(() => {
    if (!currentUser) return [];
    return bids
      .filter(bid => bid.freelancerId === currentUser.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [currentUser]);
  
  // Get projects freelancer has bid on
  const bidProjects = useMemo(() => {
    if (!currentUser) return [];
    
    const projectIds = freelancerBids.map(bid => bid.projectId);
    return projects.filter(project => projectIds.includes(project.id));
  }, [currentUser, freelancerBids]);
  
  // Get accepted bids
  const acceptedBids = useMemo(() => {
    return freelancerBids.filter(bid => bid.status === 'accepted');
  }, [freelancerBids]);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  
  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date));
  };
  
  // Calculate total earnings
  const totalEarnings = useMemo(() => {
    return acceptedBids.reduce((sum, bid) => sum + bid.amount, 0);
  }, [acceptedBids]);
  
  // Get project by ID
  const getProject = (projectId: string) => {
    return projects.find(project => project.id === projectId);
  };
  
  // Recommended projects for freelancer based on their skills
  const recommendedProjects = useMemo(() => {
    if (!currentUser || !currentUser.skills) return [];
    
    // Get projects that match freelancer's skills and are still open
    const openProjects = projects.filter(
      project => 
        project.status === 'open' && 
        // Don't recommend projects they've already bid on
        !freelancerBids.some(bid => bid.projectId === project.id) &&
        // Match at least one skill/tag
        currentUser.skills!.some(skill => 
          project.tags.some(tag => tag.toLowerCase().includes(skill.toLowerCase()))
        )
    );
    
    return openProjects.slice(0, 3); // Return at most 3 recommendations
  }, [currentUser, freelancerBids]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Freelancer Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your bids, view project recommendations, and track your earnings
        </p>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Active Bids"
          value={freelancerBids.filter(b => b.status === 'pending').length}
          icon={<BriefcaseBusiness size={24} />}
        />
        <StatsCard
          title="Projects In Progress"
          value={bidProjects.filter(p => p.status === 'in-progress').length}
          icon={<Clock size={24} />}
        />
        <StatsCard
          title="Completed Projects"
          value={bidProjects.filter(p => p.status === 'completed').length}
          icon={<ThumbsUp size={24} />}
        />
        <StatsCard
          title="Total Earnings"
          value={formatCurrency(totalEarnings)}
          icon={<DollarSign size={24} />}
          change={
            totalEarnings > 0 
              ? { value: 12, isPositive: true } // Sample data
              : undefined
          }
          subtitle="Last 30 days"
        />
      </div>
      
      {/* Projects and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Bids Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">My Bids</h2>
            <Link to="/explore">
              <Button leftIcon={<Eye size={16} />}>Browse Projects</Button>
            </Link>
          </div>
          
          {freelancerBids.length === 0 ? (
            <Card className="text-center py-8">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No Bids Yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                You haven't placed any bids yet. Start by exploring available projects.
              </p>
              <Link to="/explore">
                <Button leftIcon={<Briefcase size={16} />}>Find Projects</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {freelancerBids.map((bid) => {
                const project = getProject(bid.projectId);
                if (!project) return null;
                
                return (
                  <Card key={bid.id} hoverEffect className="transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <Badge 
                        variant={
                          bid.status === 'accepted' ? 'success' :
                          bid.status === 'rejected' ? 'danger' : 'warning'
                        }
                        className="capitalize"
                      >
                        {bid.status}
                      </Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Bid placed on {formatDate(bid.createdAt)}
                      </span>
                    </div>
                    
                    <Link to={`/project/${project.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                        {project.title}
                      </h3>
                    </Link>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div className="flex items-center">
                        <DollarSign size={16} className="mr-1 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">
                          Your bid: {formatCurrency(bid.amount)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">
                          Delivery: {bid.deliveryTime} days
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      <strong>Your proposal:</strong> {bid.proposal.length > 100 ? `${bid.proposal.substring(0, 100)}...` : bid.proposal}
                    </div>
                    
                    <Link to={`/project/${project.id}`}>
                      <Button variant="outline" fullWidth>
                        View Project
                      </Button>
                    </Link>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Recommendations & Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/explore">
                <Button variant="primary" fullWidth leftIcon={<Briefcase size={16} />}>
                  Find New Projects
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" fullWidth>
                  Update Profile
                </Button>
              </Link>
              <Link to="/messages">
                <Button variant="outline" fullWidth>
                  View Messages
                </Button>
              </Link>
            </div>
          </Card>
          
          {/* Recommended Projects */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recommended for You</h2>
            
            {recommendedProjects.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No recommendations available. Try updating your skills.
              </p>
            ) : (
              <div className="space-y-4">
                {recommendedProjects.map((project) => (
                  <Link 
                    key={project.id}
                    to={`/project/${project.id}`}
                    className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                      {project.description}
                    </p>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600 dark:text-blue-400">
                        {formatCurrency(project.budget.min)} - {formatCurrency(project.budget.max)}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {formatDate(project.deadline)}
                      </span>
                    </div>
                  </Link>
                ))}
                
                <Link to="/explore" className="block text-center text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                  View more projects
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;