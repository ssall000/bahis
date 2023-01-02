import BetwinnerService from "./BetwinnerService.js";



const self = {

    async getApiData(filter) {
        const allGames = await BetwinnerService.getAllGames(filter);
        return self.getOdds(Object.values(allGames));

    },

    async getOdds(allGames) {
        const oddData = await BetwinnerService.getGameOdds(allGames);
        return oddData
    },

    getAllGames(filter) {
        return BetwinnerService.getAllGames(filter)
    }

}


export default self

