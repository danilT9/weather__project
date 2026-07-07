const API_KEY = '83dbe458897e9bdaec78c2be8d37aec5';

export const getCitySuggestions = async (searchQuery) => {
  if (!searchQuery || searchQuery.trim().length < 2) return [];
  const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchQuery)}&limit=5&appid=${API_KEY}`);
  return await response.json();
};

export const getForecastFromApi = async ({ lat, lon }) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
  return response.json();
};