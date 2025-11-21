'use client';
import {Weather, ChooseCity, CordsData, WeatherResult} from "@/app/lib/weather";
import {Suspense} from "react";
import Image from "next/image";
import { useEffect, useState } from "react";




export default function WeatherComponent({cityName, stateName, countryCode}: {cityName: string, stateName: string, countryCode: string}) {
  
    const [locations, setLocations] = useState<CordsData[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [weather, setWeather] = useState<WeatherResult | null>(null);
    
    useEffect(() => {
      async function loadLocations() {
        try {
          const locs = await ChooseCity(cityName, stateName, countryCode);
          setLocations(locs);
        } catch (err) {
          console.error(err);
        }
      }
      loadLocations();
    }, [cityName, stateName, countryCode]);

    useEffect(() => {
      if (locations.length === 0) return; 
      if (selectedIndex === null) return;
      if (!locations[selectedIndex]) return; 

      async function loadWeather() {
        if (selectedIndex === null) return;
        const loc = locations[selectedIndex];
        const weatherData = await Weather(loc.lat, loc.lon);
        setWeather(weatherData);
      }
      loadWeather();
    }, [selectedIndex, locations]);


    let Weather_icon = '/animated/day.svg';

    if (weather){
      switch(weather.icon_id){
        case "01d":
          Weather_icon = '/animated/day.svg';
          break;
        case "01n":
          Weather_icon = '/animated/night.svg';
          break;
        case "02d":
          Weather_icon = '/animated/cloudy-day-3.svg';
          break;
        case "02n":
          Weather_icon = '/animated/cloudy-night-3.svg';
          break;
        case "03d":
          Weather_icon = '/animated/cloudy.svg';
          break;
        case "03n":
          Weather_icon = '/animated/cloudy.svg';
          break;
        case "04d":
          Weather_icon = '/animated/cloudy.svg';
          break;
        case "04n":
          Weather_icon = '/animated/cloudy.svg';
          break;
        case "09d":
          Weather_icon = '/animated/rainy-3.svg';
          break;
        case "09n":
          Weather_icon = '/animated/rainy-6.svg';
          break;
        case "10d":
          Weather_icon = '/animated/rainy-3.svg';
          break;
        case "10n":
          Weather_icon = '/animated/rainy-6.svg';
          break;
        case "11d":
          Weather_icon = '/animated/thunder.svg';
          break;
        case "11n":
          Weather_icon = '/animated/thunder.svg';
          break;
        case "13d":
          Weather_icon = '/animated/snowy-3.svg';
          break;
        case "13n":
          Weather_icon = '/animated/snowy-6.svg';
          break;
        case "50d":
          Weather_icon = '/animated/fog-svgrepo-com.svg';
          break;
        case "50d":
          Weather_icon = '/animated/fog-svgrepo-com.svg';
          break;

      }
    } 
    
    
    return (
      <div>

          {locations.length > 0 && (
            <select
              onChange={(e) => setSelectedIndex(Number(e.target.value))}
              defaultValue=""
            >
              <option value="" disabled>
                Select a location...
              </option>

              {locations.map((loc, index) => (
                <option key={index} value={index}>
                  {loc.name}, {loc.state}, {loc.country}
                </option>
              ))}
            </select>
          )}
        {weather && (
          <Suspense fallback={<div>Loading weather data...</div>}>
            { selectedIndex && (
            <h2>Weather in {locations[selectedIndex].name}, {locations[selectedIndex].country} : </h2>
            )}
            <div>
              <p className="uppercase"><Image src={Weather_icon} alt="Weather Icon" height={96} width={96}/>{weather.description} </p>
              <p>Temperature: {weather.temperature}°C</p>
              <p>Humidity: {weather.humidity}%</p>
              <p>Wind speed: {weather.wind_speed} m/s</p>

            </div>
          </Suspense>
          )}
        
      
    </div>
    );
} 

