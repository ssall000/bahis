import dbService from "./dbConnction.js";


const dbConnection = await dbService.getBetConnection()
export default {
    insertTeam(team1, team2, distance) {
        // return dbConnection.collection('teams').updateOne(
        //     {"team1": team1},
        //     {$setOnInsert: {team1: team1, team2: team2, distance: distance}},
        //     {upsert: true}
        // )
       return  dbConnection.collection('teams').replaceOne( {"team1": team1}, {team1: team1, team2: team2, distance: distance}, {upsert: true})
    },

    findPair(key1, key2) {
        return dbConnection.collection('teams').find({$or: [{team1: key1}, {team2: key2}]})
    },
    findAll() {
        return dbConnection.collection('teams').find({})
    },
    findTeam(key1) {
        return dbConnection.collection('teams').find({team1: key1});
    }

}