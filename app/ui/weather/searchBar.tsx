'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import WeatherComponent from './weather';

export default function SearchBar() {

  const searchParams = useSearchParams();

  const initialCity = searchParams.get('city') ?? '';
  const initialCountry = searchParams.get('code') ?? '';
  const initialState = searchParams.get('state') ?? '';

  const [city, setCity] = useState(initialCity);
  const [country, setCountry] = useState(initialCountry);
  const [state, setState] = useState(initialState);

  const pathname = usePathname();
  const {replace} = useRouter();

  const shouldShowWeather = city !== '' && country !== '';

  const handleCitySearch = useDebouncedCallback((x:string) => {
    setCity(x);
    const params = new URLSearchParams(searchParams.toString());
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


  return (
    <div className={`flex flex-col justify-center items-center text-center`}>
      <label htmlFor="city" className={`text-center sm:text-xl text-[15px] font-semibold`}>City name:</label>
        <input 
          type="text" 
          name="city" 
          placeholder="Enter city name" 
          onChange={(e) => (handleCitySearch(e.target.value))} defaultValue={initialCity}
          className={`border border-black rounded p-1`}
        />

          <br />

        <label htmlFor="name" className={`text-center sm:text-xl text-[15px] font-semibold`}>Country code:</label>
        <input
          type="text"
          name="country"
          placeholder="Enter country code"
          onChange={(e) => (handleCountrySearch(e.target.value))} defaultValue={initialCountry}
          className={`border border-black rounded p-1`}
        />

          <br />

        <label htmlFor="country" className={`text-center sm:text-xl text-[15px] font-semibold`}>State (US):</label>
        <input 
          type="text" 
          name="country" 
          placeholder="Enter state code" 
          onChange={(e) => (handleStateSearch(e.target.value))} defaultValue={initialState}
          className={`border border-black rounded p-1`}
        />

        <br />
         
        {shouldShowWeather ? ( 
          <WeatherComponent cityName={city} stateName={state} countryCode={country} /> 
        ) : (
          <p>Please enter a city and country code to see the weather.</p>
        )}   
                
    </div>
  )
}