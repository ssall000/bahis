import betService from "./services/betService.js";
import testService from './test/betService.js';
import logger from "./utils/logger.js";

const aNamomaly=0.5


let {map1,map2,matchedGames}=await testService.getBetData();

function getVal(object, path){
    return path.split('.').reduce ( (res, prop) => res[prop], object );
}


for(const [id1,id2,dist] of matchedGames){

    const game1= map1[id1];
    const game2= map2[id2];

    const compOdds=game1.odds;
    const baseOdds=game2.odds;

    if(compOdds.Total)
    compareTotals(id2,id1,baseOdds.result.Total,compOdds.Total.odds)
    console.log()



}
function compareTotals(baseGameId,compGameId,baseTotal,compTotal){



for(let fItem of compTotal){
    const fName=fItem.name.name.toLowerCase().replaceAll(' ','');
    let nameMatched=false;
    let realParamMatched=false;
    for (let sItem of baseTotal){
        const sName=sItem.name.N.toLowerCase().replace('total','').replace('()','').replaceAll(' ','')
        if(fName===sName){
            nameMatched=true;
            if(fItem.realParam==sItem.realParam){
                realParamMatched=true;
                const hasAnomaly=detectAnomaly(fItem.coef,sItem.coef);
                if(hasAnomaly){
                    reportAnomaly(baseGameId,compGameId,sName,fItem);
                }
                break;
            }


        }
    }
    if (!nameMatched){
        logger.error(`total : ${fItem.name.name} with real param:${fItem.name.h} with coef:${fItem.coef}  not found `);
    }
}
}



console.log("")

function detectAnomaly(coef1,coef2){
    return  coef1/coef2>1+aNamomaly|| coef2/coef1>1+aNamomaly
}

function reportAnomaly(baseGameId,compGameId,baseItem,compItem){

  logger.info(`base gameID : ${baseGameId} compGameId:${compGameId} baseItemName${baseItem.name.N} compItemName:${compItem.name.name}  has anomaly `);
}

/*
*
* import fs from 'fs';
fs.writeFile("./test/mock/map1.json", JSON.stringify(map1),function(err, result) {
    if(err) console.log('error', err);
});

fs.writeFile("./test/mock/map2.json", JSON.stringify(map2),function(err, result) {
    if(err) console.log('error', err);
});
*
fs.writeFile("./test/mock/matchedGames.json", JSON.stringify(matchedGames),function(err, result) {
    if(err) console.log('error', err);
});
*
*
*
* */