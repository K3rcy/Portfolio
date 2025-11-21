'use server'
export type WeatherResult = {
  icon_id: string;
  weather: string;
  description: string;
  temperature: string;
  humidity: number;
  wind_speed: number;
  sunset: number;
  sunrise: number;
};
export type CordsData = {
  lat: number;
  lon: number;
  name: string;
  country: string;
  state: string;
}
export type CordsDataTable = CordsData[];

export async function ChooseCity(cityName:string, stateName:string, countryCode:string): Promise<CordsDataTable>{
  const Limit = 5;
  const geoRes = await fetch (
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateName},${countryCode}&limit=${Limit}&appid=${process.env.OPENWEATHER_API_KEY}`
  );
  
  if (!geoRes.ok) {
    const text = await geoRes.text();
    throw new Error(`Geo API error: ${geoRes.status} ${text}`);
  }
  const cords_data = await geoRes.json();
  const CordsData: CordsDataTable = cords_data.map((item: CordsData) => ({
    lat: item.lat,
    lon: item.lon,
    name: item.name,
    country: item.country,
    state: item.state ?? "",
  }));
  return CordsData;
}

export async function Weather(lat:number, lon:number): Promise<WeatherResult> {
  
  
  
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Weather API error: ${res.status} ${text}`);
  }
  
  const data = await res.json();
  return {
    icon_id: data.weather[0].icon,
    weather: data.weather[0].main,
    description: data.weather[0].description,
    temperature: (data.main.temp - 273.15).toFixed(2),
    humidity: data.main.humidity,
    wind_speed: data.wind.wind_speed,
    sunset: data.sys.sunset,
    sunrise: data.sys.sunrise,
  }

  
}