import { useState, useEffect, useRef } from 'react';

// Main Stats component
const Stats = ({
  stats = [
    { target: 50, label: "Events Organized", suffix: "+" },
    { target: 25, label: "Startups Incubated", suffix: "+" },
    { target: 15, label: "Industry Partnerships", suffix: "+" },
    { target: 100, label: "Success Stories", suffix: "%" }
  ]
}) => {
  // Holds the current animated values
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));

  // Ensures animation happens only once
  const [hasAnimated, setHasAnimated] = useState(false);

  // Reference to section for observing when it comes into view
  const sectionRef = useRef(null);

  // Animate the number counters when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters(); // start counting animation
          }
        });
      },
      { threshold: 0.5 } // triggers when half of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Animate each counter smoothly up to its target value
  const animateCounters = () => {
    stats.forEach((stat, index) => {
      let current = 0;
      const increment = stat.target / 60;

      const timer = setInterval(() => {
        current += increment;

        if (current >= stat.target) {
          current = stat.target;
          clearInterval(timer);
        }

        setAnimatedValues(prev => {
          const updated = [...prev];
          updated[index] = Math.floor(current);
          return updated;
        });
      }, 33); // roughly 60 frames (~2 seconds)
    });
  };

  // Particle animation for floating bubbles in background
  const Particles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full opacity-60 pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              animation: 'float 6s infinite linear'
            }}
          />
        ))}
      </div>
    );
  };

  // Return the actual JSX content
  return (
    <>
      {/* Inline CSS for animation and glow effect */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10%, 90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-10vh) rotate(360deg);
            opacity: 0;
          }
        }

        .gradient-text {
          color: #3b82f6;
        }

        .glow-hover {
          transition: all 0.3s ease;
        }

        .glow-hover:hover {
          background: radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
          transform: translateY(-8px);
        }
      `}</style>

      {/* Outer section container */}
      <div className="w-full h-[262px] bg-black flex items-center justify-center py-8 px-4 relative overflow-hidden">
        <Particles />

        <div ref={sectionRef} className="w-full max-w-6xl relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 md:p-10 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-700/30 glow-hover relative overflow-hidden"
              >
                <div className="relative z-10">
                        <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3" style={{ color: '#00B7FF' }}>
                            {animatedValues[index]}{stat.suffix}
                        </div>


                  <div className="text-gray-300 text-sm md:text-base font-medium tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;