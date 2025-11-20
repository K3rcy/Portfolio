
import WeatherComponent from '@/app/ui/weather/weather';
import useSearchParams from 'next/navigation';
export default async function Page(props: {
  searchParams?: Promise<{
    city?: string;
    country?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const city = searchParams?.city || '';
  const country = searchParams?.country || '';
  
  const shouldShowWeather = city !== '' && country !== '';
  return(
    
    <div>
        <form action="">

            <label htmlFor="">City name:</label>
            <input type="text" name="city" placeholder="Enter city name" />

            <label htmlFor="">Country code:</label>
            <input type="text" name="country" placeholder="Enter country code"/>
            <br />
            <button type="submit">Get Weather</button>

        </form> 
        {shouldShowWeather ? (
            <WeatherComponent cityName={city} countryCode={country} />
        ) : (
            <p>Please enter a city and country code to see the weather.</p>
        )}
    </div>
  )
}