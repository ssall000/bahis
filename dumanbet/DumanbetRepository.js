import request from '../network/networkUtil.js';
import CONSTS from '../utils/consts.js'


const {
    TEAMS,
    MATCH_ID,
    MARKET_POSITIONS,
    FULL_GAME,

} = CONSTS.DUMANBET;
const self={

    count:0,
    async getAllGamesRawData() {
        const res = await request.get(MATCH_ID);
        return JSON.parse( res)
    },

    async getMarketPositionsRawData() {
        const res = await request.get(MARKET_POSITIONS);
        return JSON.parse(res);
    },

    getGameOddRawData(gameId, controller) {
        return request.get(FULL_GAME + '/' + gameId, undefined, controller);
    },

    async getAllGamesOddsRawData(games) {
        return new Promise((res, rej) => {

            let promises = games.map(function (item) {


                return self.getGameOddRawData(item.id).then(item=>{
                    self.count++;
                    console.log('dumanbet:'+self.count)
                    return JSON.parse(item.game)
                }).catch(err=>{
                    console.error('error get odd data:',item.teams.t1,item.teams.t2,err);
                    throw err;
                })
            });

            Promise.allSettled(promises).then(async (result) => {
                self.count=0
                res(result)
            })
        })

    },

    async getTeamsRawData() {
         return JSON.parse(await  request.get(TEAMS));
    }


}

export default  self;