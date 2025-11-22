import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import NavMenuContent from "./ui/root/navMenuContent";
const lexend = Lexend({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jakub Masłowski Portfolio",
  description: "My portfolio",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const li_format = 'flex-1 my-8 ml-4';
  return (
    <html lang="en">
      <body
        className={`${lexend.className} antialiased bg-purple-50`}
      >
          
        <NavMenuContent/>

        <div className='block gap-6 mt-20 sm:mt-3 sm:flex'>
          <aside className='flex-1 bg-violet-200 rounded-xl'>  
              <h3 className='text-center mt-3 text-2xl'>Favorite programming languages</h3>
              
                  <ul className="sm:ml-3 sm:align-left sm:block sm:mb-0 mb-3 flex">
                      <li className={li_format}><Image className='' width={48} height={48} src="/c++.svg" alt="C++ icon" />C++ </li>
                      <li className={li_format}><Image className='' width={48} height={48} src="/C (CSharp).svg" alt="C# icon" />C#</li>
                      <li className={li_format}><Image className='' width={48} height={48} src="/java.svg" alt="Java icon" />Java</li>
                  </ul>
            
          </aside>
          
          
          
          {children}
            
          
        </div>
        
        <footer className={'flex bg-violet-200 font-bold border rounded-xl border-violet-600 justify-center items-center text-center h-10 mt-3'}>
        <p> 2025.11.14 Jakub Masłowski</p>
        </footer>

      </body>
    </html>
  );
}
