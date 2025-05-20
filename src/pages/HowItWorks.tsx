import React from 'react';
import { Search, MessageSquare, CheckCircle, DollarSign, Shield, Clock } from 'lucide-react';
import Card from '../components/common/Card';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Search size={24} />,
      title: 'Post a Project',
      description: 'Describe your project in detail and receive competitive bids from talented freelancers. Be specific about requirements and expectations.',
    },
    {
      icon: <MessageSquare size={24} />,
      title: 'Connect with Freelancers',
      description: 'Review bids, chat with freelancers, and choose the perfect match for your project. Check portfolios and past work history.',
    },
    {
      icon: <CheckCircle size={24} />,
      title: 'Get Work Done',
      description: 'Work together seamlessly and get your project completed on time and within budget. Track progress and communicate effectively.',
    },
  ];

  const features = [
    {
      icon: <Shield size={24} />,
      title: 'Secure Payments',
      description: 'Your payments are held securely in escrow until you approve the work. Release payments only when satisfied.',
    },
    {
      icon: <DollarSign size={24} />,
      title: 'Competitive Pricing',
      description: 'Get competitive bids from skilled freelancers. Choose the best combination of skills and price.',
    },
    {
      icon: <Clock size={24} />,
      title: 'Timely Delivery',
      description: 'Set clear milestones and deadlines. Track progress and ensure timely project completion.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-16 bg-gray-900 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            How FreelanceHub Works
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Your guide to successfully completing projects with FreelanceHub
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Three Simple Steps
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              Get your project from idea to reality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="relative">
                <div className="absolute -top-4 left-6 w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full text-sm font-bold">
                  {index + 1}
                </div>
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Why Choose FreelanceHub
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              Benefits that make us stand out
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              Got questions? We've got answers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                How much does it cost to post a project?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Posting a project on FreelanceHub is completely free. You only pay when you hire a freelancer and approve their work.
              </p>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                How do I know my payment is secure?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                All payments are held securely in escrow until you approve the work. This ensures both parties are protected throughout the project.
              </p>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What if I'm not satisfied with the work?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We have a dispute resolution process in place. If you're not satisfied, you can work with the freelancer to revise the work or seek mediation.
              </p>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                How do I choose the right freelancer?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Review freelancers' profiles, portfolios, ratings, and reviews. You can also chat with them before hiring to ensure they're the right fit.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
