import { Download, Mail, ArrowRight } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Hero() {
  const vantaRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    let vantaEffect: any;
    if (vantaRef.current) {
      vantaEffect = (window as any).VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: true,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: theme === 'light' ? 0x0 : 0xffffff, // Change color based on theme
        backgroundColor: theme === 'light' ? 0xffffff : 0x212b3d, // Change background based on theme
        points: 8.00,
        maxPoints: 5.00,
        maxDistance: 25.00,
        spacing: 27.00
      });
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [theme]); // Re-run effect when theme changes

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden" id="">
      <div ref={vantaRef} className="absolute inset-0 z-0"></div> {/* Vanta.js background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-violet-50/30 dark:from-slate-900/50 dark:via-transparent dark:to-slate-800/30 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="inline-block">
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700">
              Open to Opportunities
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white leading-tight">
            Senior Full Stack Engineer
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 mt-2">
              Laravel + React
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Specializing in performance optimization, distributed systems, and scalable architecture.
            Building high-performance applications that handle millions of users.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <a
              href="#contact"
              aria-label="Contact Me"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Contact Me
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href= {`${import.meta.env.VITE_BASE_URL}Satheesh_Kumar_Senior_FullStack_Engineer_Resume.pdf`}
              download="Satheesh_Kumar_Senior_FullStack_Engineer_Resume.pdf"
              aria-label="Download Satheesh Kumar's Resume"
              className="px-8 py-4 bg-white text-slate-900 rounded-xl font-medium hover:shadow-lg border border-slate-200 transition-all duration-300 flex items-center gap-2 dark:bg-slate-700 dark:text-white dark:border-slate-600 dark:hover:shadow-slate-600/30"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>
          </div>

          <div className="grid grid-cols-5 gap-8 max-w-2xl mx-auto pt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">8+</div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">15+</div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">80%</div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">Performance Boost</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">65%</div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">Server Load Reduced</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">5+</div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">Developers Mentored</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
