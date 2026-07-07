import { styled } from "styled-components";
import { getWeatherIcon } from "../WIcon"; 
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { LuRefreshCw } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

const WeatherList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
  list-style: none;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  width: 100%;
  z-index: 1;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  * {
    padding: 0;
    margin: 0;
  }
  button {
    cursor: pointer;
  }
  @media (max-width: 480px) {
    gap: 20px;
    padding: 0 10px;
  }
`;

const WeatherListItemStyled = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${props => props.$isActive ? "rgb(255, 255, 255)" : "rgb(225, 225, 225)"};
  border: ${props => props.$isActive ? "2px solid #FFB36C" : "2px solid transparent"};
  padding: 15px;
  width: 320px;
  height: 430px;
  flex-direction: column;
  box-sizing: border-box;
  transition: all 0.2s ease;
  cursor: pointer;

  @media (max-width: 360px) {
    width: 100%;
    height: auto;
    min-height: 400px;
  }
`;

const WeatherListItemContainer = styled.div`
  padding: 5px 15px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  
  .weather-icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffa755;
    margin: 10px 0;
  }
`;

const WeatherListItemContainerLocation = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const WeatherListItemContainerTime = styled.p`
  font-size: 28px;
  margin: 5px 0;
`;

const WeatherListItemContainerForecastContainer = styled.div`
  display: flex;
  gap: 25px;
  button {
    padding: 8px 18px;
    border: none;
    background-color: #FFB36C;
    border-radius: 10px;
    font-size: 10px;
    transition: background 0.2s;
    &:hover { background-color: #ffa043; }
  }
  @media (max-width: 360px) {
    gap: 10px;
    button {
      padding: 8px 10px;
    }
  }
`;

const WeatherListItemContainerTimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 500;
`;

const WeatherListItemContainerTemperature = styled.p`
  font-size: 32px;
  margin: 10px auto;
`;

const WeatherListItemContainerButtonsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .left-actions, .right-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .icon-btn {
    background: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    color: #444;
    transition: color 0.2s;
    &:hover { color: #000; }
  }
  
  .fav-btn {
    color: ${props => props.$isFav ? "#ff4d4d" : "#444"};
    &:hover { color: #ff1a1a; }
  }

  .see-more-btn {
    margin-right: 5px;
    padding: 8px 25px;
    border: none;
    background-color: #FFB36C;
    border-radius: 10px;
    font-size: 10px;
    font-weight: 600;
    &:hover { background-color: #ffa043; }
  }
`;

const WeatherListItem = ({ city, weatherData, isActive, onSelect, onRefresh, onDelete, onToggleFavorite, setViewMode }) => {
  if (!weatherData) return <WeatherListItemStyled>Loading data...</WeatherListItemStyled>;
  const currentPeriod = weatherData.list?.[0];
  const temp = currentPeriod ? Math.round(currentPeriod.main.temp) : "--";
  const iconCode = currentPeriod ? currentPeriod.weather[0].icon : "01d";
  const timezoneOffset = weatherData.city?.timezone || 0; 
  const localDate = new Date(new Date().getTime() + (timezoneOffset * 1000) + (new Date().getTimezoneOffset() * 60000));
  const timeStr = localDate.toLocaleTimeString("en-UA", { hour: "2-digit", minute: "2-digit", hour12: false });
  const dateStr = localDate.toLocaleDateString("en-UA", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, ".");
  const dayName = localDate.toLocaleDateString("en-UA", { weekday: "long" });

  return (
    <WeatherListItemStyled $isActive={isActive} onClick={() => { onSelect(city.id); setViewMode("all"); }}>
      <WeatherListItemContainer>
        <WeatherListItemContainerLocation>
          <p style={{ fontWeight: '600' }}>{city.name}</p>
          <p style={{ color: '#555' }}>{city.country}</p>
        </WeatherListItemContainerLocation>
        
        <WeatherListItemContainerTime>{timeStr}</WeatherListItemContainerTime>
        
        <WeatherListItemContainerForecastContainer>
          <button onClick={(e) => { e.stopPropagation(); onSelect(city.id); setViewMode("hourly"); }}>Hourly forecast</button>
          <button onClick={(e) => { e.stopPropagation(); onSelect(city.id); setViewMode("weekly"); }}>Weekly forecast</button>
        </WeatherListItemContainerForecastContainer>
        
        <WeatherListItemContainerTimeContainer>
          <p>{dateStr}</p>
          <span>|</span>
          <p>{dayName}</p>
        </WeatherListItemContainerTimeContainer>
        
        <div className="weather-icon-wrapper">
          {getWeatherIcon(iconCode, 110)}
        </div>

        <WeatherListItemContainerTemperature>{temp}℃</WeatherListItemContainerTemperature>
        
        <WeatherListItemContainerButtonsStyled $isFav={city.isFavorite}>
          <div className="left-actions">
            <button className="icon-btn" onClick={(e) => { e.stopPropagation(); onRefresh(city.id, { lat: city.lat, lon: city.lon }); }}>
              <LuRefreshCw size={20} />
            </button>
            <button className="icon-btn fav-btn" onClick={(e) => { e.stopPropagation(); onToggleFavorite(city.id); }}>
              {city.isFavorite ? <IoMdHeart size={22} /> : <IoMdHeartEmpty size={22} />}
            </button>
          </div>
          <div className="right-actions">
            <button className="see-more-btn" onClick={(e) => { e.stopPropagation(); onSelect(city.id); setViewMode("all"); }}>See more</button>
            <button className="icon-btn" onClick={(e) => { e.stopPropagation(); onDelete(city.id); }}>
              <RiDeleteBin6Line size={20} />
            </button>
          </div>
        </WeatherListItemContainerButtonsStyled>
      </WeatherListItemContainer>
    </WeatherListItemStyled>
  );
};

export const Your = ({ cities, citiesWeatherData, activeCityId, onSelectCity, onRefreshCity, onDeleteCity, onToggleFavorite, setViewMode }) => {
  return (
    <div>
      <WeatherList>
        {cities.map((city) => (
          <WeatherListItem 
            key={city.id}
            city={city}
            weatherData={citiesWeatherData[city.id]}
            isActive={city.id === activeCityId}
            onSelect={onSelectCity}
            onRefresh={onRefreshCity}
            onDelete={onDeleteCity}
            onToggleFavorite={onToggleFavorite}
            setViewMode={setViewMode}
          />
        ))}
      </WeatherList>
    </div>
  );
};