import dbService from "../dbConnction.js";
const dbConnection = await dbService.getBetConnection();
const schemaName='betWinnerGroups';
export default {
   async  getGroup(id) {

        return await dbConnection.collection(schemaName).findOne({id: id.toString()});
    }

}