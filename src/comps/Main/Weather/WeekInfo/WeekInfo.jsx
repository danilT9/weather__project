import React from 'react';
import styled from 'styled-components';
import { getWeatherIcon } from '../WIcon';

const Container = styled.div`
  background-color: #e9e9e9;
  border-radius: 20px;
  padding: 24px 32px;
  width: 100%;
  max-width: 1140px;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  @media (max-width: 480px) {
    padding: 15px;
  }
  @media (max-width: 320px) {
    padding: 10px;
  }
`;

const Title = styled.h3`
  margin: 0 0 20px 0;
  font-size: 16px;
  font-weight: 700;
  color: #000000;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DayRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #dcdcdc;
  border-radius: 12px;
  padding: 14px 24px;
  @media (max-width: 480px) {
    padding: 10px;
    flex-wrap: wrap;
  }
  @media (max-width: 320px) {
    padding: 8px;
  }
`;

const DayName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  width: 120px;
  @media (max-width: 480px) {
    width: 100%;
    margin-bottom: 5px;
  }
`;

const WeatherInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: center;
  flex: 1;
  .icon-box {
    color: #ffa755;
    display: flex;
    align-items: center;
  }
  @media (max-width: 480px) {
    justify-content: flex-start;
  }
`;

const TempText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #111;
`;

const Description = styled.span`
  font-size: 14px;
  color: #555;
  text-align: right;
  width: 150px;
  text-transform: lowercase;
  @media (max-width: 480px) {
    text-align: left;
    width: auto;
  }
`;

export const WeekInfo = ({ hourlyData = [] }) => {
  const dailyMap = {};
  hourlyData.forEach((item) => {
    const dateStr = new Date(item.dt * 1000).toLocaleDateString('en-UA', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    if (!dailyMap[dateStr]) {
      dailyMap[dateStr] = {
        temps: [],
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      };
    }
    dailyMap[dateStr].temps.push(item.main.temp);
  });

  let finalDays = Object.keys(dailyMap).map((day) => {
    const temps = dailyMap[day].temps;
    return {
      day,
      maxTemp: Math.round(Math.max(...temps)),
      minTemp: Math.round(Math.min(...temps)),
      icon: dailyMap[day].icon,
      description: dailyMap[day].description,
    };
  });

  return (
    <Container>
      <Title>Forecast</Title>
      <List>
        {finalDays.map((item, idx) => (
          <DayRow key={idx}>
            <DayName>{item.day}</DayName>
            <WeatherInfo>
              <div className="icon-box">
                {getWeatherIcon(item.icon, 35)}
              </div>
              <TempText>{`${item.maxTemp}/${item.minTemp}°C`}</TempText>
            </WeatherInfo>
            <Description>{item.description}</Description>
          </DayRow>
        ))}
      </List>
    </Container>
  );
};