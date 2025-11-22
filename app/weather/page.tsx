import { Suspense } from "react";
import SearchBar from '../ui/weather/searchBar';

export default async function Page() {
  
  return(
    <main className={'flex-3 bg-violet-200 rounded-xl p-3'}>
      <Suspense fallback={<div className={'flex-3 bg-violet-200 rounded-xl p-3'}>XXX</div>}>
        <SearchBar/>
      </Suspense>
    </main>
  )
}