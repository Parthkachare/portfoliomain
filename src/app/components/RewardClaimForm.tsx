import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface RewardClaimFormProps {
  onSubmit: () => void;
  onSkip: () => void;
}

export function RewardClaimForm({ onSubmit, onSkip }: RewardClaimFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Website Development',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    'Website Development',
    'Mobile App Development',
    'UI/UX Design',
    'Startup MVP',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-15ed28e0/reward-claim`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            ...formData,
            timestamp: Date.now(),
          }),
        }
      );

      if (response.ok) {
        toast.success('Reward claim submitted! 🎉', {
          description: 'Parth will contact you within 48 hours',
        });
        setTimeout(() => {
          onSubmit();
        }, 1500);
      } else {
        toast.error('Failed to submit claim. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting reward claim:', error);
      toast.error('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-indigo-950 to-black" />
      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-[128px]" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Claim Your Reward</h1>
          <p className="text-gray-400">Fill out the form below to receive your prize</p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-2xl w-full backdrop-blur-md bg-white/5 border border-indigo-500/20 rounded-3xl p-8 md:p-12"
        >
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                placeholder="john@example.com"
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                Company / Project Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                placeholder="Your Company or Project"
              />
            </div>

            {/* Service */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                Service Needed *
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              >
                {services.map(service => (
                  <option key={service} value={service} className="bg-black">
                    {service}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <span className="relative z-10">
                {isSubmitting ? 'Submitting...' : 'Submit Claim'}
              </span>
              {!isSubmitting && <Send className="w-5 h-5" />}
              {!isSubmitting && (
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
              )}
            </button>

            <button
              type="button"
              onClick={onSkip}
              disabled={isSubmitting}
              className="w-full px-8 py-3 text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              <span>Skip for now</span>
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}