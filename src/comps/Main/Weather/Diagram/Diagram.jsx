import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const ChartWrapper = styled.div`
  background-color: #e9e9e9;
  border-radius: 20px;
  padding: 24px 32px;
  width: 100%;
  max-width: 1140px;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
`;

const ChartTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 16px;
  font-weight: 700;
  color: #000000;
  text-align: left;
`;

const ChartContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`;

export const Diagram = ({ hourlyData = [] }) => {
  const displayData = hourlyData.slice(0, 10);

  const labels = displayData.map((hour, index) => {
    const date = new Date(hour.dt * 1000);
    if (index === 1) {
      return date.toLocaleDateString('en-UA', { month: 'short', day: 'numeric' });
    }
    return date.toLocaleTimeString('en-UA', { hour: 'numeric', hour12: true }).toLowerCase();
  });

  const temperatures = displayData.map(hour => Math.round(hour.main.temp));

  const data = {
    labels: labels,
    datasets: [
      {
        data: temperatures,
        borderColor: '#ffa755',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#ffa755',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        callbacks: {
          label: (context) => ` ${context.parsed.y}°C`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: '#cccccc', drawTicks: false },
        ticks: { color: '#333333', font: { size: 11 }, padding: 10 },
        border: { display: false }
      },
      y: {
        grid: { color: '#cccccc' },
        ticks: {
          color: '#333333',
          font: { size: 11 },
          stepSize: 5,
          callback: (value) => `${value}°C`,
          padding: 10,
        },
        border: { display: false }
      },
    },
  };

  return (
    <ChartWrapper>
      <ChartTitle>Hourly forecast</ChartTitle>
      <ChartContainer>
        <Line data={data} options={options} />
      </ChartContainer>
    </ChartWrapper>
  );
};