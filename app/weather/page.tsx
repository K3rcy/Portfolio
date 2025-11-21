'use client'
import WeatherComponent from '@/app/ui/weather/weather';;
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Page() {
  
  const [city, setCity] = useState('');
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  const shouldShowWeather = city !== '' && country !== '';

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const handleCitySearch = useDebouncedCallback((x:string) => {
    setCity(x);
    const params = new URLSearchParams(searchParams);
    if(x) {
      params.set('city', x)
    } else{
      params.delete('city');
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  const handleCountrySearch = useDebouncedCallback((x:string) => {
    setCountry(x);
    const params = new URLSearchParams(searchParams);
    if(x) {
      params.set('code', x)
    } else{
      params.delete('code');
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  const handleStateSearch = useDebouncedCallback((x:string) => {
    setState(x);
    const params = new URLSearchParams(searchParams);
    if(x) {
      params.set('state', x)
    } else{
      params.delete('state');
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return(
    
    <div>

        <label htmlFor="">City name:</label>
        <input type="text" name="city" placeholder="Enter city name" onChange={(e) => (handleCitySearch(e.target.value))}/>
        
        <label htmlFor="">Country code:</label>
        <input type="text" name="country" placeholder="Enter country code" onChange={(e) => (handleCountrySearch(e.target.value))}/>

        <label htmlFor="">State (US):</label>
        <input type="text" name="country" placeholder="Enter country code" onChange={(e) => (handleStateSearch(e.target.value))}/>
        <br />

        {shouldShowWeather ? (
            <WeatherComponent cityName={city} stateName={state} countryCode={country} />
        ) : (
            <p>Please enter a city and country code to see the weather.</p>
        )}
    </div>
  )
}