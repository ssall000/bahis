import DumanbetRepository from "./DumanbetRepository.js";
import format from "date-format";
import utils from "../utils/util.js";
import logger from "../utils/logger.js";
import CONSTS from "../utils/consts.js";

import categories from '../utils/oddsMap.js'

import ObjectBuilder from "../utils/ObjectBuilder.js";
import GameCollection from "../utils/GameCollection.js";

let dbPrimaryKeys = Object.values(categories.dumanbetCatagory.getPrimary())
let dbSecondaryKeys = Object.values(categories.dumanbetCatagory.getSecondary())


const LANGUAGE = CONSTS.LANGUAGE;

const cache = {};

const self = {

    async getAllGames(teams, filter = {sportFilter: [], timeFilter: 1}) {
        if (!utils.isObject(teams)) throw new Error('DumanbetService=>getAllGames team  is empty');
        const allGames = await DumanbetRepository.getAllGamesRawData();
        const games = new GameCollection();
        Object.values(allGames[LANGUAGE.toUpperCase()].Sports).filter(item => {
            return filter.sportFilter.includes(item.Name)
        }).forEach((sport) => {
            Object.values(sport.Regions).forEach((region) => {
                Object.values(region.Champs).forEach((champ) => {
                    Object.values(champ.GameSmallItems).forEach((gameItem) => {
                        const itemDate = format.parse('yyyy-MM-ddThh:mm:ss', gameItem.StartTime);
                        const allawedFilter = utils.timeFilter(new Date(), itemDate, filter.timeFilter);

                        if (gameItem.ID > 0 && allawedFilter && teams[gameItem.t1] && teams[gameItem.t2]) {
                            let team1Name = teams[gameItem.t1].Name;
                            let team2Name = teams[gameItem.t2].Name;
                            let gameType = utils.getTypeOfGame(team1Name, team2Name, champ.KeyName);

                            if (gameType === utils.gameType.NOT_ACCEPTED) {
                                logger.error('%c Duamnbet  team Not accepted: TEAM1: ' + team1Name + ' Team2:' + team2Name, 'background: white; color:red');
                                return false;
                            }
                            const teamItem = {
                                t1: team1Name,
                                t2: team2Name,
                                type: gameType,
                                gender: utils.getGenderOfGame(team1Name, team2Name, champ.KeyName),

                            };

                            games.set(teamItem.t1, teamItem.t2, {
                                id: gameItem.ID,
                                teams: teamItem,
                                leaugue: champ.Name,
                                region: region.Name,
                                sport: sport.Name,
                                time: gameItem.StartTime
                            })
                        }
                    })

                })
            })
        })
        return games;
    },

    async getMarketPositions() {
        let _cache = cache['marketPositions']
        if (_cache) {
            return _cache
        }
        const res = await DumanbetRepository.getMarketPositionsRawData();
        cache['marketPositions'] = res;
        return res;

    },

    reArrangeOdds(rawData) {
        console.log(categories.dumanbetCatagory);
        const response = {};


        const objectBuilder = new ObjectBuilder();
        for (let [key, value] of Object.entries(rawData)) {
            let key1, key2;
            const foundPrimaryKey = dbPrimaryKeys.find(item => key.toLowerCase().includes(item.toLowerCase()));
            const foundSecondaryKey = dbSecondaryKeys.find(item => key.toLowerCase().includes(item.toLowerCase()));
            const value = key.replace(foundPrimaryKey, '').replace(foundSecondaryKey, '').replace('-', '').trim();
            if (foundSecondaryKey || foundSecondaryKey)
                if (foundPrimaryKey) {
                    if (foundSecondaryKey) {
                        const key1 = foundSecondaryKey[0];
                        const key2 = key.replace(key1, '').replace('-', '').trim();
                        if (!response[foundPrimaryKey[0]]) {
                            response[foundPrimaryKey[0]] = {}
                        }
                        if (!response[foundPrimaryKey[0]][key1]) {
                            response[foundPrimaryKey[0]][key1] = {}
                        }
                        response[foundPrimaryKey[0]][key1][key2] = value.odds;


                    } else {
                        if (!response[foundPrimaryKey[0]]) {
                            response[foundPrimaryKey[0]] = {}
                        }
                        response[foundPrimaryKey[0]][categories.dumanbetCatagory.total] = value.odds;
                    }
                } else {
                    const foundSecondaryInKey = dbSecondaryKeys.find(item => key.toLowerCase().includes(item.toLowerCase()));

                    if (!foundSecondaryInKey) {
                        if (!response[categories.dumanbetCatagory.total]) {
                            response[categories.dumanbetCatagory.total] = {}
                        }
                        response[categories.dumanbetCatagory.total][key] = value.odds;
                    } else {
                        const key1 = foundSecondaryInKey[0];
                        const key2 = key.replace(key1, '').replace('-', '').trim();
                        if (!response[key1]) {
                            response[key1] = {}
                        }
                        response[key1][key2] = value.odds;
                    }
                    console.log();
                }


            return response;

        }

    },
    async getGameOddRawData(gameId, controller) {
        return DumanbetRepository.getGameOddRawData(gameId, controller);
    }
    ,

    async joinMarketPosToGameOdd(game, marketPosition) {


        return Object.entries(game.ev).reduce(function (previousValue, currentValue) {

            const key = currentValue[0];
            const values = currentValue[1]
            let item = {};

            let oddItems = []
            Object.values(values).forEach(element => {
                let realParam = marketPosition.positions[element.pos].h;
                const pos = marketPosition.positions[element.pos];

                if (realParam && realParam !== '0' && pos.name === '2') {
                    realParam = parseFloat(realParam) * -1;
                }

                oddItems.push({
                    coef: element.coef,
                    name: pos,
                    realParam: realParam
                })
            });

            let oddName = marketPosition.markets[key].name;
            item[oddName] = {
                'odds': oddItems
            };
            const catagories = utils.DUMANBET.getOddsCatagory(marketPosition.markets[key])
            item[marketPosition.markets[key].name] = {
                'odds': oddItems,
                ...catagories
            };

            return {
                ...previousValue,
                ...item
            };

        }, {})

    }
    ,

    async getAllGamesOddsRawData(games, marketPositions) {
        console.log("matches size: ", games.length);
        const rawData = await DumanbetRepository.getAllGamesOddsRawData(games);
        let oddData={}
        for (let item of rawData) {
            if (item.status === 'rejected') {
                continue;
            }
            oddData[item.value.id]= await self.joinMarketPosToGameOdd(item.value, marketPositions);
            //  const reArragedData = self.reArrangeOdds(fixedData)
        }
        return oddData;
    },


    async getTeams() {
        let teams = await DumanbetRepository.getTeamsRawData();
        return teams.reduce(function (previousValue, currentValue) {
                previousValue[currentValue.ID] = currentValue;
            return previousValue;
        }, {})
    }

}

export default self;