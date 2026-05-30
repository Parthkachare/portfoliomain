import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { AvailabilityStatus } from './AvailabilityStatus';
import { VisitorCounter } from './VisitorCounter';
import { WeatherWidget } from './WeatherWidget';
import { GitHubContributions } from './GitHubContributions';
import { BeforeAfterSlider } from './BeforeAfterSlider';

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

export function EnhancedSections() {
  return (
    <>
      {/* Availability & Counters */}
      <section className="py-12 px-4 md:px-8 bg-[#F4F4F4] dark:bg-[#0C0C0C] transition-colors">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-wrap gap-6 justify-center">
              <AvailabilityStatus />
              <VisitorCounter />
              <WeatherWidget />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* GitHub Contributions */}
      <section className="py-20 px-4 md:px-8 bg-white dark:bg-[#171717] transition-colors">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              My <span className="text-[#FF7A00]">Coding Activity</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <GitHubContributions />
          </AnimatedSection>
        </div>
      </section>

      {/* Before/After Design Showcase */}
      <section className="py-20 px-4 md:px-8 bg-[#F4F4F4] dark:bg-[#0C0C0C] transition-colors">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              Design <span className="text-[#FF7A00]">Transformations</span>
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              See how I transform ideas into beautiful, functional designs
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1649442746245-f51f4b76963f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwZGVzaWduJTIwYmVmb3JlJTIwYWZ0ZXIlMjBjb21wYXJpc29ufGVufDF8fHx8MTc3MzQxMjI4OHww&ixlib=rb-4.1.0&q=80&w=1080"
              afterImage="https://images.unsplash.com/photo-1762330463863-a6a399beb5ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwcmVkZXNpZ24lMjBtb2NrdXB8ZW58MXx8fHwxNzczNDEyMjg5fDA&ixlib=rb-4.1.0&q=80&w=1080"
              beforeLabel="Old Design"
              afterLabel="New Design"
            />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
