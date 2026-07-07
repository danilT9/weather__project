import { useState, useEffect } from "react";
import { getForecastFromApi } from "../../../api/weather/weather";
import { Your } from "./Your/Your";
import { Info } from "./Info/Info";
import { Diagram } from "./Diagram/Diagram";
import { WeekInfo } from "./WeekInfo/WeekInfo";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  gap: 70px;
`;

const EmptyContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-top: 40px;
`;

export const Weather = ({ coords }) => {
  const [cities, setCities] = useState(() => {
    const saved = localStorage.getItem("weather_cities");
    return saved ? JSON.parse(saved) : [];
  });

  const [citiesWeatherData, setCitiesWeatherData] = useState({});
  const [activeCityId, setActiveCityId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("hourly");

  useEffect(() => {
    localStorage.setItem("weather_cities", JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    if (coords && coords.lat && coords.lon) {
      const addNewCity = async () => {
        const cityId = `${coords.lat}-${coords.lon}`;
        if (cities.some(c => c.id === cityId)) {
          setActiveCityId(cityId);
          return;
        }

        try {
          const res = await getForecastFromApi(coords);
          const cityName = res.city?.name || "Unknown City";
          const cityCountry = res.city?.country || "";

          const newCity = {
            id: cityId,
            name: cityName,
            country: cityCountry,
            lat: coords.lat,
            lon: coords.lon,
            isFavorite: false
          };

          setCities(prev => [...prev, newCity]);
          setCitiesWeatherData(prev => ({ ...prev, [cityId]: res }));
          setActiveCityId(cityId);
        } catch (e) {
          console.error(e);
        }
      };

      addNewCity();
    }
  }, [coords, cities]);

  useEffect(() => {
    const fetchAllCitiesWeather = async () => {
      if (cities.length === 0) return;
      setLoading(true);
      const updatedData = {};
      for (const city of cities) {
        try {
          const res = await getForecastFromApi({ lat: city.lat, lon: city.lon });
          updatedData[city.id] = res;
        } catch (e) {
          console.error(e);
        }
      }
      setCitiesWeatherData(updatedData);
      
      if (cities.length > 0) {
        setActiveCityId(prev => {
          if (prev && cities.some(c => c.id === prev)) return prev;
          return cities[0].id;
        });
      }
      setLoading(false);
    };

    fetchAllCitiesWeather();
  }, [cities, activeCityId]);

  const handleRefreshCity = async (id, cityCoords) => {
    try {
      const res = await getForecastFromApi(cityCoords);
      setCitiesWeatherData(prev => ({ ...prev, [id]: res }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteCity = (id) => {
    const filtered = cities.filter(c => c.id !== id);
    setCities(filtered);
    if (activeCityId === id) {
      setActiveCityId(filtered.length > 0 ? filtered[0].id : null);
    }
  };

  const handleToggleFavorite = (id) => {
    setCities(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, isFavorite: !c.isFavorite } : c);
      localStorage.setItem("weather_cities", JSON.stringify(updated));
      return updated;
    });
  };

  const activeWeatherData = citiesWeatherData[activeCityId];

  return (
    <Container>
      {cities.length === 0 ? (
        <EmptyContainer>Please search for a location to display the weather dashboard.</EmptyContainer>
      ) : loading && Object.keys(citiesWeatherData).length === 0 ? (
        <p>Loading weather dashboard...</p>
      ) : (
        <>
          <Your 
            cities={cities} 
            citiesWeatherData={citiesWeatherData} 
            activeCityId={activeCityId}
            onSelectCity={setActiveCityId}
            onRefreshCity={handleRefreshCity}
            onDeleteCity={handleDeleteCity}
            onToggleFavorite={handleToggleFavorite}
            setViewMode={setViewMode}
          />
          
          {activeWeatherData && (
            <>
              <Info currentPeriod={activeWeatherData?.list?.[0]} />
              {(viewMode === "all" || viewMode === "hourly") && <Diagram hourlyData={activeWeatherData?.list || []} />}
              {(viewMode === "all" || viewMode === "weekly") && <WeekInfo hourlyData={activeWeatherData?.list || []} />}
            </>
          )}
        </>
      )}
    </Container>
  );
};