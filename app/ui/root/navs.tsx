import Link from "next/link";
export function Navs({href, value, className} : {href:string, value:string, className?:string}){
    return(
    <div className={`flex-1 text-gray-800 text-3xl ${className}`}>
        <Link href={href}>{value}</Link>
    </div>
    )
}