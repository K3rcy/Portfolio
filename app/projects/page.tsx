'use client'

import {Convert} from '@/app/api/convert/routes';
import { useState } from 'react';

export default function Home() {
  const [resultValue, setResultValue] = useState< number | string>('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState(0);


  
  async function convertCurrency(){
    if(from === "POL" || to === "POL"){
      try{
      const x = await Convert({from, to, amount});
      if(x !== undefined){
        setResultValue(x.result);
      }
      }
      catch(err){
        setResultValue(`Wybierz waluty spośród możliwych do konwersji. Error: ${err}`);
      }
    }
    else{
      setResultValue("Należy konwertować z lub na polską walutę");
    }
  }

  return (
    <main className={'flex-3 bg-violet-200 rounded-xl p-3'}>
      <h1 className='text-center sm:text-2xl text-xl font-semibold'>PROJECTS</h1>
      <p>Convert amount from POL or to POL. available currencies for conversion: [USD, EUR, GBP]</p>
      <br />
      <form action="">
        <label htmlFor="FromCurrency">From </label>
        <input type="text" name="FromCurrency" id="FromCurrency" placeholder='Enter value' onChange={(e) => (setFrom(e.target.value))}/>
        <br />
        <label htmlFor="ToCurrency">To </label>
        <input type="text" name="ToCurrency" id="ToCurrency" placeholder='Enter value' onChange={(e) => (setTo(e.target.value))}/>
        <br />
        <label htmlFor="Amount">Amount </label>
        <input type="number" name="Amount" id="Amount" placeholder='Enter value' onChange={(e) => (setAmount(Number(e.target.value)))}/>

        <hr />

        <label htmlFor="Result">Result: {`${typeof resultValue === 'number' ? resultValue.toFixed(2) : resultValue}`} </label>

        <hr />

        <input type="button" value="Konwertuj" onClick={convertCurrency}/>
        <br />
        <input type="reset" />
      </form>
    </main>
  );
}