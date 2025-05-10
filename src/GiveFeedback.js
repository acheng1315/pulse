import React from 'react';
import './LeaveReview.css';

const GiveFeedback = () => (
  <div className="LeaveReview">
    <h2>Give Feedback!</h2>
    <iframe
      title="Pulse App Feedback"
      src="https://forms.gle/2fXdko8qNc98j8tD9"
      width="100%"
      height="700"
      style={{ border: 'none', borderRadius: '12px', background: '#fff', boxShadow: '0 2px 16px rgba(108,160,246,0.10)' }}
      allowFullScreen
    ></iframe>
  </div>
);

export default GiveFeedback; 