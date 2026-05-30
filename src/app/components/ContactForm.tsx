import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, User, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-15ed28e0/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success('Message sent successfully! 🎉', {
          description: "I'll get back to you soon!"
        });
        reset();
      } else {
        console.error('Form submission error:', result);
        toast.error('Failed to send message', {
          description: result.error || 'Please try again later.'
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to send message', {
        description: 'Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Name Field */}
      <div className="relative">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#FF7A00] z-10" />
        <input
          type="text"
          placeholder="Your Name"
          {...register('name', { required: 'Name is required' })}
          className="w-full pl-14 pr-4 py-4 rounded-2xl bg-white/80 dark:bg-white/10 border-2 border-transparent focus:border-[#FF7A00] outline-none transition-all backdrop-blur-sm"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1 ml-4">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#FF7A00] z-10" />
        <input
          type="email"
          placeholder="Your Email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          className="w-full pl-14 pr-4 py-4 rounded-2xl bg-white/80 dark:bg-white/10 border-2 border-transparent focus:border-[#FF7A00] outline-none transition-all backdrop-blur-sm"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1 ml-4">{errors.email.message}</p>
        )}
      </div>

      {/* Message Field */}
      <div className="relative">
        <MessageSquare className="absolute left-4 top-6 size-5 text-[#FF7A00] z-10" />
        <textarea
          placeholder="Your Message"
          rows={6}
          {...register('message', { required: 'Message is required' })}
          className="w-full pl-14 pr-4 py-4 rounded-2xl bg-white/80 dark:bg-white/10 border-2 border-transparent focus:border-[#FF7A00] outline-none transition-all backdrop-blur-sm resize-none"
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1 ml-4">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-[#FF7A00] to-[#FEB273] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      >
        <div className="flex items-center justify-center gap-3">
          {isSubmitting ? (
            <>
              <motion.div
                className="size-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="size-5" />
              <span>Send Message</span>
            </>
          )}
        </div>
      </motion.button>
    </motion.form>
  );
}