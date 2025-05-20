import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, DollarSign, MessageSquare, CheckCircle } from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { currentUser } = useAuth();

  // Step items for the how it works section
  const steps = [
    {
      icon: <Search size={24} />,
      title: 'Post a Project',
      description: 'Describe your project and receive competitive bids from talented freelancers.',
    },
    {
      icon: <MessageSquare size={24} />,
      title: 'Connect with Freelancers',
      description: 'Review bids, chat with freelancers, and choose the perfect match for your project.',
    },
    {
      icon: <CheckCircle size={24} />,
      title: 'Get Work Done',
      description: 'Work together seamlessly and get your project completed on time and within budget.',
    },
  ];

  // Featured categories
  const categories = [
    {
      title: 'Web Development',
      description: 'Website creation, web apps, e-commerce',
      count: 120,
    },
    {
      title: 'Mobile Development',
      description: 'iOS, Android, cross-platform apps',
      count: 87,
    },
    {
      title: 'UI/UX Design',
      description: 'User interfaces, experience design, prototypes',
      count: 95,
    },
    {
      title: 'Data Science',
      description: 'Analysis, machine learning, visualization',
      count: 64,
    },
  ];

  // Testimonials
  const testimonials = [
    {
      content: 'I found an amazing developer within hours of posting my project. The quality of work was outstanding!',
      author: 'Sarah Johnson',
      role: 'Marketing Director',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      content: 'As a freelancer, this platform has connected me with quality clients and interesting projects consistently.',
      author: 'David Chen',
      role: 'Full-stack Developer',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
  ];

  return (
    <div className="space-y-16 pt-8 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-900 dark:bg-gray-900">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 text-center md:text-left">
          <div className="md:max-w-lg lg:max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Connect with top freelance talent for your projects
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl">
              Find skilled freelancers for any job, or get hired for your expertise. FreelanceHub makes it easy to connect, collaborate, and create amazing results.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 justify-center md:justify-start">
              <Link to={currentUser ? '/explore' : '/register'}>
                <Button size="lg">
                  {currentUser ? 'Explore Projects' : 'Get Started'}
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-20">
          <div className="absolute -right-14 -top-14 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-600 to-purple-600 blur-3xl"></div>
          <div className="absolute -left-14 top-40 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-teal-400 to-blue-500 blur-3xl"></div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How It Works</h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">Simple steps to get your project done right</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md"
            >
              <div className="absolute -top-4 left-6 w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full text-sm font-bold">
                {index + 1}
              </div>
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Popular Categories</h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">Explore projects by category</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={index}
              to="/explore"
              className="group block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {category.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {category.count} projects
                </span>
                <ArrowRight size={16} className="text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What Our Users Say</h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">Join thousands of satisfied clients and freelancers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <p className="text-gray-600 dark:text-gray-300 text-lg italic">"{testimonial.content}"</p>
                <div className="mt-4 flex items-center">
                  <img 
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl overflow-hidden shadow-xl">
          <div className="px-6 py-12 sm:px-12 sm:py-16 text-center sm:text-left">
            <div className="max-w-3xl mx-auto sm:mx-0">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mt-4 text-lg text-white text-opacity-90">
                Join our community of freelancers and clients today and start bringing your projects to life.
              </p>
              <div className="mt-8 inline-flex flex-col sm:flex-row items-center justify-center sm:justify-start w-full sm:w-auto gap-4">
                <Link to={currentUser ? '/explore' : '/register'} className="block w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all font-bold text-lg min-w-[200px] px-8 py-4 rounded-xl ring-4 ring-yellow-200 hover:ring-yellow-300 dark:ring-yellow-500/30"
                  >
                    {currentUser ? 'Find Projects' : 'Sign Up Now'}
                  </Button>
                </Link>
                {!currentUser && (
                  <Link to="/login" className="block w-full sm:w-auto">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full min-w-[200px] text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all py-4 font-semibold"
                    >
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">About Us</h3>
              <p className="text-gray-400">Connect with top freelance talent and bring your projects to life with FreelanceHub.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/explore" className="text-gray-400 hover:text-white transition-colors">Find Projects</Link></li>
                <li><Link to="/post-project" className="text-gray-400 hover:text-white transition-colors">Post a Project</Link></li>
                <li><Link to="/how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                <li><a href="mailto:support@freelancehub.com" className="text-gray-400 hover:text-white transition-colors">Email Support</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} FreelanceHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;