import React, { useState } from 'react';
import './LeaveReview.css';

const LeaveReview = () => {
  const [form, setForm] = useState({ name: '', review: '', link: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="LeaveReview">
      <h2>Leave a Review</h2>
      {submitted ? (
        <div className="LeaveReview-thankyou">Thank you for your feedback!</div>
      ) : (
        <form onSubmit={handleSubmit} className="LeaveReview-form">
          <input
            type="text"
            name="name"
            placeholder="Your name (optional)"
            value={form.name}
            onChange={handleChange}
          />
          <textarea
            name="review"
            placeholder="Your review..."
            value={form.review}
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="link"
            placeholder="Link to a post or event (optional)"
            value={form.link}
            onChange={handleChange}
          />
          <button type="submit" className="LeaveReview-submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default LeaveReview; 