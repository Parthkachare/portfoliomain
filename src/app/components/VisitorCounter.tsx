import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Eye } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function VisitorCounter() {
  const [displayCount, setDisplayCount] = useState(0);
  const [targetCount, setTargetCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Track and increment visitor count
    const trackVisitor = async () => {
      try {
        // Check if this visitor has been counted before (using sessionStorage for session-based tracking)
        const hasVisited = sessionStorage.getItem('portfolio_visited');

        if (!hasVisited) {
          // Increment the count
          const response = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-15ed28e0/visitor-count`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${publicAnonKey}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setTargetCount(data.count || 0);
            sessionStorage.setItem('portfolio_visited', 'true');
          }
        } else {
          // Just fetch the current count without incrementing
          const response = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-15ed28e0/visitor-count`,
            {
              headers: {
                'Authorization': `Bearer ${publicAnonKey}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setTargetCount(data.count || 0);
          }
        }
      } catch (error) {
        // Fallback to a base count if server is unavailable
        setTargetCount(1000);
      } finally {
        setIsLoading(false);
      }
    };

    trackVisitor();
  }, []);

  // Animate the counter
  useEffect(() => {
    if (targetCount === 0 || isLoading) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = targetCount / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetCount) {
        setDisplayCount(targetCount);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [targetCount, isLoading]);

  return (
    <motion.div
      className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF7A00]/20 to-[#FEB273]/20 backdrop-blur-sm border border-[#FF7A00]/30"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Eye className="size-5 text-[#FF7A00]" />
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-[#FF7A00] to-[#FEB273] bg-clip-text text-transparent">
          {displayCount.toLocaleString()}
        </span>
        <span className="text-xs text-gray-600 dark:text-gray-400">Portfolio Views</span>
      </div>
    </motion.div>
  );
}
