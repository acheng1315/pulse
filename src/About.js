import React, { useRef, useEffect, useState } from 'react';
import './About.css';

const founders = [
  {
    name: 'Sawyer',
    role: 'CEO',
    responsibilities: 'BMC, Value Proposition, Mission/About/Etc., Public Speaking',
    img: process.env.PUBLIC_URL + '/founder1.png',
  },
  {
    name: 'Shawn',
    role: 'CFO',
    responsibilities: 'Budget, Marketing, Sales, Public Speaking',
    img: process.env.PUBLIC_URL + '/founder2.png',
  },
  {
    name: 'Andrew',
    role: 'CTO',
    responsibilities: 'MVP, Web Presence, Public Speaking',
    img: process.env.PUBLIC_URL + '/founder3.png',
  },
];

const About = () => {
  const descRef = useRef();
  const foundersRef = useRef();
  const [descFade, setDescFade] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!descRef.current || !foundersRef.current) return;
      const descBottom = descRef.current.getBoundingClientRect().bottom;
      const fade = descBottom < 120; // fade when scrolled past
      setDescFade(fade);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="About">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="About-background-video"
        preload="auto"
        quality="high"
        style={{ imageRendering: 'high-quality' }}
      >
        <source src={process.env.PUBLIC_URL + '/background.mp4'} type="video/mp4" />
      </video>
      <div className="About-content">
        <section
          className={`About-section About-section--desc animate-fadein${descFade ? ' About-section--fade' : ''}`}
          ref={descRef}
        >
          <h1 className="About-title">PulseApp Campus, LLC</h1>
          <div className="About-description-card">
            <p className="About-description">
              PulseApp Campus is a campus-centered event discovery platform that connects students on campus to the vibrant world of live arts, music, and cultural events around them, mapping these events. Students can select events based on their interests and activity history, PulseApp Campus makes finding (and attending) great artistic experiences easy, spontaneous, and social.
            </p>
          </div>
        </section>
        <section
          className="About-section About-section--founders animate-fadein"
          ref={foundersRef}
        >
          <h2 className="About-founders-title About-founders-title-large">Meet the Founders</h2>
          <div className="About-founders">
            {founders.map((f, i) => (
              <div className="About-founder-card animate-slideup" style={{ animationDelay: `${0.2 + i * 0.15}s` }} key={f.name}>
                <img src={f.img} alt={f.name + ' portrait'} className="About-founder-img" />
                <div className="About-founder-name">{f.name}</div>
                <div className="About-founder-role">{f.role}</div>
                <div className="About-founder-resp">{f.responsibilities}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 