import matchAlgorithm from "./matchAlgorithm.js";
import EventEmitter from "events";
import teamService from "../db/teamService.js";
import CacheManager from "../cache/CacheManager.js";

const defaultAlgo = matchAlgorithm.commonSetFormula;

function setData(map1,map2,item, candidate){

    map1[item.id]=item
    //delete map1[item.id]['id'];
    map2[candidate.id]=candidate
  //  delete map2[candidate.id]['id'];
}

export default class Comparator extends EventEmitter {

    constructor(map1, map2) {
        super();
        this.map1 = map1;
        this.map2 = map2;

    }

    async lookUpCache(item) {
        let found = CacheManager.getTeamPair(item.teams.t1, item.teams.t2)
        if (found) {
            let {candidate,isReverse} = this.map2.get(found.t1, found.t2)
            if(candidate) return {item, candidate, totalDistance: found.distance,isReverse}

        }
    }

    emit(eventName, ...args) {
        process.nextTick(() => {
            super.emit(eventName, ...args);
        });
    }



    async compare(cb) {

        let matchedGames=[]
        let filteredMap1={};
        let filteredMap2={}
        for (let [key, item] of this.map1) {

            let foundCache = await this.lookUpCache(item);
            if (foundCache) {
                this.emit('hit', foundCache)
                matchedGames.push([item.id,foundCache.candidate.id,foundCache.totalDistance]);
                setData(filteredMap1,filteredMap2,item,foundCache.candidate)
                continue;
            }

            let t1FromDb = CacheManager.getTeam(item.teams.t1)
            let t2FromDb = CacheManager.getTeam(item.teams.t2)
            item.teams.t1=t1FromDb||item.teams.t1
            item.teams.t2=t2FromDb||item.teams.t2

            //set default algorith is subSet Method
            if (!cb) cb = defaultAlgo;
            let res = cb(item, this.map2)

            if (res.fail) {
                this.emit('notMatched', {insert: true, ...res})
            } else {
                this.emit('matched', {insert: true, ...res})
                matchedGames.push([item.id,res.candidate.id,res.totalDistance,res.isReverse])
                setData(filteredMap1,filteredMap2,item,res.candidate)
            }
        }
        this.emit('completed')
        return {map1:filteredMap1,map2:filteredMap2,matchedGames};

    }
}

