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

const DEFAULT_CITIES = [
  { id: "50.4501-30.5234", name: "Kyiv", country: "UA", lat: 50.4501, lon: 30.5234, isFavorite: false },
  { id: "55.6761-12.5683", name: "Copenhagen", country: "DK", lat: 55.6761, lon: 12.5683, isFavorite: false },
  { id: "52.5200-13.4050", name: "Berlin", country: "DE", lat: 52.5200, lon: 13.4050, isFavorite: false }
];

export const Weather = ({ coords }) => {
  const [cities, setCities] = useState(() => {
    const saved = localStorage.getItem("weather_cities");
    if (saved) {
      const parsed = JSON.parse(saved);
      const hasFavorites = parsed.some(c => c.isFavorite);
      if (hasFavorites) {
        return parsed;
      }
    }
    return DEFAULT_CITIES;
  });

  const [citiesWeatherData, setCitiesWeatherData] = useState({});
  const [activeCityId, setActiveCityId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("none");

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

          const hasFavorites = cities.some(c => c.isFavorite);
          let updatedCities = [];
          
          if (!hasFavorites && cities.length === 3 && cities.some(c => c.name === "Kyiv") && cities.some(c => c.name === "Copenhagen")) {
            updatedCities = [...cities, newCity];
          } else {
            updatedCities = [...cities, newCity];
          }

          setCities(updatedCities);
          setCitiesWeatherData(prev => ({ ...prev, [cityId]: res }));
          setActiveCityId(cityId);
        } catch (e) {
          console.error(e);
        }
      };

      addNewCity();
    }
  }, [coords]);

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
  }, [cities]);

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
    const hasFavorites = filtered.some(c => c.isFavorite);
    
    if (filtered.length === 0 && !hasFavorites) {
      setCities(DEFAULT_CITIES);
      setActiveCityId(DEFAULT_CITIES[0].id);
    } else {
      setCities(filtered);
      if (activeCityId === id) {
        setActiveCityId(filtered.length > 0 ? filtered[0].id : null);
      }
    }
  };

  const handleToggleFavorite = (id) => {
    setCities(prev => {
      const targetCity = prev.find(c => c.id === id);
      if (!targetCity) return prev;

      const willBeFavorite = !targetCity.isFavorite;
      let updated = prev.map(c => c.id === id ? { ...c, isFavorite: willBeFavorite } : c);

      const wasShowingDefaults = prev.length >= 3 && prev.some(c => c.name === "Kyiv") && prev.some(c => c.name === "Copenhagen") && !prev.some(c => c.isFavorite);

      if (wasShowingDefaults && willBeFavorite) {
        updated = updated.filter(c => c.isFavorite);
      }

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
          {activeWeatherData && viewMode !== "none" && (
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