import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Star, ArrowUpRight, Mail, Github, Linkedin, Twitter, Menu, X, Download, ChevronLeft, ChevronRight, Code, Palette, Rocket, Zap, Brain, Database } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { LoadingScreen } from './components/LoadingScreen';
import { CursorFollower } from './components/CursorFollower';
import { AnimatedBlobs } from './components/AnimatedBlobs';
import { ProjectModal } from './components/ProjectModal';
import { DarkModeToggle } from './components/DarkModeToggle';
import { AnimatedCounter } from './components/AnimatedCounter';
import { TypingAnimation } from './components/TypingAnimation';
import { Logo, LogoSimple } from './components/Logo';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { MagneticButton } from './components/MagneticButton';
import { SpotlightEffect } from './components/SpotlightEffect';
import { ParticleEffect } from './components/ParticleEffect';
import { TiltCard } from './components/TiltCard';
import { BackToTop } from './components/BackToTop';
import { ContactForm } from './components/ContactForm';
import { CopyToClipboard } from './components/CopyToClipboard';
import { FAQSection } from './components/FAQSection';
import { NewsletterSignup } from './components/NewsletterSignup';
import { ClientLogos } from './components/ClientLogos';
import { ToolsGrid } from './components/ToolsGrid';
import { ShareButtons } from './components/ShareButtons';
import { fireConfetti } from './components/ConfettiEffect';
import { EasterEggs } from './components/EasterEggs';
import { AchievementSystem, AchievementProgress } from './components/AchievementSystem';
import { SoundToggle, playSound } from './components/SoundToggle';
import { CursorTrail } from './components/CursorTrail';
import { ImageLightbox } from './components/ImageLightbox';
import { CommandPalette, useCommandPalette } from './components/CommandPalette';
import { KeyboardShortcuts } from './components/KeyboardShortcuts';
import { SkillsRadar } from './components/SkillsRadar';
import { InteractiveTimeline } from './components/InteractiveTimeline';
import { FloatingActionMenu } from './components/FloatingActionMenu';
import { AvailabilityStatus } from './components/AvailabilityStatus';
import { CustomScrollbar } from './components/CustomScrollbar';
import { ParticleNetwork } from './components/ParticleNetwork';
import { DownloadResumeButton } from './components/DownloadResumeButton';
import { VisitorCounter } from './components/VisitorCounter';
import { WeatherWidget } from './components/WeatherWidget';
import { QRCodeContact } from './components/QRCodeContact';
import { MusicPlayer } from './components/MusicPlayer';
import { HireMeButton } from './components/HireMeButton';
import { BentoGrid } from './components/BentoGrid';
import { GitHubContributions } from './components/GitHubContributions';
import { SkillsComparison } from './components/SkillsComparison';
import { LoadingTips } from './components/LoadingTips';
import { SocialFeed } from './components/SocialFeed';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { EnhancedSections } from './components/EnhancedSections';
import { TypingSpeedChallenge } from './components/TypingSpeedChallenge';
import { EscapeRoom } from './pages/EscapeRoom';

