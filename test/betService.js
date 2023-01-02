



import fs from 'fs'
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';



export  default {

    getBetData(){

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const map1 = JSON.parse(fs.readFileSync(path.join(__dirname,'mock/map1.json') ,'utf8'));
        const map2 = JSON.parse(fs.readFileSync(path.join(__dirname,'mock/map2.json') ,'utf8'));
        const matchedGames = JSON.parse(fs.readFileSync(path.join(__dirname,'mock/matchedGames.json') ,'utf8'));


      return {map1,map2,matchedGames}
    }


  }