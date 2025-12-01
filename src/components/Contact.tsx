import React, { useState, useEffect } from 'react';
import { motivationalQuotes } from '../utils/quotes';
import { Mail, Linkedin, Github, FileText, Send, Code, Briefcase, Users, Trophy } from 'lucide-react'; // Added icons for stats counter

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/satheeshdeveloper/',
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/satheeshkumardeveloper',
    color: 'from-slate-700 to-slate-900',
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:satheshdeveloper@gmail.com',
    color: 'from-violet-500 to-violet-600'
  },
  {
    name: 'Resume',
    icon: FileText,
    href: 'Satheesh_Kumar_Senior_FullStack_Engineer_Resume.pdf',
    color: 'from-emerald-500 to-emerald-600'
  }
];

interface AnimatedCounterProps {
  end: number | string;
  duration?: number;
  suffix?: string;
  prefix?: string;
  icon: React.ElementType;
  label: string;
  gradient: string;
}

// Reusable animated counter component
const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '', icon: Icon, label, gradient }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
          setCount(0); // Reset count when out of view
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the component is in view
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const endValue = typeof end === 'string' ? parseInt(end.replace(/\D/g, '')) : end; // Extract numeric part for counting

    if (isNaN(endValue as number)) { // Cast to number for isNaN check
      setCount(0); // If not a valid number, start from 0 and display the string directly later
      return;
    }

    const incrementTime = (duration / endValue);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === endValue) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [end, duration, inView]);

  return (
    <div ref={ref} className={`flex flex-col items-center justify-center p-4 rounded-xl text-white shadow-lg ${gradient}`}>
      <Icon className="w-8 h-8 mb-2" />
      <div className="text-3xl font-bold">{prefix}{count}{suffix}</div>
      <div className="text-sm opacity-80 mt-1">{label}</div>
    </div>
  );
};


export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [randomQuote, setRandomQuote] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setRandomQuote(motivationalQuotes[randomIndex]);
  }, []);

  // Validation states
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [messageValid, setMessageValid] = useState(true);

  const validateForm = () => {
    let isValid = true;

    if (name.trim() === '') {
      setNameValid(false);
      isValid = false;
    } else {
      setNameValid(true);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailValid(false);
      isValid = false;
    } else {
      setEmailValid(true);
    }

    if (message.trim() === '') {
      setMessageValid(false);
      isValid = false;
    } else {
      setMessageValid(true);
    }
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) {
      setError('Please fill in all required fields correctly.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://expense-api-node.netlify.app/.netlify/functions/api/sendmail/sendmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setError(data.error || 'Failed to send message.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-800">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 text-center">
          Let's Connect
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-center mb-16 text-lg">
          Available for freelance projects and full-time opportunities
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  aria-invalid={!nameValid}
                  aria-describedby={!nameValid ? 'name-error' : undefined}
                  className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border ${nameValid ? 'border-slate-200 dark:border-slate-600' : 'border-red-500 !important'} rounded-xl focus:outline-none focus:ring-2 ${nameValid ? 'focus:ring-blue-500' : 'focus:ring-red-500 !important'} focus:border-transparent transition-all text-slate-900 dark:text-white`}
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameValid(true); // Reset validation on change
                  }}
                />
                 {!nameValid && <p id="name-error" className="text-red-500 text-sm mt-1">Name cannot be empty.</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  aria-invalid={!emailValid}
                  aria-describedby={!emailValid ? 'email-error' : undefined}
                  className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border ${emailValid ? 'border-slate-200 dark:border-slate-600' : 'border-red-500 !important'} rounded-xl focus:outline-none focus:ring-2 ${emailValid ? 'focus:ring-blue-500' : 'focus:ring-red-500 !important'} focus:border-transparent transition-all text-slate-900 dark:text-white`}
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailValid(true); // Reset validation on change
                  }}
                />
                {!emailValid && <p id="email-error" className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  aria-invalid={!messageValid}
                  aria-describedby={!messageValid ? 'message-error' : undefined}
                  className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border ${messageValid ? 'border-slate-200 dark:border-slate-600' : 'border-red-500 !important'} rounded-xl focus:outline-none focus:ring-2 ${messageValid ? 'focus:ring-blue-500' : 'focus:ring-red-500 !important'} focus:border-transparent transition-all resize-none text-slate-900 dark:text-white`}
                  placeholder="Tell me about your project..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setMessageValid(true); // Reset validation on change
                  }}
                />
                {!messageValid && <p id="message-error" className="text-red-500 text-sm mt-1">Message cannot be empty.</p>}
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2 group"
                disabled={loading}
              >
                {loading ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </>
                )}
              </button>

              {success && (
                <p className="text-green-600 text-center">
                  Message sent successfully!
                </p>
              )}
              {error && (
                <p className="text-red-600 text-center">
                  {error}
                </p>
              )}
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Connect With Me
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      link.name === 'Resume'
                        ? `Download Satheesh Kumar's Resume (PDF)`
                        : `Visit Satheesh Kumar's ${link.name} profile`
                    }
                    className="group flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-100 dark:border-slate-600 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-700/50 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <link.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl p-8 text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-3">
                Open to Opportunities
              </h3>
              <p className="text-blue-100 leading-relaxed mb-4">
                I'm currently available for freelance projects and full-time positions.
                Let's discuss how I can help bring your ideas to life.
              </p>
              <div className="flex items-center gap-2 text-blue-100">
                <Mail className="w-5 h-5" />
                <span className="font-medium">satheshdeveloper@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
        {/* Portfolio Stats Counters */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <AnimatedCounter
            end={11}
            label="Projects Completed"
            icon={Code}
            gradient="from-blue-600 to-indigo-700"
          />
          <AnimatedCounter
            end={5}
            suffix="+"
            label="Years Experience"
            icon={Briefcase}
            gradient="from-green-600 to-teal-700"
          />
          <AnimatedCounter
            end={15}
            suffix="+"
            label="Technologies Mastered"
            icon={Trophy}
            gradient="from-purple-600 to-pink-700"
          />
          <AnimatedCounter
            end={50}
            suffix="+"
            label="Clients Served"
            icon={Users}
            gradient="from-orange-600 to-red-700"
          />
        </div>

        <p className="text-slate-600 dark:text-slate-300">
        <a href="https://sathesh-resume.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-all duration-300 hover:scale-105 inline-block">Sathesh-Resume</a>  © {new Date().getFullYear()} Senior Full Stack Engineer
        </p>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">{randomQuote}</p>
        <div className="mt-8 flex justify-center">
          <img src={`${import.meta.env.VITE_BASE_URL}Sathesh_Develope_logo.png`} alt="Portfolio Logo" className="w-24 h-24 object-contain" />
        </div>
      </div>
    </section>
  );
}
