import React from 'react';

const DashboardCard = ({ icon, title, description }) => {
  return (
    <div className="dashboard-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default DashboardCard;