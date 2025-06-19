import React from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title, PointElement, LineElement } from 'chart.js';
import './ChartDisplay.css'; // Import chart display specific CSS

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  PointElement,
  LineElement
);

const ChartDisplay = ({ type, data, options }) => {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <Bar data={data} options={options} />;
      case 'doughnut':
        return <Doughnut data={data} options={options} />;
      case 'line':
        return <Line data={data} options={options} />;
      default:
        return <p>Unsupported chart type</p>;
    }
  };

  return (
    <div className="chart-container">
      {renderChart()}
    </div>
  );
};

export default ChartDisplay;