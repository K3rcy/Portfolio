'use server'

import {Rates} from '@/app/api/rates/routes';
import * as fs from 'fs/promises';
import * as path from 'path';
import { History } from '../history/routes';
export type ConversionRecord = {
    from: string;
    to: string;
    amount: number;
    result: number;
    timestamp: string;
}

export type convertValues={
    from: string;
    to: string;
    amount: number;
}

export async function Convert(values:convertValues){
    const rates = await Rates();
    let calculatedResult: number | string;

    const HISTORY_FILE_PATH = path.join(process.cwd(), 'app', 'data', 'history.json');

    async function logConversionRecord(record: ConversionRecord){
        let history: ConversionRecord[] = [];
        const data = await fs.readFile(HISTORY_FILE_PATH, 'utf-8');
        try{
            history = JSON.parse(data);
            history.push(record);
        }catch(err){
            console.log(err);
        }
        await fs.writeFile(HISTORY_FILE_PATH, JSON.stringify(history, null, 2));
    }

    if(values.from === "POL"){
        switch(values.to){
            case "USD":
                
                calculatedResult = values.amount * rates.rates.USD;
                break;
            case "EUR" :
                
                calculatedResult = values.amount * rates.rates.EUR;
                break;
            case "GBP" :
                
                calculatedResult = values.amount * rates.rates.GBP;
                break;
            default:
                calculatedResult = "Invalid target currency (must be USD, EUR, or GBP)";
        }
    }
    else if(values.to === "POL"){
        switch(values.from){
            case "USD":
            
                calculatedResult = values.amount * (1/rates.rates.USD);
                break;
            case "EUR" :
                
                calculatedResult = values.amount * (1/rates.rates.EUR);
                break;
            case "GBP" :
                
                calculatedResult = values.amount * (1/rates.rates.GBP);
                break;
            default:
                calculatedResult = "Invalid source currency (must be USD, EUR, or GBP)";
        }
    }
    else{
        
        calculatedResult = "Either convert from {POL to other currency} or from {other currency to POL}";
        
    }

    if (typeof calculatedResult === 'number') {
        const record: ConversionRecord = {
            ...values,
            result: calculatedResult,
            timestamp: new Date().toISOString(),
        };
        await logConversionRecord(record);
        await History();
        return { "result": calculatedResult };
    }
}