import React, { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    const totalSlides = 3;

    const updateSlides = () => {
      const scrollContainer = document.querySelector('.scroll-container');
      const scrollTop = window.pageYOffset;
      const containerTop = scrollContainer.offsetTop;
      const containerHeight = scrollContainer.offsetHeight;

      const scrollProgress = Math.max(
        0,
        Math.min(1, (scrollTop - containerTop) / (containerHeight - window.innerHeight))
      );

      const slides = document.querySelectorAll('.slide');

      const slideThresholds = [
        { enter: 0.1, exit: 0.02 },
        { enter: 0.3, exit: 0.22 },
        { enter: 0.5, exit: 0.42 },
      ];

      for (let i = 0; i < totalSlides; i++) {
        const slide = slides[i];
        const threshold = slideThresholds[i];

        slide.classList.remove('active');

        if (scrollProgress >= threshold.enter) {
          slide.classList.add('active');
          slide.style.opacity = '1';
          slide.style.transform = `translateY(calc(5vh + ${i * 5}vh))`;
        } else if (scrollProgress > threshold.exit) {
          const exitProgress = (scrollProgress - threshold.exit) / (threshold.enter - threshold.exit);
          const opacity = exitProgress;
          const translateY = 100 - exitProgress * 95;
          slide.style.opacity = opacity.toString();
          slide.style.transform = `translateY(${translateY - i * 5}vh)`;
        } else {
          slide.style.opacity = '0';
          slide.style.transform = 'translateY(100vh)';
        }
      }

      if (scrollProgress >= 0.6) {
        for (let i = 0; i < totalSlides; i++) {
          slides[i].classList.add('active');
          slides[i].style.opacity = '1';
          slides[i].style.transform = `translateY(calc(5vh + ${i * 5}vh))`;
        }
      }
    };

    const onScroll = () => {
      requestAnimationFrame(updateSlides);
    };

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', updateSlides);
    updateSlides();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateSlides);
    };
  }, []);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          color: #fff;
          font-family: 'Arial', sans-serif;
          overflow-x: hidden;
        }

        @keyframes floatRocket {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-5px) rotate(-2deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }

        .scroll-container {
          height: 500vh;
          position: relative;
          background: #000;
        }

        .slide-container {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #000;
        }

        .slide {
          position: absolute;
          width: 80%;
          max-width: 1200px;
          height: 70vh;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          border-radius: 20px;
          padding: 60px 40px;
          text-align: center;
          border: 1px solid #333;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          transform: translateY(100vh);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          opacity: 0;
        }

        .slide.active {
          opacity: 1;
        }

        .slide.slide-0 { 
          z-index: 1; 
          background: linear-gradient(135deg, #f5f5dc 0%, #e6e6d0 100%);
          color: #333;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          padding: 40px 60px;
        }

        .slide.slide-1 { 
          z-index: 2; 
          background: linear-gradient(135deg, #ffb39f 0%, #ff9b7f 100%);
          color: #000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          padding: 40px 60px;
          position: relative;
        }

        .slide.slide-2 { 
          z-index: 3; 
          background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          padding: 40px 60px;
        }

        .slide-content {
          flex: 1;
          padding-right: 40px;
        }

        .slide-images {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 15px;
          max-width: 400px;
        }

        .image-row {
          display: flex;
          gap: 15px;
        }

        .image-placeholder {
          background: linear-gradient(135deg, #ddd 0%, #bbb 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          font-size: 12px;
          position: relative;
          overflow: hidden;
        }

        .image-main {
          height: 180px;
          flex: 1;
        }

        .image-small {
          height: 120px;
          flex: 1;
        }

        .vision-content {
          flex: 0 0 60%;
          padding-right: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        .vision-image {
          flex: 0 0 35%;
          background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
          border-radius: 15px;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          background-image: url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80');
          background-size: cover;
          background-position: center;
        }

        .vision-image::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 15px;
        }

        .mission-content {
          flex: 0 0 60%;
          padding-right: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        .mission-images {
          flex: 0 0 35%;
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 350px;
        }

        .mission-image {
          background: linear-gradient(135deg, #333 0%, #555 100%);
          border-radius: 15px;
          height: 140px;
          background-size: cover;
          background-position: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transform: rotate(-2deg);
          transition: transform 0.3s ease;
        }

        .mission-image:hover {
          transform: rotate(0deg) scale(1.02);
        }

        .mission-image:nth-child(2) {
          transform: rotate(3deg);
          margin-left: 20px;
        }

        .mission-image:nth-child(2):hover {
          transform: rotate(0deg) scale(1.02);
        }

        .mission-image-1 {
          background-image: url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80');
        }

        .mission-image-2 {
          background-image: url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80');
        }

        .mission-image::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 15px;
        }

        .vision-title {
          display: flex;
          align-items: center;
          gap: 15px;
          justify-content: flex-start;
          margin-bottom: 25px;
        }

        .mission-title {
          display: flex;
          align-items: center;
          gap: 20px;
          justify-content: flex-start;
          margin-bottom: 30px;
        }

        .mission-title-icon {
          width: 70px;
          height: 70px;
          flex-shrink: 0;
        }

        .vision-title-icon {
          width: 70px;
          height: 70px;
          flex-shrink: 0;
        }

        .vision-light-bulb {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bulb-icon {
          width: 50px;
          height: 50px;
          background: #000;
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bulb-icon::before {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 8px;
          background: #000;
          border-radius: 0 0 5px 5px;
        }

        .bulb-rays {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
        }

        .bulb-ray {
          position: absolute;
          width: 2px;
          height: 12px;
          background: #000;
          border-radius: 1px;
        }

        .bulb-ray:nth-child(1) { top: -20px; left: 50%; transform: translateX(-50%); }
        .bulb-ray:nth-child(2) { top: 5px; right: -20px; transform: rotate(45deg); }
        .bulb-ray:nth-child(3) { bottom: 5px; right: -20px; transform: rotate(-45deg); }
        .bulb-ray:nth-child(4) { bottom: -20px; left: 50%; transform: translateX(-50%); }
        .bulb-ray:nth-child(5) { bottom: 5px; left: -20px; transform: rotate(45deg); }
        .bulb-ray:nth-child(6) { top: 5px; left: -20px; transform: rotate(-45deg); }

        .rocket-icon {
          position: absolute;
          bottom: 20px;
          left: 20px;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 50px;
          animation: floatRocket 2.5s ease-in-out infinite;
          transition: transform 0.3s ease;
        }

        .rocket-icon:hover {
          transform: translateY(-15px) scale(1.05) rotate(-3deg);
        }

        .icon {
          width: 120px;
          height: 120px;
          margin: 0 auto 30px;
        }

        .icons-container {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin: 30px 0;
          flex-wrap: wrap;
          gap: 20px;
        }

        .icon-small {
          width: 80px;
          height: 80px;
        }

        svg {
          width: 100%;
          height: 100%;
          stroke: currentColor;
          stroke-width: 2;
          fill: none;
        }

        .rocket-corner {
          position: absolute;
          bottom: 20px;
          left: 20px;
          width: 60px;
          height: 60px;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .rocket-corner:hover {
          opacity: 1;
        }

        .slide-title {
          font-size: 2.8rem;
          font-weight: 700;
          margin-bottom: 25px;
          letter-spacing: 1px;
          color: #333;
          line-height: 1.2;
        }

        .slide-description {
          font-size: 1.08rem;
          line-height: 1.7;
          color: #555;
          max-width: 520px;
        }

        .vision-title h2 {
          font-size: 3.2rem;
          font-weight: 800;
          margin: 0;
          color: #000;
          text-transform: uppercase;
          letter-spacing: 2px;
          position: relative;
          line-height: 1;
        }

        .mission-title h2 {
          font-size: 3.2rem;
          font-weight: 800;
          margin: 0;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 2px;
          position: relative;
          line-height: 1;
        }

        .vision-description {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #000;
          max-width: 580px;
          text-align: left;
        }

        .mission-description {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #ccc;
          max-width: 580px;
          text-align: left;
        }

        .section-title {
          position: absolute;
          top: 50px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 3rem;
          font-weight: 600;
          color: #fff;
          z-index: 100;
        }

        @media (max-width: 1024px) {
          .slide.slide-0,
          .slide.slide-1,
          .slide.slide-2 {
            flex-direction: column;
            text-align: center;
            padding: 40px 30px;
            align-items: center;
          }

          .slide-content,
          .vision-content,
          .mission-content {
            padding-right: 0;
            margin-bottom: 30px;
            flex: none;
            width: 100%;
          }

          .slide-images,
          .vision-image,
          .mission-images {
            max-width: 100%;
            flex: none;
            width: 100%;
          }
          
          .vision-image {
            height: 200px;
            margin-top: 20px;
          }

          .mission-images {
            flex-direction: row;
            justify-content: center;
            margin-top: 20px;
          }

          .mission-image {
            width: 150px;
            height: 120px;
          }

          .vision-title,
          .mission-title {
            justify-content: center;
            align-items: center;
          }

          .vision-title h2,
          .mission-title h2 {
            font-size: 2.8rem;
          }

          .vision-description,
          .mission-description {
            text-align: center;
            max-width: 100%;
          }

          .slide-description {
            font-size: 1.1rem;
            text-align: center;
          }

          .slide-title {
            font-size: 2.4rem;
            text-align: center;
          }
        }

        @media (max-width: 768px) {
          .slide {
            width: 90%;
            padding: 30px 25px;
            height: auto;
            min-height: 60vh;
          }

          .slide.slide-0,
          .slide.slide-1,
          .slide.slide-2 {
            padding: 30px 20px;
            justify-content: center;
            text-align: center;
            align-items: center;
          }

          .slide-images,
          .vision-image,
          .mission-images {
            display: none;
          }

          .vision-light-bulb {
            display: none;
          }

          .slide-content,
          .vision-content,
          .mission-content {
            padding-right: 0;
            margin-bottom: 0;
            max-width: 100%;
            width: 100%;
            flex: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
          }

          .vision-title,
          .mission-title {
            flex-direction: column;
            gap: 10px;
            margin-bottom: 20px;
            align-items: center;
            justify-content: center;
            text-align: center;
          }

          .vision-title-icon,
          .mission-title-icon {
            width: 60px;
            height: 60px;
          }

          .vision-description,
          .mission-description {
            text-align: center;
            max-width: 100%;
          }

          .section-title {
            font-weight: 600;
            font-size: 2.6rem;
            top: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
          }

          .slide-title {
            font-size: 2rem;
            text-align: center;
          }

          .vision-title h2,
          .mission-title h2 {
            font-size: 2.2rem;
            text-align: center;
          }

          .slide-description,
          .vision-description,
          .mission-description {
            font-size: 0.95rem;
            text-align: center;
            max-width: 100%;
          }

          .icon {
            width: 100px;
            height: 100px;
          }

          .icon-small {
            width: 60px;
            height: 60px;
          }

          .rocket-corner, .rocket-icon {
            width: 50px;
            height: 50px;
            bottom: 15px;
            left: 15px;
          }

          .icons-container {
            gap: 15px;
          }

          .slide.slide-1.active {
            transform: translateY(calc(5vh + 3vh));
          }

          .slide.slide-2.active {
            transform: translateY(calc(5vh + 6vh));
          }
        }

        @media (max-width: 480px) {
          .slide {
            width: 95%;
            padding: 25px 15px;
            min-height: 55vh;
          }

          .slide.slide-0,
          .slide.slide-1,
          .slide.slide-2 {
            height: auto;
            min-height: 55vh;
            padding: 25px 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
          }

          .slide-content,
          .vision-content,
          .mission-content {
            padding-right: 0;
            margin-bottom: 0;
            max-width: 100%;
            width: 100%;
            flex: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
          }

          .slide-images,
          .vision-image,
          .mission-images {
            display: none;
          }

          .vision-light-bulb {
            display: none;
          }

          .vision-title,
          .mission-title {
            flex-direction: column;
            gap: 8px;
            margin-bottom: 15px;
            align-items: center;
            justify-content: center;
            text-align: center;
          }

          .vision-title-icon,
          .mission-title-icon {
            width: 50px;
            height: 50px;
          }

          .slide-title {
            font-size: 1.6rem;
            margin-bottom: 15px;
            text-align: center;
          }

          .vision-title h2,
          .mission-title h2 {
            font-size: 1.8rem;
            text-align: center;
          }

          .slide-description,
          .vision-description,
          .mission-description {
            font-size: 0.85rem;
            line-height: 1.6;
            text-align: center;
            max-width: 100%;
          }

          .section-title {
            font-size: 2.2rem;
            top: 20px;
          }
        }
      `}</style>

      <div className="scroll-container">
        <div className="slide-container">
          <h1 className="section-title">Know the E-CELL</h1>

          <div className="slide slide-0" data-slide="0">
            <div className="slide-content">
              <h2 className="slide-title">WHO WE ARE?</h2>
              <p className="slide-description">
                We are the Entrepreneurship Cell of IIITDM-Kancheepuram, a student-led initiative that promotes innovation and entrepreneurial thinking on campus. Our team comprises aspiring entrepreneurs, leaders, and changemakers dedicated to creating a thriving startup culture.Through events, mentorship, competitions, and networking opportunities, we serve as a launchpad for ideas that have the potential to create real-world impact.
              </p>
            </div>
            <div className="slide-images">
              <div className="image-row">
                <div className="image-placeholder image-main">
                  <span>Team Collaboration</span>
                </div>
              </div>
              <div className="image-row">
                <div className="image-placeholder image-small">
                  <span>Innovation</span>
                </div>
                <div className="image-placeholder image-small">
                  <span>Leadership</span>
                </div>
              </div>
            </div>
            <div className="rocket-icon">🚀</div>
          </div>

          <div className="slide slide-1" data-slide="1">
            <div className="vision-content">
              <div className="vision-title">
                <div className="vision-title-icon">
                  <svg viewBox="0 0 24 24" stroke="#000" strokeWidth="2" fill="none">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <h2>VISION</h2>
              </div>
              <p className="vision-description">
                To position E-Cell IIITDM-K as a hub of entrepreneurial excellence, empowering students to become visionary leaders, driving breakthrough innovations, and nurturing ventures that create lasting global impact. We aim to foster a vibrant ecosystem that connects talent, technology, and industry to shape the future of innovation.
              </p>
            </div>
            <div className="vision-image">
            </div>
            <div className="vision-light-bulb">
              <div className="bulb-rays">
                <div className="bulb-ray"></div>
                <div className="bulb-ray"></div>
                <div className="bulb-ray"></div>
                <div className="bulb-ray"></div>
                <div className="bulb-ray"></div>
                <div className="bulb-ray"></div>
              </div>
              <div className="bulb-icon"></div>
            </div>
          </div>

          <div className="slide slide-2" data-slide="2">
            <div className="mission-content">
              <div className="mission-title">
                <div className="mission-title-icon">
                  <svg viewBox="0 0 26 26" stroke="#fff" strokeWidth="2" fill="none">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88 16.24,7.76"></polygon>
                  </svg>
                </div>
                <h2>MISSION</h2>
              </div>
              <p className="mission-description">
                To build a strong entrepreneurial ecosystem at IIITDM-K that equips students with the skills, mindset, and resources to create high-impact startups. We aim to develop future leaders and innovators who can solve real-world problems, drive economic growth, and contribute to national and global progress through entrepreneurship.
              </p>
            </div>
            <div className="mission-images">
              <div className="mission-image mission-image-1"></div>
              <div className="mission-image mission-image-2"></div>
            </div>
            <div className="rocket-corner">
              {/* <svg viewBox="0 0 24 24" stroke="#fff" strokeWidth="2" fill="none">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="m16 10-4 4-4-4"></path>
              </svg> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;