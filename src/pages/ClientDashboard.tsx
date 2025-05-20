import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase as BriefcaseBusiness, Users, DollarSign, Clock, Plus } from 'lucide-react';
import { projects, bids, users } from '../data/mockData';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import StatsCard from '../components/dashboard/StatsCard';
import { useAuth } from '../contexts/AuthContext';

const ClientDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  
  // Get client's projects
  const clientProjects = useMemo(() => {
    if (!currentUser) return [];
    return projects
      .filter(project => project.clientId === currentUser.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [currentUser]);
  
  // Get total bids on client's projects
  const projectBids = useMemo(() => {
    if (!currentUser) return [];
    return bids.filter(bid => {
      const project = projects.find(p => p.id === bid.projectId);
      return project && project.clientId === currentUser.id;
    });
  }, [currentUser]);
  
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
  
  // Get freelancer name by ID
  const getFreelancerName = (freelancerId: string) => {
    const freelancer = users.find(user => user.id === freelancerId);
    return freelancer ? freelancer.name : 'Unknown Freelancer';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Client Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your projects and freelancer relationships
        </p>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Projects"
          value={clientProjects.length}
          icon={<BriefcaseBusiness size={24} />}
        />
        <StatsCard
          title="Active Projects"
          value={clientProjects.filter(p => p.status !== 'completed').length}
          icon={<Clock size={24} />}
        />
        <StatsCard
          title="Total Bids Received"
          value={projectBids.length}
          icon={<Users size={24} />}
        />
        <StatsCard
          title="Avg. Project Budget"
          value={formatCurrency(
            clientProjects.length
              ? clientProjects.reduce((sum, p) => sum + (p.budget.min + p.budget.max) / 2, 0) / clientProjects.length
              : 0
          )}
          icon={<DollarSign size={24} />}
        />
      </div>
      
      {/* Projects and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Projects Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">My Projects</h2>
            <Link to="/post-project">
              <Button leftIcon={<Plus size={16} />}>Post New Project</Button>
            </Link>
          </div>
          
          {clientProjects.length === 0 ? (
            <Card className="text-center py-8">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No Projects Yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                You haven't posted any projects yet. Get started by creating your first project.
              </p>
              <Link to="/post-project">
                <Button leftIcon={<Plus size={16} />}>Post Your First Project</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {clientProjects.map((project) => (
                <Link 
                  key={project.id}
                  to={`/project/${project.id}`}
                  className="block"
                >
                  <Card hoverEffect className="transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <Badge 
                        variant={
                          project.status === 'open' ? 'success' :
                          project.status === 'in-progress' ? 'warning' : 'primary'
                        }
                        className="capitalize"
                      >
                        {project.status.replace('-', ' ')}
                      </Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Posted {formatDate(project.createdAt)}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <Users size={16} className="mr-1 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {projectBids.filter(bid => bid.projectId === project.id).length} bids
                        </span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign size={16} className="mr-1 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {formatCurrency(project.budget.min)} - {formatCurrency(project.budget.max)}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
        
        {/* Recent Activity & Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/post-project">
                <Button variant="primary" fullWidth leftIcon={<Plus size={16} />}>
                  Post a New Project
                </Button>
              </Link>
              <Link to="/explore">
                <Button variant="outline" fullWidth>
                  Browse Freelancers
                </Button>
              </Link>
              <Link to="/messages">
                <Button variant="outline" fullWidth>
                  View Messages
                </Button>
              </Link>
            </div>
          </Card>
          
          {/* Recent Bids */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Bids</h2>
            
            {projectBids.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No bids received yet.
              </p>
            ) : (
              <div className="space-y-4">
                {projectBids.slice(0, 5).map((bid) => {
                  const project = projects.find(p => p.id === bid.projectId);
                  
                  return (
                    <div key={bid.id} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {getFreelancerName(bid.freelancerId)}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            on {project?.title}
                          </p>
                        </div>
                        <Badge 
                          variant={
                            bid.status === 'accepted' ? 'success' :
                            bid.status === 'rejected' ? 'danger' : 'warning'
                          }
                          className="capitalize"
                        >
                          {bid.status}
                        </Badge>
                      </div>
                      <div className="mt-2 flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          {formatCurrency(bid.amount)} • {bid.deliveryTime} days
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {formatDate(bid.createdAt)}
                        </span>
                      </div>
                    </div>
                  );
                })}
                
                <Link to="/bids" className="block text-center text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                  View all bids
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;