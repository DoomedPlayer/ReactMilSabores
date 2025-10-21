import React from 'react';

const MetricCard = ({ icon, title, value, description, className }) => {
  return (
    <div className={`metric-card ${className}`}>
      <div className="icon">{icon}</div>
      <div className="title">{title}</div>
      <div className="value">{value}</div>
      <div className="description">{description}</div>
    </div>
  );
};

export default MetricCard;