'use server';
import Weather from "@/app/lib/weather";
import {Suspense} from "react";
export default async function WeatherComponent({cityName, countryCode}: {cityName: string, countryCode: string}) {
  try{
    const weatherDataPromise = await Weather(cityName, countryCode);
    return (
      <div>
          

        <h2>Weather in {cityName} : </h2>
        <Suspense fallback={<div>Loading weather data...</div>}>
          <div>
            <p>Description: {weatherDataPromise.description}</p>
            <p>Temperature: {weatherDataPromise.temperature}°C</p>
            <p>Humidity: {weatherDataPromise.humidity}%</p>
            <p>Wind speed: {weatherDataPromise.wind_speed} m/s</p>
          </div>
        </Suspense>
      </div>
    );
  } catch(error){
    return <p>Can&apos;t find city or country code</p>
  }
}
