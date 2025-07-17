import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Events from './EventsSection';
import TeamSection from './Teamsection';
import Footer from './Footer';
import Stats from './Stats';
import About from './AboutSection';
import Gallery from './Gallery';
import AOS from 'aos';
import 'aos/dist/aos.css';
import bgVideo from '../assets/videos/bg-video.mp4';
import ecellLogo from '../assets/images/ecell-logo.png'; // adjust path if needed
import SponsorForm from './SponsorForm';


const Home = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  // Optimized mobile menu toggle
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Optimized navigation handler
  const handleNavClick = useCallback((pathOrId) => {
    setIsMobileMenuOpen(false);

    if (pathOrId === '/events') {
      navigate('/events');
    } else {
      const target = document.querySelector(pathOrId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }, [navigate]);

  // Optimized mouse move handler with throttling
  const handleMouseMove = useCallback((e) => {
    setMousePosition({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight
    });
  }, []);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  // Mouse movement effect with throttling
  useEffect(() => {
    let timeoutId;
    const throttledMouseMove = (e) => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        handleMouseMove(e);
        timeoutId = null;
      }, 16); // ~60fps
    };

    window.addEventListener('mousemove', throttledMouseMove);
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleMouseMove]);

  // Scroll effect with throttling
  useEffect(() => {
    let timeoutId;
    const throttledScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, 16); // ~60fps
    };

    window.addEventListener('scroll', throttledScroll);
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  // Calculate parallax positions (memoized)
  const getParallaxStyle = useCallback((index) => {
    const speed = (index + 1) * 0.5;
    const x = (mousePosition.x - 0.5) * speed * 50;
    const y = (mousePosition.y - 0.5) * speed * 50;
    return {
      transform: `translate(${x}px, ${y}px)`
    };
  }, [mousePosition]);

  // Handle events navigation
  useEffect(() => {
    if (location.pathname === '/events') {
      const target = document.getElementById('events');
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }, [location]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: false,
      offset: 100,
    });
  }, []);

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      <style>{`
        @import url(https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic);

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Poppins', sans-serif;
          background: black;
          min-height: 100vh;
          color: white;
          overflow-x: hidden;
        }

        .bottom-gradient-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 250px; /* Adjust height as needed */
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  z-index: 1;
  pointer-events: none;
}


        .first-page {
          width: 100%;
          height: 100vh;
          position: relative;
          display: flex;
          flex-direction: column;
          background: rgba(0, 0, 0, 0.4);
        }

        .video-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          z-index: -1;
          pointer-events: none;
        }

        .header {
          width: 100%;
          background: rgba(0, 0, 0, 0.0);
          backdrop-filter: blur(5px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 100;
          padding: 10px;
          
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 50px;
          width: 100%;
        }

        .ecell-logo {
  height: 60px;
  width: auto;
  object-fit: contain;
  padding-left: 20px;
}


        .nav-links {
          display: flex;
          list-style: none;
          gap: 10px;
          align-items: center;
          padding-right: 30px;
        }

        .nav-links li {
          position: relative;
        }

        .nav-item {
          font-family: 'Poppins', sans-serif;
          color: white;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          letter-spacing: 0.5px;
          padding: 15px 20px;
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
          display: inline-block;
          text-transform: uppercase;
          border: 0px solid rgba(165, 163, 163, 0.77);
          border-radius: 50px;
          overflow: hidden;
          z-index: 9;
          
          
        }

        .nav-item::after {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: white;
  left: 0;
  bottom: -100%;
  border-radius: 50%;
  transition: all ease 0.4s;
  z-index: -1;
}

        .nav-item:hover::after {
  bottom: 0;
  border-radius: 0;
}
        .nav-item:hover {
          color: black;
        }

        .mobile-menu-toggle {
          display: none;
          background: transparent;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .mobile-menu-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .main-content {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          text-align: center;
          position: relative;
          padding: 40px 20px;
        }

        .hero-text {
          max-width: 1200px;
          animation: fadeInUp 1s ease-out;
          text-align: center;
        }

        .hero-text h1 {
          font-size: clamp(1.8rem, 6vw, 5.5rem);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 30px;
          letter-spacing: clamp(-2px, -0.5vw, -1px);
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }

        .gradient-text {
          background: linear-gradient(90deg, #FAF9F9 0%, #F22B03 25%, #ffffff 75%, #086BFF 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          animation: gradientShift 3s ease-in-out infinite alternate;
          padding-left: 5px;
          padding-right: 5px;
          max-width: 100%;
          word-break: break-word;
        }

        .subtitle {
          display: flex;
          justify-content: center;
          gap: 40px;
          font-size: clamp(0.9rem, 2vw, 1.2rem);
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 20px;
        }

        .subtitle span {
          position: relative;
          transition: all 0.3s ease;
          opacity: 0;
          animation: fadeInWord 0.8s ease-out forwards;
        }

        .subtitle span:nth-child(1) { animation-delay: 0s; }
        .subtitle span:nth-child(2) { animation-delay: 0.2s; }
        .subtitle span:nth-child(3) { animation-delay: 0.4s; }

        .subtitle span:hover {
          transform: translateY(-3px);
          text-shadow: 0 5px 15px rgba(255, 255, 255, 0.3);
        }

        .bg-shapes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .shape {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
          transition: transform 0.1s ease-out;
        }

        .shape:nth-child(1) {
          width: 80px;
          height: 80px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .shape:nth-child(2) {
          width: 120px;
          height: 120px;
          top: 60%;
          right: 15%;
          animation-delay: 2s;
        }

        .shape:nth-child(3) {
          width: 60px;
          height: 60px;
          bottom: 20%;
          left: 20%;
          animation-delay: 4s;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInWord {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .header {
            padding: 8px;
          }

          .navbar {
            height: 45px;
          }

          .logo {
          height: 40px;
  width: auto;
  object-fit: contain;
  padding-left: 20px;
            
          }

          .nav-links {
            display: ${isMobileMenuOpen ? 'flex' : 'none'};
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(15px);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            flex-direction: column;
            gap: 0;
            z-index: 1000;
            padding: 0;
          }

          .nav-item {
            font-size: 14px;
            padding: 18px 20px;
            text-align: center;
            width: 100%;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .nav-item::after {
            display: none;
          }

          .nav-item:hover {
            background: rgba(255, 255, 255, 0.05);
          }

          .mobile-menu-toggle {
            display: block;
          }

          .hero-text h1 {
            font-size: clamp(1.5rem, 5vw, 2.5rem);
            line-height: 1.3;
            letter-spacing: clamp(-1px, -0.3vw, -0.5px);
          }

          .gradient-text {
            padding-left: 2px;
            padding-right: 2px;
          }

          .subtitle {
            flex-direction: column;
            gap: 15px;
            font-size: clamp(0.8rem, 2.5vw, 1rem);
          }

          .main-content {
            padding: 20px;
          }
        }

        @media (max-width: 480px) {
          .header {
            padding: 6px;
          }

          .navbar {
            height: 40px;
          }

          .logo {
            height: 30px;
  width: auto;
  object-fit: contain;
  padding-left: 20px;
          }

          .hero-text {
            padding: 0 10px;
          }

          .hero-text h1 {
            font-size: clamp(1.2rem, 4.5vw, 2rem);
            letter-spacing: clamp(-1px, -0.2vw, -0.5px);
            line-height: 1.4;
          }

          .gradient-text {
            padding-left: 1px;
            padding-right: 1px;
          }

          .subtitle {
            font-size: clamp(0.7rem, 2vw, 0.9rem);
            letter-spacing: 1px;
            gap: 10px;
          }

          .nav-item {
            font-size: 12px;
            padding: 15px 18px;
          }

          .mobile-menu-toggle {
            font-size: 18px;
            padding: 6px;
          }
        }

        @media (max-width: 320px) {
          .hero-text h1 {
            font-size: clamp(1rem, 4vw, 1.5rem);
            line-height: 1.5;
          }
          
          .subtitle {
            font-size: clamp(0.6rem, 1.8vw, 0.8rem);
          }

          .nav-item {
            font-size: 11px;
            padding: 12px 15px;
          }

          .logo {
            height: 25px;
  width: auto;
  object-fit: contain;
  padding-left: 20px;
          }
        }

        /* Desktop responsive for navigation */
        @media (min-width: 769px) and (max-width: 1024px) {
          .navbar {
            height: 55px;
          }

          .nav-item {
            font-size: 14px;
            padding: 12px 18px;
          }

          .logo {
            font-size: 20px;
          }
        }

        @media (min-width: 1025px) {
          .navbar {
            height: 60px;
          }

          .nav-item {
            font-size: 15px;
            padding: 12px 20px;
          }

          .logo {
            font-size: 22px;
          }
        }
      `}</style>
      <div className="bottom-gradient-overlay"></div>
      <div className="first-page">
        {/* <div className="bg-shapes">
          <div className="shape" style={getParallaxStyle(0)}></div>
          <div className="shape" style={getParallaxStyle(1)}></div>
          <div className="shape" style={getParallaxStyle(2)}></div>
        </div> */}

        <video
          className="video-background"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <header className="header">
          <nav className="navbar">
              <img src={ecellLogo} alt="E-Cell Logo" className="ecell-logo" />
            

            <ul className="nav-links">
              <li><a className="nav-item" onClick={() => handleNavClick('#home')}>HOME</a></li>
              <li><a className="nav-item" onClick={() => handleNavClick('#events')}>EVENTS</a></li>
              <li><a className="nav-item" onClick={() => handleNavClick('#team')}>TEAM</a></li>
              <li><a className="nav-item" onClick={() => handleNavClick('#gallery')}>GALLERY</a></li>
              <li><a className="nav-item" onClick={() => handleNavClick('#about')}>ABOUT US</a></li>
            </ul>
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
              ☰
            </button>
          </nav>
        </header>

        <main className="main-content">
          <div className="hero-text">
            <h1>
              <span className="gradient-text">ENTREPRENEURSHIP - CELL</span>
              <br />
              <span className="gradient-text">IIITDM KANCHEEPURAM</span>
            </h1>
            <div className="subtitle">
              <span>INNOVATE</span>
              <span>INSPIRE</span>
              <span>IGNITE</span>
            </div>
          </div>
        </main>
      </div>

    
     <div id="about">
        <About />
      </div>
      
      <div id="events">
        <Events />
      </div>

      <div id="Stats">
        <Stats />
      </div>

      <div id="gallery">
        <Gallery />
      </div>

      <div id="teamsection">
        <TeamSection />
      </div>

      <div id="sponsorform">
        <SponsorForm />
      </div>

      <div id="Footer">
        <Footer />
      </div>

    </div>
  );
};

export default Home;
