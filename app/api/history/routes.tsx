import * as fs from 'fs/promises';
import * as path from 'path';
import { ConversionRecord } from '../convert/routes';
export async function History(){
    const HISTORY_FILE_PATH = path.join(process.cwd(), 'app', 'data', 'history.json');
    const data = await fs.readFile(HISTORY_FILE_PATH, 'utf-8');
    const history: ConversionRecord[] = JSON.parse(data);
    console.log(history);
}