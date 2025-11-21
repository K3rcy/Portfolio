"use server";
export type WeatherResult = {
  city_name: string;
  icon_id: string;
  weather: string;
  description: string;
  temperature: number;
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
    city_name: data.name,
    icon_id: data.weather[0].icon,
    weather: data.weather[0].main,
    description: data.weather[0].description,
    temperature: Number((data.main.temp - 273.15).toFixed(2)),
    humidity: data.main.humidity,
    wind_speed: data.wind.wind_speed,
    sunset: data.sys.sunset,
    sunrise: data.sys.sunrise,
  }

  
}
export async function generateText(weather:WeatherResult){
  let wind_strength, conclusion;
  if(weather.wind_speed >= 10.8){
    wind_strength = "strong";
  }
  else if (weather.wind_speed >= 14){
    wind_strength= "very strong";
  }
  else{
    wind_strength= "light";
  }
  if(weather.temperature < 0){
    conclusion = "It will be very cold today, dress very thickly. Otherwise you might freeze!";
  }
  else if(weather.temperature < 10){
    conclusion = "Better take a jacket with yourself!";
  }
  else if(weather.temperature < 20){
    conclusion = "You might want to take a hoodie with you!";
  }
  else if(weather.temperature >= 20){
    conclusion = "It will be hot today, don't bother dressing to thickly!";
  }
  

  if(weather.weather == "Rain"){
    conclusion += " Also take an umbrella with yourself, it's raining!";
  }
  
  return `Today in ${weather.city_name} the weather will be ${weather.description}. Temperature will be: ${weather.temperature}°C with a ${wind_strength} wind. ${conclusion}`;
}