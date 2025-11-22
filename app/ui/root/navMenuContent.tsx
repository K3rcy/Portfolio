'use client'
import { Navs } from "./navs"
import {useState} from "react"

export default function NavMenuContent(){

    const [NavsFormat, setNavsFormat] = useState('hidden');
    const [MarginBottom, setMarginBottom] = useState('mb-2');
    function Expanded(){
        if(NavsFormat === 'block my-2'){
        setNavsFormat('hidden');
        setMarginBottom('mb-2');
        }
        else{
        setNavsFormat('block my-2');
        setMarginBottom('mb-5');
        }
    }

    return (
        <nav className="flex flex-col fixed w-1/1 bg-violet-400 font-semibold border-2 rounded-xl border-violet-600 sm:justify-center sm:items-center text-center sm:flex-row sm:h-20 sm:static">
            <button className={`sm:hidden block flex-1 text-gray-800 text-5xl m-2 ${MarginBottom} `} onClick={Expanded}>Menu</button>
            <hr className={`sm:hidden ${NavsFormat}`}/>
            <Navs href="/" value="My bio" className={`${NavsFormat} sm:block sm:flex-1`}/>
            <Navs href="/contact" value="Contact" className={`${NavsFormat} sm:block sm:flex-1`}/>
            <Navs href="/projects" value="Projects" className={`${NavsFormat} sm:block sm:flex-1`}/>
            <Navs href="/timer" value="Timer" className={`${NavsFormat} sm:block sm:flex-1`}/>
            <Navs href="/weather" value="Weather" className={`${NavsFormat} sm:block sm:flex-1`}/>
        </nav>
    )
}