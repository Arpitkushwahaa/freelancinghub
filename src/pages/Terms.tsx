import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              By accessing or using FreelanceHub, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Use License
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Permission is granted to temporarily access FreelanceHub for personal or business use, subject to the following conditions:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>You must not modify or copy the materials without explicit permission</li>
              <li>You must not use the materials for any commercial purpose without a proper agreement</li>
              <li>You must not attempt to reverse engineer any software contained on FreelanceHub</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              3. User Responsibilities
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              As a user of FreelanceHub, you are responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>Maintaining the confidentiality of your account</li>
              <li>All activities that occur under your account</li>
              <li>Ensuring your provided information is accurate and up-to-date</li>
              <li>Complying with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Project Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              When posting or accepting projects:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>All agreements must be made through our platform</li>
              <li>Payment terms must be clearly specified</li>
              <li>Project requirements must be clearly outlined</li>
              <li>Both parties must honor their commitments</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Disclaimer
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              FreelanceHub services are provided "as is". We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Contact
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              If you have any questions about these Terms, please{' '}
              <Link to="/contact" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                contact us
              </Link>
              .
            </p>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default Terms;
