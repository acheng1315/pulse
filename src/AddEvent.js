import React, { useState } from 'react';
import './LeaveReview.css';

const CATEGORIES = [
  { value: 'arts', label: 'Arts' },
  { value: 'music', label: 'Music' },
  { value: 'greek', label: 'Greek House' },
  { value: 'other', label: 'Other' },
];

const AddEvent = () => {
  const [form, setForm] = useState({
    name: '',
    location: '',
    address: '',
    date: '',
    time: '',
    category: 'arts',
    status: '',
    food: '',
    link: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the event to your backend or Google Sheet
  };

  return (
    <div className="LeaveReview">
      <h2>Add an Event</h2>
      {submitted ? (
        <div className="LeaveReview-thankyou">Thank you for submitting your event!</div>
      ) : (
        <form onSubmit={handleSubmit} className="LeaveReview-form">
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location (e.g., Collis Center)"
            value={form.location}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address (e.g., 2 N Main St, Hanover, NH 03755)"
            value={form.address}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="time"
            placeholder="Time (e.g., 7-9pm EST)"
            value={form.time}
            onChange={handleChange}
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            {CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
          <input
            type="text"
            name="status"
            placeholder="Status (e.g., Open to Campus)"
            value={form.status}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="food"
            placeholder="Food Provided (Yes/No)"
            value={form.food}
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="link"
            placeholder="Link to event (optional)"
            value={form.link}
            onChange={handleChange}
          />
          <button type="submit" className="LeaveReview-submit">Add Event</button>
        </form>
      )}
    </div>
  );
};

export default AddEvent; 