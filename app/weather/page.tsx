'use client'
import { Suspense } from "react";
import SearchBar from '../ui/weather/searchBar';

export default function Page() {
  return(
    <Suspense fallback={<div>XXX</div>}>
      <SearchBar/>
    </Suspense>
  )
}