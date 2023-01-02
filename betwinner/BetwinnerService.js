import utils from "../utils/util.js";
import logger from "../utils/logger.js";
import BetwinnerRepository from "./BetwinnerRepository.js";
import CONSTS from "../utils/consts.js";
import GameCollection from "../utils/GameCollection.js";
import betGroupService from "../db/services/betGroupService.js";

const LANGUAGE = CONSTS.LANGUAGE;
const betNames = (await import(`./${LANGUAGE}/betName.js`)).default;
const betGroupName = (await import(`./${LANGUAGE}/betGroupName.js`)).default;


const self = {


    async getAllGames(filter) {
        const games = await BetwinnerRepository.getAllGames();
        return games.filter(item => filter.sportFilter.includes(item.SN)).reduce((prev, current) => {


            let gameType = utils.getTypeOfGame(current.O1, current.O2, current.LE);
            if (gameType === utils.gameType.NOT_ACCEPTED) {
                logger.error(' %c betwinner team Not accepted: TEAM1: ' + current.O1 + ' Team2:' + current.O2, 'background: yellow; color: red');
                return prev;
            }
            const item = {
                id: current.CI,
                teams: {
                    t1: current.O1,
                    t2: current.O2,
                    gender: utils.getGenderOfGame(current.O1, current.O2, current.LE),
                    type: gameType
                },
                leaugue: current.L,
                region: current.CN,
                sport: current.SN

            }
            prev.set(item.teams.t1, item.teams.t2, item);
            return prev;

        }, new GameCollection())
    },


    async getGameOdds(games) {
        const rawData = await BetwinnerRepository.getAllGamesOddsRawData(games);
        let odds = {}
        for (const item of rawData) {
            if (item.status === 'rejected') {
                continue;
            }
            const fixedData = await self.reArrangeData(item.value);
            odds[item.value.CI] = fixedData;
        }
        return odds;

    },

    async reArrangeData(game, response = {hasSub: true}) {
        if (!game.SG) {
            if (!game.GE) return [];
            return await self._reArrangeData(game)
        }


        for (let item of game.SG) {

            if (item.TG) {
                if (!response[item.TG]) {
                    response[item.TG] = {hasSub: true};
                }
                if (item.PN) {
                    response[item.TG][item.PN] = await self._reArrangeData(item, response);
                } else {
                    response[item.TG]['result'] = await self._reArrangeData(item, response);
                }

            } else {
                response[item.PN] = await self._reArrangeData(item, response);
            }

        }
        response['result'] = await self._reArrangeData(game)

        return response;

    },


    async _reArrangeData(game) {
        if (!game.GE) {
            return []
        }
        return game.GE.reduce(async function (promisePrev, currentValue) {
            const key = await betGroupService.getGroup(currentValue.G);
            const values = currentValue.E;
            const oddItems = {};

            oddItems[key.N] = values.reduce((prev, current) => {
                if (current.length > 1) {
                    console.log();
                }

                let a = key;
                const b = current.map((item) => {
                    return {
                        coef: item.C,
                        name: key.M[item.T],
                        realParam: item.P
                    };
                })

                prev.push(...b);
                return prev;

            }, []);


            let previousValue=await promisePrev;
            return {
                ...previousValue,
                ...oddItems
            }
        }, Promise.resolve({}))

    }


}

export default self;