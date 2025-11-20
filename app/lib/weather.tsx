export type WeatherResult = {
  description: string;
  temperature: string;
  humidity: number;
  wind_speed: number;
};
export default async function Weather(cityName:string, countryCode:string): Promise<WeatherResult> {
  
  const Limit = 1;
  const geoRes = await fetch (
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&limit=${Limit}&appid=${process.env.OPENWEATHER_API_KEY}`
);
  if (!geoRes.ok) {
    const text = await geoRes.text();
    throw new Error(`Geo API error: ${geoRes.status} ${text}`);
  }
  const cords_data = await geoRes.json();
  const lat = cords_data[0].lat;
  const lon = cords_data[0].lon;
  
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Weather API error: ${res.status} ${text}`);
  }
  
  const data = await res.json();
  return {
    description: data.weather[0].description,
    temperature: (data.main.temp - 273.15).toFixed(2),
    humidity: data.main.humidity,
    wind_speed: data.wind.wind_speed,
  }

  
}