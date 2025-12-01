import { useState, useEffect } from 'react'; // Import useState and useEffect
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider
import { ArrowUp } from 'lucide-react'; // Import icon for the button
import ChatWidget from './components/Chat/ChatWidget';

function App() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Show button after scrolling down 300px
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <ThemeProvider> {/* Wrap with ThemeProvider */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-800 text-slate-900 dark:text-white">
        <Navbar />
        <div className="pt-16">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Achievements />
          <Contact />
        </div>
        {showButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-10 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Back to top"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}
        <ChatWidget /> {/* Add the chat widget here */}
      </div>
    </ThemeProvider>
  );
}

export default App;
