import Comparator from "../comparator/comparator.js";


let ENV = 'TEST1' ;

const betwinnerApi = (await import(ENV == 'TEST' ? '../test/betwinner/betwinnerApi.js' : '../betwinner/BetwinnerApi.js')).default;
const dumanbetApi = (await import(ENV == 'TEST' ? '../test/dumanbet/DumanbetApi.js' : '../dumanbet/DumanBetApi.js')).default;

import logger from '../utils/logger.js'
import _request from '../network/networkUtil.js';
import CONSTS from '../utils/consts.js';

import matchAlgorithm from '../comparator/matchAlgorithm.js'
import teamService from "../db/teamService.js";
import CacheManager from "../cache/CacheManager.js";
import oddsMap from "../utils/oddsMap.js";
const {
    BETWINNER,
    TIME_FILTER
} = CONSTS;

const self= {


   async updateUrl(){
        let baseUrl = await _request.getRedirectUrl(BETWINNER.REDIRECT_URL);
        BETWINNER.updeteUrls(baseUrl)
    },
    async compareTeams(teams1,teams2){
        let comparator= new Comparator(teams1,teams2);
        comparator.on('matched',async (data)=> {
            const {item, candidate, totalDistance} = data;

            if (data.totalDistance > 0.80 && data.insert) {
                logger.debug('insert', item.teams.t1, candidate.teams.t1)
                logger.debug('insert', item.teams.t2, candidate.teams.t2)
                teamService.insertTeam(item.teams.t1,candidate.teams.t1,totalDistance);
                teamService.insertTeam(item.teams.t2,candidate.teams.t2,totalDistance)

            }
        })

        comparator.on('hit',async (data)=> {
            const {item, candidate, totalDistance} = data;
            logger.info('hit', item.teams.t1, candidate.teams.t1,totalDistance)
        })

        comparator.on('notMatched',(data)=>{
            const {item,candidate,totalDistance}= data;

            logger.error('notMatched',item.teams.t1,'-',candidate&&candidate.teams.t1,totalDistance)
            logger.error('notMatched',item.teams.t2,'-',candidate&&candidate.teams.t2)

        })

        comparator.on('completed',()=>{
            logger.log('missed',CacheManager.missed)
            logger.log('hit',CacheManager.hit)
        })
        return await comparator.compare(matchAlgorithm.jeroFormula);

    },
    async getBetData(){
        await self.updateUrl();

        let teams1 = await dumanbetApi.getAllGames({sportFilter: BETWINNER.FILTER.FULTBOL,timeFilter: TIME_FILTER.TWO_DAY});
        let teams2 = await betwinnerApi.getAllGames({sportFilter: BETWINNER.FILTER.FULTBOL, timeFilter: TIME_FILTER.ONE_DAY});

        let {map1,map2,matchedGames}= await self.compareTeams(teams1,teams2)

        let odds1 = await dumanbetApi.getOdds(Object.values(map1));
        let odds2 = await betwinnerApi.getOdds(Object.values(map2));

        map1= mapOdd(Object.values(map1),odds1);
        map2= mapOdd(Object.values(map2),odds2)

        return {map1,map2,matchedGames}

    },


}
function  mapOdd(arr,odds){

    return   arr.reduce((prev,curr)=>{
        curr.odds=odds[curr.id]
        prev[curr.id]=curr
        return prev;
    },{})
}

export default self;