export default function App() {
  // Simple routing: show Escape Room if path is /escape
  if (window.location.pathname === '/escape') {
    return <EscapeRoom />;
  }

  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [projectFilter, setProjectFilter] = useState('All');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [newAchievement, setNewAchievement] = useState<string | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [projectsViewed, setProjectsViewed] = useState(0);
  
  const { isOpen: commandPaletteOpen, setIsOpen: setCommandPaletteOpen } = useCommandPalette();

  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // Project data
  const projects = [
    {
      id: 1,
      title: 'Healthcare Management System',
      description: 'Complete healthcare solution with patient management and appointment scheduling',
      longDescription: 'A comprehensive healthcare platform designed to streamline patient management, appointment scheduling, and medical records.',
      image: 'https://images.unsplash.com/photo-1767449441925-737379bc2c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMGFwcCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NzMzMDU1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['UI/UX', 'Healthcare'],
      category: 'Web',
      challenge: 'Healthcare providers needed a unified platform to manage patient records, appointments, and communication while maintaining HIPAA compliance.',
      solution: 'Developed an intuitive dashboard with role-based access, real-time appointment updates, and secure patient data management.',
      results: [
        '40% reduction in appointment scheduling time',
        '95% user satisfaction rate',
        'Improved patient-doctor communication',
        'Full HIPAA compliance achieved'
      ]
    },
    {
      id: 2,
      title: 'IoT Weather Monitoring Station',
      description: 'Real-time weather data monitoring with IoT sensors and analytics dashboard',
      longDescription: 'An IoT-powered weather monitoring system providing real-time environmental data with predictive analytics.',
      image: 'https://images.unsplash.com/photo-1571733949554-f9c9c0bbdab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpb3QlMjB3ZWF0aGVyJTIwc3RhdGlvbiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzczNDA1NzUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['IoT', 'Dashboard'],
      category: 'IoT',
      challenge: 'Need for accurate, real-time weather monitoring system for agricultural planning with historical data analysis.',
      solution: 'Built a distributed IoT sensor network with cloud-based analytics dashboard featuring predictive models.',
      results: [
        'Real-time data from 50+ sensors',
        '99.9% uptime achieved',
        'Accurate 7-day weather predictions',
        'Helped optimize crop yields by 30%'
      ]
    },
    {
      id: 3,
      title: 'Unified College Utility App',
      description: 'All-in-one mobile app for students with attendance, grades, and campus services',
      longDescription: 'A comprehensive mobile application serving as a one-stop solution for all student needs on campus.',
      image: 'https://images.unsplash.com/photo-1555939353-30646b6346b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjB1bml2ZXJzaXR5JTIwc3R1ZGVudHN8ZW58MXx8fHwxNzczNDA1NzUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['Mobile', 'Education'],
      category: 'Mobile',
      challenge: 'Students were using multiple disconnected platforms for attendance, grades, events, and campus services.',
      solution: 'Created a unified mobile app with integrated features for all campus activities with offline-first architecture.',
      results: [
        'Adopted by 5,000+ students',
        '85% daily active users',
        'Reduced administrative workload by 50%',
        'Average rating of 4.8/5 on app stores'
      ]
    },
    {
      id: 4,
      title: 'E-commerce Fashion Platform',
      description: 'Modern e-commerce platform with AR try-on features',
      image: 'https://images.unsplash.com/photo-1750056393349-dfaf647f7400?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1aSUyMHV4JTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc3MzQwNTc1MHww&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['E-commerce', 'AR'],
      category: 'Web',
      longDescription: 'Next-generation fashion e-commerce platform with augmented reality virtual try-on capabilities.',
      challenge: 'High return rates due to sizing issues and inability to visualize products before purchase.',
      solution: 'Implemented AR try-on technology with AI-powered size recommendations and 3D product visualization.',
      results: [
        '60% reduction in return rates',
        '2x increase in conversion rate',
        'Featured in tech publications',
        '100k+ active users in first quarter'
      ]
    },
    {
      id: 5,
      title: 'AI-Powered Content Generator',
      description: 'Content creation tool powered by machine learning',
      image: 'https://images.unsplash.com/photo-1659841064804-5f507b1b488a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjB3ZWJzaXRlJTIwbW9ja3VwfGVufDF8fHx8MTc3MzQwNTc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['AI', 'SaaS'],
      category: 'Web',
      longDescription: 'An AI-powered platform that generates high-quality content for blogs, social media, and marketing.',
      challenge: 'Content creators spending hours on ideation and writing, reducing productivity.',
      solution: 'Built an ML-powered content generator with customizable tone, style, and format options.',
      results: [
        'Generated 1M+ pieces of content',
        'Saved users 500+ hours collectively',
        'Achieved 92% content quality score',
        'Grew to $50k MRR in 6 months'
      ]
    },
    {
      id: 6,
      title: 'Smart Home Dashboard',
      description: 'Centralized control for IoT home devices',
      image: 'https://images.unsplash.com/photo-1578398425527-e7c786c1e400?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kaW5nJTIwcGFnZSUyMGRlc2lnbiUyMG1vY2t1cHxlbnwxfHx8fDE3NzM0MDU3NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['IoT', 'UI/UX'],
      category: 'Mobile',
      longDescription: 'Unified dashboard for controlling and monitoring all smart home devices from a single interface.',
      challenge: 'Smart home users juggling multiple apps for different device brands, causing frustration.',
      solution: 'Created a universal dashboard supporting 200+ device types with automation and voice control.',
      results: [
        'Supports 200+ device types',
        '50k+ downloads in first month',
        'Reduced device switching time by 80%',
        'Won "Best Smart Home App" award'
      ]
    }
  ];

  const filteredProjects = projectFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === projectFilter);

  // Testimonials
  const testimonials = [
    {
      text: "Parth's design work exceeded our expectations. His attention to detail and user-centered approach resulted in a product our customers love.",
      name: "Sarah Johnson",
      role: "CEO, TechStart"
    },
    {
      text: "Working with Parth was a game-changer for our project. His innovative solutions and professional approach made the entire process smooth.",
      name: "Michael Chen",
      role: "Product Manager, InnovateCo"
    },
    {
      text: "Exceptional talent! Parth delivered a stunning design that perfectly captured our brand identity and improved our user engagement significantly.",
      name: "Emily Rodriguez",
      role: "Founder, DesignHub"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Skills data
  const skills = [
    { name: 'UI/UX Design', level: 95, icon: Palette },
    { name: 'React & Frontend', level: 90, icon: Code },
    { name: 'Product Strategy', level: 88, icon: Brain },
    { name: 'Prototyping', level: 92, icon: Zap },
    { name: 'Design Systems', level: 85, icon: Rocket },
    { name: 'Backend Development', level: 75, icon: Database },
  ];

  // Blog posts
  const blogPosts = [
    {
      title: 'The Future of Design Systems',
      excerpt: 'Exploring how design systems are evolving to meet modern product needs',
      date: 'Mar 10, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1750056393349-dfaf647f7400?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1aSUyMHV4JTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc3MzQwNTc1MHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Building Better User Experiences',
      excerpt: 'Key principles for creating intuitive and delightful digital products',
      date: 'Mar 8, 2026',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1659841064804-5f507b1b488a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjB3ZWJzaXRlJTIwbW9ja3VwfGVufDF8fHx8MTc3MzQwNTc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'My Journey as a Designer',
      excerpt: 'Lessons learned from 10 years of designing digital products',
      date: 'Mar 5, 2026',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1578398425527-e7c786c1e400?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kaW5nJTIwcGFnZSUyMGRlc2lnbiUyMG1vY2t1cHxlbnwxfHx8fDE3NzM0MDU3NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    }
  ];

  const handleDownloadResume = () => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = '/Parth_Kachare_Resume.pdf';
    link.download = 'Parth_Kachare_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Resume downloaded successfully! 📄');
  };

  const handleViewAllProjects = () => {
    scrollToSection('portfolio');
    toast.success('Showing all projects!');
  };

  const handleServiceClick = (serviceName: string) => {
    toast.success(`Learn more about ${serviceName}`, {
      description: 'Service details page coming soon!'
    });
  };

  const handleBlogClick = (blogTitle: string) => {
    window.open('https://parthblog.space', '_blank', 'noopener,noreferrer');
  };

  const handleSocialClick = (platform: string) => {
    toast.info(`${platform} profile`, {
      description: 'Connect with me on social media!'
    });
  };

  if (loading) {
    return (
      <>
        <LoadingTips isLoading={loading} />
        <LoadingScreen onComplete={() => setLoading(false)} />
      </>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-[#0C0C0C]' : 'bg-[#F4F4F4]'} transition-colors duration-500`}>
      <CustomScrollbar />
      <Toaster position="top-right" richColors />
      <ScrollProgressBar />
      <SpotlightEffect />
      <ParticleNetwork />
      <CursorFollower />
      <CursorTrail />
      <AnimatedBlobs />
      <DarkModeToggle 
        darkMode={darkMode} 
        toggleDarkMode={() => {
          setDarkMode(!darkMode);
          setNewAchievement('dark-mode');
        }} 
      />
      <BackToTop />
      <FloatingActionMenu />
      <KeyboardShortcuts />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <EasterEggs onAchievement={(achievement) => setNewAchievement(achievement)} />
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
      
      <AnimatePresence>
        {lightboxImages.length > 0 && (
          <ImageLightbox
            images={lightboxImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxImages([])}
          />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav 
        className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1400px]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="backdrop-blur-md bg-[#171717]/90 border border-white/10 rounded-full px-6 py-3 flex items-center justify-center">
          <div className="hidden lg:flex items-center gap-2 w-full max-w-[1200px] justify-between">
            <div className="flex items-center gap-2">
              <button onClick={() => scrollToSection('hero')} className="bg-[#FF7A00] hover:bg-[#FF7A00]/90 px-6 py-3 rounded-full text-white transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="px-6 py-3 rounded-full text-white hover:bg-white/5 transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('services')} className="px-6 py-3 rounded-full text-white hover:bg-white/5 transition-colors">
                Service
              </button>
            </div>

            <button onClick={handleDownloadResume} className="px-6 py-3 rounded-full text-white hover:bg-white/5 transition-colors flex items-center gap-2">
              <Download size={16} />
              Resume
            </button>

            <div className="flex items-center gap-2">
              <Logo size={48} animated />
              <button onClick={() => scrollToSection('portfolio')} className="px-6 py-3 rounded-full text-white hover:bg-white/5 transition-colors">
                Project
              </button>
              <button onClick={() => scrollToSection('typing-challenge')} className="px-6 py-3 rounded-full text-white hover:bg-white/5 transition-colors">
                Challenge
              </button>
              <a href="/escape" className="px-6 py-3 rounded-full text-white hover:bg-white/5 transition-colors">
                Escape
              </a>
              <button onClick={() => scrollToSection('contact')} className="px-6 py-3 rounded-full text-white hover:bg-white/5 transition-colors">
                Contact
              </button>
            </div>
          </div>

          <button
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div 
            className="lg:hidden mt-4 backdrop-blur-md bg-[#171717]/90 border border-white/10 rounded-3xl p-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col gap-2">
              <button onClick={() => scrollToSection('hero')} className="bg-[#FF7A00] px-6 py-3 rounded-full text-white text-left">Home</button>
              <button onClick={() => scrollToSection('about')} className="px-6 py-3 rounded-full text-white hover:bg-white/5 text-left">About</button>
              <button onClick={() => scrollToSection('services')} className="px-6 py-3 rounded-full text-white hover:bg-white/5 text-left">Service</button>
              <button onClick={handleDownloadResume} className="px-6 py-3 rounded-full text-white hover:bg-white/5 text-left flex items-center gap-2">
                <Download size={16} />
                Resume
              </button>
              <button onClick={() => scrollToSection('portfolio')} className="px-6 py-3 rounded-full text-white hover:bg-white/5 text-left">Project</button>
              <button onClick={() => scrollToSection('typing-challenge')} className="px-6 py-3 rounded-full text-white hover:bg-white/5 text-left">Challenge</button>
              <a href="/escape" className="px-6 py-3 rounded-full text-white hover:bg-white/5 text-left block">Escape</a>
              <button onClick={() => scrollToSection('contact')} className="px-6 py-3 rounded-full text-white hover:bg-white/5 text-left">Contact</button>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center relative">
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/20 dark:bg-white/10 border border-[#171717] dark:border-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-[#171717] dark:text-white font-medium text-lg">Hello!</span>
              <motion.span
                className="text-2xl"
                animate={{ rotate: [0, 15, -15, 15, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                style={{ display: 'inline-block', transformOrigin: '70% 70%' }}
              >
                👋
              </motion.span>
            </motion.div>

            <TypingAnimation 
              text="I'm Parth, Product Designer" 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 max-w-4xl leading-tight text-gray-900 dark:text-white"
            />

            <motion.p 
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Parth's exceptional product design helps build modern digital experiences and successful products.
            </motion.p>

            <motion.div 
              className="relative mb-12 w-full max-w-4xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <motion.div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] aspect-[2/1] bg-[#FEB273] rounded-t-full -z-10"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative w-full max-w-lg mx-auto aspect-[3/4] rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1723201964235-ea5b99b55d17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwZGVzaWduZXIlMjBwb3J0cmFpdCUyMG9mZmljZXxlbnwxfHx8fDE3NzM0MDU3NTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Parth Kachare"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-wrap items-center justify-center gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <motion.button 
                className="bg-[#FF7A00] hover:bg-[#FF7A00]/90 text-white px-8 py-4 rounded-full flex items-center gap-2 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('portfolio')}
              >
                <span className="font-medium text-lg">Portfolio</span>
                <ArrowUpRight size={20} />
              </motion.button>
              <motion.button 
                className="backdrop-blur-md bg-white/20 dark:bg-white/10 border border-gray-300 dark:border-white/20 hover:bg-white/30 dark:hover:bg-white/20 text-gray-900 dark:text-white px-8 py-4 rounded-full font-medium text-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
              >
                Hire me
              </motion.button>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
              <AnimatedSection>
                <motion.div 
                  className="bg-white/50 dark:bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 dark:border-white/20"
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="size-9 text-gray-400 dark:text-gray-500 mb-4">
                    <svg viewBox="0 0 36 36" fill="currentColor">
                      <path d="M15 24C15 27.3 12.3 30 9 30C5.7 30 3 27.3 3 24C3 20.7 5.7 18 9 18C9.6 18 10.2 18.1 10.8 18.3C11.1 15 12.9 12.3 15.6 11.1C16.2 10.8 16.5 10.2 16.2 9.6C15.9 9 15.3 8.7 14.7 9C11.1 10.8 8.7 14.4 8.7 18.6C6.6 19.5 5.1 21.6 5.1 24C5.1 27 7.5 29.4 10.5 29.4C13.5 29.4 15.9 27 15.9 24H15ZM33 24C33 27.3 30.3 30 27 30C23.7 30 21 27.3 21 24C21 20.7 23.7 18 27 18C27.6 18 28.2 18.1 28.8 18.3C29.1 15 30.9 12.3 33.6 11.1C34.2 10.8 34.5 10.2 34.2 9.6C33.9 9 33.3 8.7 32.7 9C29.1 10.8 26.7 14.4 26.7 18.6C24.6 19.5 23.1 21.6 23.1 24C23.1 27 25.5 29.4 28.5 29.4C31.5 29.4 33.9 27 33.9 24H33Z"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                    Parth's exceptional product design ensures our website's success. Highly Recommended
                  </p>
                </motion.div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <motion.div 
                  className="bg-white/50 dark:bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 dark:border-white/20"
                  whileHover={{ scale: 1.02, rotateY: -5 }}
                  transition={{ duration: 0.3 }}
                  ref={statsRef}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.6 + i * 0.1 }}
                      >
                        <Star className="size-6 fill-[#FF7A00] text-[#FF7A00]" />
                      </motion.div>
                    ))}
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    <AnimatedCounter value={10} /> Years
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">Experience</p>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="about" className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatCard value={150} suffix="+" label="Projects Completed" />
              <StatCard value={50} suffix="+" label="Happy Clients" />
              <StatCard value={10} label="Years Experience" />
              <StatCard value={25} suffix="+" label="Awards Won" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 md:px-8 bg-white dark:bg-[#0C0C0C] transition-colors">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">
              My <span className="text-[#FF7A00]">Skills</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <AnimatedSection key={skill.name} delay={index * 0.1}>
                <SkillBar skill={skill} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 md:px-8 bg-[#0C0C0C] dark:bg-[#171717] transition-colors">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="text-white">My </span>
                <span className="text-[#FF7A00]">Services</span>
              </h2>
              <p className="text-white/70 text-lg max-w-xl">
                Specializing in creating modern digital experiences through UI/UX design, web development, and high-converting landing pages.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'UI / UX Design',
                description: 'Designing intuitive and modern user experiences.',
                image: 'https://images.unsplash.com/photo-1750056393349-dfaf647f7400?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1aSUyMHV4JTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc3MzQwNTc1MHww&ixlib=rb-4.1.0&q=80&w=1080'
              },
              {
                title: 'Web Design',
                description: 'Creating responsive and visually appealing websites.',
                image: 'https://images.unsplash.com/photo-1659841064804-5f507b1b488a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjB3ZWJzaXRlJTIwbW9ja3VwfGVufDF8fHx8MTc3MzQwNTc1MXww&ixlib=rb-4.1.0&q=80&w=1080'
              },
              {
                title: 'Landing Page',
                description: 'High-conversion landing pages for digital products.',
                image: 'https://images.unsplash.com/photo-1578398425527-e7c786c1e400?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kaW5nJTIwcGFnZSUyMGRlc2lnbiUyMG1vY2t1cHxlbnwxfHx8fDE3NzM0MDU3NTF8MA&ixlib=rb-4.1.0&q=80&w=1080'
              }
            ].map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.2}>
                <ServiceCard service={service} onClick={() => handleServiceClick(service.title)} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section className="py-20 px-4 md:px-8 bg-white dark:bg-[#0C0C0C] transition-colors">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-16 text-center">
              My <span className="text-[#FF7A00]">Work Experience</span>
            </h2>
          </AnimatedSection>

          <div className="space-y-12">
            {[
              {
                title: 'UI/UX Designer',
                company: 'Freelance Projects',
                description: 'Designed and delivered multiple user-centered digital products for various clients, focusing on intuitive interfaces and seamless user experiences.'
              },
              {
                title: 'Product Design',
                company: 'Startup Concepts',
                description: 'Led product design initiatives for startup ventures, from concept to launch, creating innovative solutions for modern digital challenges.'
              },
              {
                title: 'Technology Projects',
                company: 'College Development Projects',
                description: 'Developed and designed various technology projects during academic career, gaining hands-on experience in full-stack development and modern design systems.'
              }
            ].map((exp, index) => (
              <AnimatedSection key={exp.title} delay={index * 0.2}>
                <TimelineItem experience={exp} isLast={index === 2} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 md:px-8 bg-[#F4F4F4] dark:bg-[#171717] transition-colors">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Let's have a look at<br />my <span className="text-[#FF7A00]">Portfolio</span>
              </h2>
            </div>
          </AnimatedSection>

          {/* Filter Buttons */}
          <AnimatedSection delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {['All', 'Web', 'Mobile', 'IoT'].map((filter) => (
                <motion.button
                  key={filter}
                  onClick={() => setProjectFilter(filter)}
                  className={`px-6 py-3 rounded-full font-medium transition-colors ${
                    projectFilter === filter
                      ? 'bg-[#FF7A00] text-white'
                      : 'bg-white dark:bg-[#0C0C0C] text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#1a1a1a]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter}
                </motion.button>
              ))}
            </div>
          </AnimatedSection>

          {/* Portfolio Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredProjects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 0.1}>
                <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
              </AnimatedSection>
            ))}
          </motion.div>

          <AnimatedSection delay={0.4}>
            <div className="text-center mt-12">
              <motion.button 
                className="bg-[#FF7A00] hover:bg-[#FF7A00]/90 text-white px-10 py-4 rounded-full font-medium text-lg transition-colors inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewAllProjects}
              >
                View All Projects
                <ArrowUpRight size={20} />
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-8 bg-[#0C0C0C] dark:bg-[#171717] transition-colors">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="text-white">Testimonials That</span><br />
              <span className="text-[#FF7A00]">Speak to My Results</span>
            </h2>
          </AnimatedSection>

          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12"
              >
                <div className="flex gap-1 mb-6 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-6 fill-[#FF7A00] text-[#FF7A00]" />
                  ))}
                </div>
                <p className="text-white/90 text-xl mb-8 text-center leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="size-16 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FEB273]"></div>
                  <div>
                    <p className="text-white font-semibold text-lg">{testimonials[currentTestimonial].name}</p>
                    <p className="text-white/60">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="size-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={24} />
              </motion.button>
              <motion.button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="size-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentTestimonial ? 'w-8 bg-[#FF7A00]' : 'w-2 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 px-4 md:px-8 bg-white dark:bg-[#0C0C0C] transition-colors">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              Latest from <span className="text-[#FF7A00]">My Blog</span>
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
              Thoughts, insights, and stories about design, development, and building great products
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <AnimatedSection key={post.title} delay={index * 0.2}>
                <BlogCard post={post} onClick={() => handleBlogClick(post.title)} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.6}>
            <div className="text-center mt-12">
              <motion.a
                href="https://parthblog.space"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FF7A00] hover:bg-[#FF7A00]/90 text-white px-10 py-4 rounded-full font-medium text-lg transition-colors inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read More Articles
                <ArrowUpRight size={20} />
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Enhanced Interactive Sections */}
      <EnhancedSections />

      {/* Tools & Technologies Section */}
      <section className="py-20 px-4 md:px-8 bg-white dark:bg-[#0C0C0C] transition-colors">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              Tools & <span className="text-[#FF7A00]">Technologies</span>
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
              Here are the tools and technologies I use to bring ideas to life
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <ToolsGrid />
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-8 bg-[#0C0C0C] dark:bg-[#171717] transition-colors">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
              Frequently Asked <span className="text-[#FF7A00]">Questions</span>
            </h2>
            <p className="text-center text-white/70 mb-12">
              Everything you need to know about working with me
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <FAQSection />
          </AnimatedSection>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 md:px-8 bg-white dark:bg-[#0C0C0C] transition-colors">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <NewsletterSignup />
          </AnimatedSection>
        </div>
      </section>

      {/* Typing Speed Challenge Section */}
      <TypingSpeedChallenge />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-8 bg-[#F4F4F4] dark:bg-[#171717] transition-colors">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedSection>
            <div className="bg-gradient-to-br from-[#0C0C0C] to-[#1a1a1a] dark:from-[#1a1a1a] dark:to-[#0C0C0C] rounded-[40px] p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Let's work <span className="text-[#FF7A00]">together</span>
              </h2>
              <p className="text-white/70 mb-8">
                Have a project in mind? Fill out the form and I'll get back to you within 24 hours.
              </p>
              <ContactForm />
            </div>
          </AnimatedSection>

          {/* Contact Info & Share */}
          <div className="space-y-8">
            <AnimatedSection delay={0.2}>
              <div className="bg-white dark:bg-[#0C0C0C] rounded-3xl p-8 border border-gray-200 dark:border-white/10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Get in touch
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-full bg-[#FF7A00]/10 flex items-center justify-center">
                      <Mail className="text-[#FF7A00]" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-900 dark:text-white font-medium">parthuidesigns@gmail.com</p>
                        <CopyToClipboard text="parthuidesigns@gmail.com" label="Email" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="bg-white dark:bg-[#0C0C0C] rounded-3xl p-8 border border-gray-200 dark:border-white/10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Share my portfolio
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                  Know someone who needs a designer? Share my portfolio!
                </p>
                <ShareButtons />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 bg-[#0C0C0C] dark:bg-black text-white transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <AnimatedSection>
              <div>
                <Logo size={64} animated className="mb-4" />
                <p className="text-white/60 mb-4">UI/UX Designer | CSE Student | Startup Builder</p>
                <div className="flex gap-4">
                  <motion.a 
                    href="#" 
                    className="text-white/60 hover:text-[#FF7A00] transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    onClick={(e) => { e.preventDefault(); handleSocialClick('GitHub'); }}
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="text-white/60 hover:text-[#FF7A00] transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    onClick={(e) => { e.preventDefault(); handleSocialClick('LinkedIn'); }}
                  >
                    <Linkedin size={20} />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="text-white/60 hover:text-[#FF7A00] transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    onClick={(e) => { e.preventDefault(); handleSocialClick('Twitter'); }}
                  >
                    <Twitter size={20} />
                  </motion.a>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div>
                <h3 className="font-bold mb-4 text-lg">Navigation</h3>
                <ul className="space-y-3">
                  <li><a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} className="text-white/60 hover:text-[#FF7A00] transition-colors">Home</a></li>
                  <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="text-white/60 hover:text-[#FF7A00] transition-colors">About</a></li>
                  <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="text-white/60 hover:text-[#FF7A00] transition-colors">Services</a></li>
                  <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }} className="text-white/60 hover:text-[#FF7A00] transition-colors">Portfolio</a></li>
                  <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="text-white/60 hover:text-[#FF7A00] transition-colors">Contact</a></li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div>
                <h3 className="font-bold mb-4 text-lg">Contact</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-white/60">
                    <Mail size={18} />
                    <span>parthuidesigns@gmail.com</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-white/60 text-sm">
            <p>© 2026 Parth Kachare. All rights reserved. Built with ❤️ and React.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper Components
function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

function StatCard({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  return (
    <motion.div 
      className="bg-white dark:bg-[#171717] rounded-3xl p-8 text-center border border-gray-200 dark:border-white/10"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-4xl md:text-5xl font-bold text-[#FF7A00] mb-2">
        <AnimatedCounter value={value} suffix={suffix} />
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{label}</p>
    </motion.div>
  );
}

function SkillBar({ skill }: { skill: { name: string; level: number; icon: any } }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = skill.icon;

  return (
    <div ref={ref} className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-[#FF7A00]/10 flex items-center justify-center">
            <Icon className="text-[#FF7A00]" size={20} />
          </div>
          <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
        </div>
        <span className="text-gray-600 dark:text-gray-400 font-medium">{skill.level}%</span>
      </div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FEB273] rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function ServiceCard({ service, onClick }: { service: { title: string; description: string; image: string }; onClick?: () => void }) {
  return (
    <motion.div 
      className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-[40px] overflow-hidden cursor-pointer"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <div className="p-8">
        <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-gradient-to-br from-gray-800 to-gray-900">
          <motion.img 
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover opacity-80"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
        </div>

        <div className="border-t border-white/10 pt-6">
          <h3 className="text-2xl font-semibold text-white mb-3">{service.title}</h3>
          <p className="text-white/60 mb-6">{service.description}</p>
          
          <motion.button 
            className="ml-auto flex items-center justify-center size-12 rounded-full bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90 transition-colors"
            whileHover={{ scale: 1.1, rotate: 45 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUpRight size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function TimelineItem({ experience, isLast }: { experience: any; isLast: boolean }) {
  return (
    <motion.div 
      className="flex gap-8 items-start"
      whileHover={{ x: 10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center">
        <motion.div 
          className="size-4 rounded-full bg-[#FF7A00]"
          whileHover={{ scale: 1.5 }}
        />
        {!isLast && <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-700 mt-4"></div>}
      </div>
      <div className="flex-1 pb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{experience.title}</h3>
        <p className="text-[#FF7A00] font-medium mb-2">{experience.company}</p>
        <p className="text-gray-600 dark:text-gray-400">{experience.description}</p>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, onClick }: { project: any; onClick: () => void }) {
  return (
    <motion.div 
      className="group bg-gray-100 dark:bg-[#1a1a1a] rounded-3xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={onClick}
      layout
    >
      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <motion.img 
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{project.description}</p>
        <div className="flex gap-2">
          {project.tags.map((tag: string) => (
            <span key={tag} className="px-3 py-1 bg-[#FF7A00]/10 text-[#FF7A00] rounded-full text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function BlogCard({ post, onClick }: { post: any; onClick?: () => void }) {
  return (
    <motion.article 
      className="bg-white dark:bg-[#171717] rounded-3xl overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
      whileHover={{ y: -10 }}
      onClick={onClick}
    >
      <div className="aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <motion.img 
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#FF7A00] transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
        <motion.button 
          className="text-[#FF7A00] font-medium flex items-center gap-2"
          whileHover={{ x: 5 }}
        >
          Read More <ArrowUpRight size={16} />
        </motion.button>
      </div>
    </motion.article>
  );
}