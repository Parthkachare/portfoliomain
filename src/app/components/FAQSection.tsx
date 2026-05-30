import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'What services do you offer?',
    answer: 'I specialize in UI/UX design, web development, mobile app design, and product strategy. I help businesses create modern digital experiences that users love.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on scope and complexity. A simple landing page might take 1-2 weeks, while a full web application could take 2-3 months. I provide detailed timelines during our initial consultation.',
  },
  {
    question: 'What is your design process?',
    answer: 'My process includes: Discovery & Research → Wireframing → Visual Design → Prototyping → User Testing → Development → Launch. I involve clients at every stage to ensure alignment.',
  },
  {
    question: 'Do you work with startups?',
    answer: 'Absolutely! I love working with startups and have helped launch several successful products. I offer flexible pricing and can work within your budget constraints.',
  },
  {
    question: 'Can you help with existing projects?',
    answer: 'Yes! I can help improve existing products through redesigns, user experience audits, or adding new features. I\'m comfortable jumping into ongoing projects.',
  },
  {
    question: 'What tools do you use?',
    answer: 'I primarily use Figma for design, React for development, and various prototyping tools. I\'m proficient with the entire modern design and development stack.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
          initial={false}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
          >
            <span className="text-white font-medium text-lg">{faq.question}</span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {openIndex === index ? (
                <Minus className="text-[#FF7A00]" size={20} />
              ) : (
                <Plus className="text-white/60" size={20} />
              )}
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-6 pb-5 text-white/70 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
