import { motion } from 'motion/react';
import { Twitter, Linkedin, Heart, MessageCircle, Share2 } from 'lucide-react';

interface Post {
  platform: 'twitter' | 'linkedin';
  content: string;
  likes: number;
  comments: number;
  date: string;
}

export function SocialFeed() {
  const posts: Post[] = [
    {
      platform: 'twitter',
      content: 'Just shipped a new design system for a fintech startup! The power of consistency 🚀',
      likes: 234,
      comments: 45,
      date: '2h ago'
    },
    {
      platform: 'linkedin',
      content: 'Excited to share my latest case study on redesigning an e-commerce checkout flow that increased conversions by 34%! Link in comments.',
      likes: 567,
      comments: 89,
      date: '1d ago'
    },
    {
      platform: 'twitter',
      content: 'Hot take: The best design is the one users don\'t notice. Thoughts? 💭',
      likes: 892,
      comments: 123,
      date: '2d ago'
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <h3 className="text-3xl font-bold mb-6 dark:text-white flex items-center gap-3">
        <span>Latest Updates</span>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🔥
        </motion.div>
      </h3>

      {posts.map((post, index) => (
        <motion.div
          key={index}
          className="p-6 rounded-3xl bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${
              post.platform === 'twitter' 
                ? 'bg-blue-500' 
                : 'bg-blue-700'
            }`}>
              {post.platform === 'twitter' ? (
                <Twitter className="size-5 text-white" />
              ) : (
                <Linkedin className="size-5 text-white" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-semibold dark:text-white">Parth Kachare</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{post.date}</p>
            </div>
          </div>

          {/* Content */}
          <p className="text-gray-800 dark:text-gray-200 mb-4">{post.content}</p>

          {/* Actions */}
          <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
            <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
              <Heart className="size-5" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
              <MessageCircle className="size-5" />
              <span>{post.comments}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
              <Share2 className="size-5" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
