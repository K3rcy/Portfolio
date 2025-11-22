import {Timer} from '@/app/ui/timer/Buttons';
export default function Home() {
  return (
    <main className={'flex-3 bg-violet-200 rounded-xl p-3'}>
      <h1 className='text-center sm:text-2xl text-xl font-semibold'>TIMER</h1>
       
      <Timer />
      
    </main>
  );
}