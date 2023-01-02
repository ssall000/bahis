import request from "../network/networkUtil.js";
import CONSTS from "../utils/consts.js";


const self = {

    count:0,
    async getAllGames() {
        const games = (await request.get(CONSTS.BETWINNER.GAMES, true)).Value;
        return games;
    },
    async getGameOddRawData(gameId, controller) {
        return request.get(CONSTS.BETWINNER.GAME_DATA + gameId);
    },
    async getAllGamesOddsRawData(games) {

        return new Promise((res, rej) => {

            let promises = games.map(async function (item) {

                return await self.getGameOddRawData(item.id).then(res => {
                    self.count++;
                    console.log('betwinner:'+self.count)
                    if (!res.Success) {
                        throw new Error(res.Error)
                    }
                    return res.Value
                }).catch(err => {
                    console.error('error get odd data:', item.teams.t1, item.teams.t2, err);
                    throw err;
                })
            });

            Promise.allSettled(promises).then(async (result) => {
                self.count=0;
                res(result)
            })
        })

    }




}

export default self;