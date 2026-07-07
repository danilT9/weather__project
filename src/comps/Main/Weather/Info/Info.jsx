import { styled } from "styled-components";
import { WiThermometer, WiHumidity, WiBarometer, WiStrongWind } from "react-icons/wi";
import { MdOutlineVisibility } from "react-icons/md";

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 1140px;
  padding: 40px 0;
  font-family: 'Montserrat', sans-serif;
  background-color: #E8E8E8;
  border-radius: 20px;
`;

const InfoList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 50px;
  padding: 0;
`;

const InfoItemStyled = styled.li`
  width: 290px;
  height: 217px;
  background-color: #D9D9D9;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  gap: 12px;
  
  * {
    margin: 0;
    padding: 0;
  }
  p:first-child {
    font-size: 16px;
    font-weight: 500;
    color: #444;
  }
  p:nth-child(2) {
    font-size: 28px;
    font-weight: 600;
    color: #000;
  }
  .info-icon {
    color: #ffa755;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const InfoItem = ({ title, content, icon }) => {
  return (
    <InfoItemStyled>
      <p>{title}</p>
      <p>{content}</p>
      <div className="info-icon">{icon}</div>
    </InfoItemStyled>
  );
};

export const Info = ({ currentPeriod }) => {
  if (!currentPeriod) return null;

  const feelsLike = `${Math.round(currentPeriod.main.feels_like)}℃`;
  const tempRange = `${Math.round(currentPeriod.main.temp_min)}℃ / ${Math.round(currentPeriod.main.temp_max)}℃`;
  const humidity = `${currentPeriod.main.humidity}%`;
  const pressure = `${currentPeriod.main.pressure} hPa`;
  const windSpeed = `${currentPeriod.wind.speed} m/s`;
  const visibility = `${(currentPeriod.visibility / 1000).toFixed(1)} km`;

  return (
    <InfoContainer>
      <InfoList>
        <InfoItem
          title="Feels like"
          content={feelsLike}
          icon={<WiThermometer size={65} />}
        />
        <InfoItem
          title="Temperature Range"
          content={tempRange}
          icon={<WiThermometer size={65} />}
        />
        <InfoItem
          title="Humidity"
          content={humidity}
          icon={<WiHumidity size={65} />}
        />
        <InfoItem
          title="Pressure"
          content={pressure}
          icon={<WiBarometer size={65} />}
        />
        <InfoItem
          title="Wind speed"
          content={windSpeed}
          icon={<WiStrongWind size={65} />}
        />
        <InfoItem
          title="Visibility"
          content={visibility}
          icon={<MdOutlineVisibility size={55} />}
        />
      </InfoList>
    </InfoContainer>
  );
};