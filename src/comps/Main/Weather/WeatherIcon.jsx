import { WiDaySunny, WiNightClear, WiDayCloudy, WiNightAltCloudy, WiCloud, WiCloudy, WiRain, WiDayRain, WiNightRain, WiThunderstorm, WiSnow, WiFog } from 'react-icons/wi';

export const getWeatherIcon = (iconCode, size = 24, color = "inherit") => {
  const props = { size, color };
  switch (iconCode) {
    case '01d': return <WiDaySunny {...props} />;
    case '01n': return <WiNightClear {...props} />;
    case '02d': return <WiDayCloudy {...props} />;
    case '02n': return <WiNightAltCloudy {...props} />;
    case '03d': case '03n': return <WiCloud {...props} />;
    case '04d': case '04n': return <WiCloudy {...props} />;
    case '09d': case '09n': return <WiRain {...props} />;
    case '10d': return <WiDayRain {...props} />;
    case '10n': return <WiNightRain {...props} />;
    case '11d': case '11n': return <WiThunderstorm {...props} />;
    case '12d': case '12n': return <WiSnow {...props} />;
    case '50d': case '50n': return <WiFog {...props} />;
    default: return <WiDaySunny {...props} />;
  }
};