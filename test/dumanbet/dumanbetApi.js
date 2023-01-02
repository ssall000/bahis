


import  apidata from './apidata.js';
import  getAllgameMockData from './getAllGamesMockData.js';
import addOddsToDataMockData from './addOddsToDataMockData.js'
export default {

    getApiData({notFilter}){
        return  apidata.filter((item)=>{ 
            return ! notFilter.some(substring=>item.teams.t1.name.includes(substring));
        })
    },

    getAllGames(filter){
        return getAllgameMockData
    },

    addOddsToData(){
        return addOddsToDataMockData
    }
}