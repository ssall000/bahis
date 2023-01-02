import utils from '../utils/util.js'
import distance from 'jaro-winkler';
import teamMap from "../utils/teamMap.js";
import regionMap from "../utils/RegionMap.js";


function commonSet(arr1, arr2) {

    let arr1Filtered = arr1.filter(item => {
        return !utils.reservedKey.includes(item) && item.replace('.', '').length > 2;
    });
    let arr2Filtered = arr2.filter(item => {
        return !utils.reservedKey.includes(item);
    });
    return arr1Filtered.filter(value => arr2Filtered.includes(value));
}

function hasCommonSet(s1, s2) {
    let commonSet = commonSet(s1.split(' '), s2.split(' '));
    return commonSet.length !== 0;
}


function findDistance(t1, t2) {
    let T1 = utils.reArrangeString(t1).split(' ').filter(item => item.length > 2).join(' ');
    let T2 = utils.reArrangeString(t2).split(' ').filter(item => item.length > 2).join(' ');
    let short,long
    if(T1.length > T2.length ){
        long=T1;
        short=T2;
    }else {
        long=T2;
        short=T1;
    }
    let dist=0;
    for(let i=0;i+short.length<=long.length;i++){
        let slice= long.slice(i,i+short.length);
        let temp = distance(short, slice, {caseSensitive: false});
        if(temp>dist) dist=temp;
    }

    return dist;
}

function findRegionDistance(r1,r2){
   return  distance(    regionMap.get(r1),  regionMap.get(r2), {caseSensitive: false});
}

const self = {

    jeroFormula(item, dataMap) {
        let candidate;
        let totalDistance = 0;
        for (let [key, tempCandidate] of dataMap) {
            if (item.teams.type !== tempCandidate.teams.type || item.teams.gender !== tempCandidate.teams.gender) continue;

            let distanceD1 = findDistance(item.teams.t1, tempCandidate.teams.t1);
            let distanceD2 = findDistance(item.teams.t2, tempCandidate.teams.t2);
            let distanceD3 = findRegionDistance(item.region, tempCandidate.region, {caseSensitive: false});
            let tempTDistance = distanceD1 * distanceD2 * distanceD3;
            if (tempTDistance > totalDistance) {
                candidate = tempCandidate;
                totalDistance = tempTDistance;
            }
            if (totalDistance > 0.75) break;

        }
        if (totalDistance < 0.65) return {item, candidate, totalDistance, fail: true}
        return {item, candidate, totalDistance};

    },
    commonSetFormula(item, dataMap) {

        let team1 = teamMap.get(utils.reArrangeString(item.teams.t1.name));
        let team2 = teamMap.get(utils.reArrangeString(item.teams.t2.name));

        const m = dataMap.filter((bwItem) => {

            if (item.teams.type !== bwItem.teams.type) return false;
            if (item.teams.gender !== bwItem.teams.gender) return false;

            let bWTeam1 = utils.reArrangeString(bwItem.teams.t1.name);
            let bWTeam2 = utils.reArrangeString(bwItem.teams.t2.name);

            if (team1 === bWTeam1 && team2 === bWTeam2) return true;

            const team1Intertect = hasCommonSet(team1, bWTeam1)
            const team2Intertect = hasCommonSet(team2, bWTeam2)
            return team1Intertect && team2Intertect
        })
        if (m.length === 0) {
            return {fail: true, item}
        } else if (m.length > 1) {
            return {fail: true, item, candidate: m}
        }
        return {item, candidate: m[0]}
    }

}


export default self;