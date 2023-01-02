
import dumanBetService from "./DumanBetService.js";
import DumanBetService from "./DumanBetService.js";



const self = {

    async getApiData(filter) {
        const teams = await dumanBetService.getTeams(filter);
        const marketPosition = await dumanBetService.getMarketPositions();
        const allGames = await dumanBetService.getAllGames();
        const games = await joinGameTeams(allGames, teams, filter);
        const odds = await dumanBetService.getGamesOdds(games, marketPosition);
        return games.map(item => {
            item['odds'] = odds[item.id];
            return item;
        });

    },


    async getAllGamesOddsRawData(allGames, marketPositions) {
        return DumanBetService.getAllGamesOddsRawData(allGames, marketPositions)
    },


    async getAllGames(filter) {
        const teams = await dumanBetService.getTeams();
        return dumanBetService.getAllGames(teams, filter);
    },

    async getOdds(allGames) {

        const marketPosition = await dumanBetService.getMarketPositions();
        return await self.getAllGamesOddsRawData(allGames, marketPosition);
    }
}

export default  self;
