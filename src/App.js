import React, { useState } from 'react';
import './App.css';
import About from './About';
import EventsMap from './EventsMap';
import AddEvent from './AddEvent';

const TABS = [
  { label: 'About PulseApp Campus', key: 'about' },
  { label: 'Events Map', key: 'map' },
  { label: 'Add an Event', key: 'add' },
];

function App() {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="App">
      <nav className="App-nav">
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="PulseApp Campus logo" className="About-logo" />
        <div className="App-nav-tabs">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`App-tab${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
      <main className="App-content">
        {activeTab === 'about' && <About />}
        {activeTab === 'map' && <EventsMap />}
        {activeTab === 'add' && <AddEvent />}
      </main>
    </div>
  );
}

export default App;
