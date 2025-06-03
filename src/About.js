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

const features = [
  {
    title: 'Event Discovery',
    description: 'Find events tailored to your interests and preferences',
    icon: '🎯',
  },
  {
    title: 'Interactive Map',
    description: 'Visualize events across campus with our interactive map',
    icon: '🗺️',
  },
  {
    title: 'Real-time Updates',
    description: 'Stay informed with live event updates and notifications',
    icon: '⚡',
  },
  {
    title: 'Social Integration',
    description: 'Connect with friends and share events seamlessly',
    icon: '🤝',
  },
];

const stats = [
  { value: '100+', label: 'Active Users', icon: '👥' },
  { value: '30+', label: 'Events Listed', icon: '📅' },
  { value: '3', label: 'Campus Locations', icon: '📍' },
  { value: '24/7', label: 'Support Available', icon: '🛟' },
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

        <section className="About-section About-section--features animate-fadein">
          <h2 className="About-section-title">Our Features</h2>
          <div className="About-features">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="About-feature-card animate-slideup"
                style={{ animationDelay: `${0.2 + index * 0.15}s` }}
              >
                <div className="About-feature-icon">{feature.icon}</div>
                <h3 className="About-feature-title">{feature.title}</h3>
                <p className="About-feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="About-section About-section--stats animate-fadein">
          <h2 className="About-section-title">By The Numbers</h2>
          <div className="About-stats">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="About-stat-card animate-slideup"
                style={{ animationDelay: `${0.3 + index * 0.15}s` }}
              >
                <div className="About-stat-icon">{stat.icon}</div>
                <div className="About-stat-value">{stat.value}</div>
                <div className="About-stat-label">{stat.label}</div>
              </div>
            ))}
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