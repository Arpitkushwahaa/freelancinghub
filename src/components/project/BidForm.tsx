import React, { useState } from 'react';
import { DollarSign, Clock } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';

interface BidFormProps {
  projectId: string;
  onSubmit: (formData: BidFormData) => void;
  isLoading?: boolean;
}

export interface BidFormData {
  amount: number;
  deliveryTime: number;
  proposal: string;
}

const BidForm: React.FC<BidFormProps> = ({ projectId, onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<BidFormData>({
    amount: 0,
    deliveryTime: 0,
    proposal: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'amount' || name === 'deliveryTime') {
      setFormData({
        ...formData,
        [name]: value ? parseInt(value, 10) : 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.amount) {
      newErrors.amount = 'Bid amount is required';
    } else if (formData.amount <= 0) {
      newErrors.amount = 'Bid amount must be greater than 0';
    }
    
    if (!formData.deliveryTime) {
      newErrors.deliveryTime = 'Delivery time is required';
    } else if (formData.deliveryTime <= 0) {
      newErrors.deliveryTime = 'Delivery time must be greater than 0';
    }
    
    if (!formData.proposal.trim()) {
      newErrors.proposal = 'Proposal is required';
    } else if (formData.proposal.length < 50) {
      newErrors.proposal = 'Proposal should be at least 50 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Card>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Place Your Bid</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Bid Amount"
            name="amount"
            value={formData.amount || ''}
            onChange={handleChange}
            placeholder="Enter amount"
            type="number"
            min="1"
            leftIcon={<DollarSign size={16} />}
            error={errors.amount}
            fullWidth
          />
          
          <Input
            label="Delivery Time (days)"
            name="deliveryTime"
            value={formData.deliveryTime || ''}
            onChange={handleChange}
            placeholder="Enter days"
            type="number"
            min="1"
            leftIcon={<Clock size={16} />}
            error={errors.deliveryTime}
            fullWidth
          />
        </div>
        
        <div>
          <label htmlFor="proposal" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Proposal
          </label>
          <textarea
            id="proposal"
            name="proposal"
            value={formData.proposal}
            onChange={handleChange}
            rows={4}
            placeholder="Explain why you're the right freelancer for this project. Highlight your skills and experience relevant to this project."
            className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:z-10 sm:text-sm
              ${errors.proposal
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500 text-red-900'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400'
              }`}
          />
          {errors.proposal && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.proposal}
            </p>
          )}
        </div>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            isLoading={isLoading}
            fullWidth
          >
            Submit Bid
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default BidForm;