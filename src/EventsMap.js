import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { format, isThisWeek, isThisMonth, parseISO, isBefore } from 'date-fns';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CATEGORY_OPTIONS = [
  { key: 'arts', label: 'Arts Events' },
  { key: 'music', label: 'Music Events' },
  { key: 'greek', label: 'Greek House Events' },
  { key: 'other', label: 'Other' },
];

const EVENTS = [
  {
    id: 1,
    name: 'Collis Open Mic Night',
    location: 'Collis Center',
    address: '2 N Main St, Hanover, NH 03755',
    position: [43.7044, -72.2887],
    time: '7-9pm EST',
    date: '2025-05-15',
    category: 'other',
    status: 'Open to Campus',
    food: 'Yes',
  },
  {
    id: 2,
    name: 'Jazz Night at Collis',
    location: 'Collis Center',
    address: '2 N Main St, Hanover, NH 03755',
    position: [43.7044, -72.2887],
    time: '8-10pm EST',
    date: '2025-06-01',
    category: 'music',
    status: 'Open to Campus',
    food: 'Yes',
  },
  {
    id: 3,
    name: 'Gallery Opening at Hood Museum',
    location: 'Hood Museum of Art',
    address: '6 E Wheelock St, Hanover, NH 03755',
    position: [43.7026, -72.2848],
    time: '6-8pm EST',
    date: '2025-06-10',
    category: 'arts',
    status: 'Open to Public',
    food: 'No',
  },
  {
    id: 4,
    name: 'Street Soul Dance Party',
    location: 'Sarner Underground',
    address: '13 E Wheelock St, Hanover, NH 03755',
    position: [43.7029, -72.2865],
    time: '9pm-12am EST',
    date: '2025-06-20',
    category: 'greek',
    status: 'Open to Campus',
    food: 'No',
  },
  {
    id: 5,
    name: 'SLATE Poetry Slam',
    location: 'One Wheelock',
    address: '2 N Main St, Hanover, NH 03755',
    position: [43.7044, -72.2887],
    time: '7-9pm EST',
    date: '2025-06-25',
    category: 'arts',
    status: 'Open to Campus',
    food: 'Yes',
  },
  {
    id: 6,
    name: 'Friday Night Rock: Frog and Robber Robber',
    location: 'Collis Center',
    address: '2 N Main St, Hanover, NH 03755',
    position: [43.7044, -72.2887],
    time: '9:30pm-12am EST',
    date: '2025-07-01',
    category: 'music',
    status: 'Open to Campus',
    food: 'No',
  },
  {
    id: 7,
    name: 'Phrozen Ivy Ball',
    location: 'Alpha Phi Alpha House',
    address: '17 Webster Ave, Hanover, NH 03755',
    position: [43.7048, -72.2882],
    time: '9pm-1am EST',
    date: '2025-05-30',
    category: 'greek',
    status: 'Open to Campus',
    food: 'Yes',
  },
  {
    id: 8,
    name: 'Bazodee Movie + The Karibbean @ BVAC',
    location: 'Black Visual Arts Center (BVAC)',
    address: '22 Lebanon St, Hanover, NH 03755',
    position: [43.7022, -72.2845],
    time: '7-10pm EST',
    date: '2025-06-05',
    category: 'arts',
    status: 'Open to Campus',
    food: 'Yes',
  },
  {
    id: 9,
    name: 'LIVE HOLOGRAM CONCERT - Ft. UJIMA in Vicarious!',
    location: 'Collis Common Ground',
    address: '2 N Main St, Hanover, NH 03755',
    position: [43.7044, -72.2887],
    time: '7:30-9:30pm EST',
    date: '2025-06-15',
    category: 'music',
    status: 'Open to Campus',
    food: 'No',
  },
  {
    id: 10,
    name: 'Caribbean Carnival 2025: Unveilin\' Di Mas!',
    location: 'Dartmouth Green',
    address: '1 Dartmouth College, Hanover, NH 03755',
    position: [43.7056, -72.2882],
    time: '2-5pm EST',
    date: '2025-07-10',
    category: 'other',
    status: 'Open to Public',
    food: 'Yes',
  },
  {
    id: 11,
    name: 'Montpelier Contra Dance',
    location: 'Alumni Hall',
    address: '6016 McNutt Hall, Hanover, NH 03755',
    position: [43.7052, -72.2895],
    time: '7-10pm EST',
    date: '2025-07-15',
    category: 'music',
    status: 'Open to Campus',
    food: 'No',
  },
  {
    id: 12,
    name: 'Radcliffe May Events: Honoring Jodie Foster',
    location: 'Hood Museum of Art',
    address: '6 E Wheelock St, Hanover, NH 03755',
    position: [43.7026, -72.2848],
    time: '5-7pm EST',
    date: '2025-07-20',
    category: 'arts',
    status: 'Open to Public',
    food: 'No',
  },
];

const blueIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const DATE_FILTERS = [
  { key: 'all', label: 'All Dates' },
  { key: 'week', label: 'This Week' },
  { key: 'month', label: 'This Month' },
];

const EventsMap = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(CATEGORY_OPTIONS.map(c => c.key));
  const [dateFilter, setDateFilter] = useState('all');
  const filterBtnRef = useRef();

  const toggleFilterPanel = () => {
    if (filterBtnRef.current) {
      filterBtnRef.current.classList.add('pulse-animate');
      setTimeout(() => filterBtnRef.current.classList.remove('pulse-animate'), 400);
    }
    setShowFilters(f => !f);
  };

  const toggleFilter = (key) => {
    setFilters(filters.includes(key)
      ? filters.filter(f => f !== key)
      : [...filters, key]
    );
  };

  // Date filtering logic
  const filterByDate = (event) => {
    const eventDate = parseISO(event.date);
    if (dateFilter === 'all') return true;
    if (dateFilter === 'week') return isThisWeek(eventDate, { weekStartsOn: 1 });
    if (dateFilter === 'month') return isThisMonth(eventDate);
    return true;
  };

  // Split events into upcoming and past
  const now = new Date();
  const upcomingEvents = EVENTS.filter(e => !isBefore(parseISO(e.date), now));
  const pastEvents = EVENTS.filter(e => isBefore(parseISO(e.date), now));

  // Find a featured event (first upcoming)
  const featured = upcomingEvents[0];

  return (
    <div className="EventsMap">
      <button
        ref={filterBtnRef}
        className="EventsMap-filterBtn"
        onClick={toggleFilterPanel}
      >
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>
      {showFilters && (
        <div className="EventsMap-filterOverlay">
          <div className="EventsMap-filterCard">
            <div className="EventsMap-filterGroup">
              <div className="EventsMap-filterTitle">Category</div>
              <div className="EventsMap-filterOptions">
                {CATEGORY_OPTIONS.map(option => (
                  <label key={option.key} className="EventsMap-filterOption">
                    <input
                      type="checkbox"
                      checked={filters.includes(option.key)}
                      onChange={() => toggleFilter(option.key)}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
            <div className="EventsMap-filterGroup">
              <div className="EventsMap-filterTitle">Date</div>
              <select
                className="EventsMap-dateSelect"
                value={dateFilter}
                onChange={e => setDateFilter(e.target.value)}
              >
                {DATE_FILTERS.map(df => (
                  <option key={df.key} value={df.key}>{df.label}</option>
                ))}
              </select>
            </div>
            <button className="EventsMap-closeOverlay" onClick={toggleFilterPanel}>Close</button>
          </div>
        </div>
      )}
      {featured && (
        <div className="EventsMap-featured animate-fadein">
          <div className="EventsMap-featuredTitle">Featured Event</div>
          <div className="EventsMap-featuredName">{featured.name}</div>
          <div className="EventsMap-featuredDate">{format(parseISO(featured.date), 'MMM d, yyyy')}</div>
        </div>
      )}
      <div className="EventsMap-sectionTitle">Upcoming Events</div>
      <div className="EventsMap-mapWrap">
        <MapContainer center={[43.7044, -72.2887]} zoom={15} style={{ height: '400px', width: '100%', borderRadius: '16px', marginTop: '1rem' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          {upcomingEvents.filter(e => filters.includes(e.category) && filterByDate(e)).map(event => (
            <Marker key={event.id} position={event.position} icon={blueIcon}>
              <Popup>
                <strong>{event.name}</strong><br/>
                <span>{event.location}</span><br/>
                <span>{event.address}</span><br/>
                <span>Time: {event.time}</span><br/>
                <span>Date: {format(parseISO(event.date), 'MMM d, yyyy')}</span><br/>
                <span>Status: {event.status}</span><br/>
                <span>Food Provided: {event.food}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {pastEvents.length > 0 && (
        <>
          <div className="EventsMap-sectionTitle" style={{marginTop: '2rem'}}>Past Events</div>
          <ul className="EventsMap-pastList">
            {pastEvents.map(event => (
              <li key={event.id}>
                <strong>{event.name}</strong> — {format(parseISO(event.date), 'MMM d, yyyy')}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default EventsMap; 