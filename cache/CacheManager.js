import teamService from "../db/teamService.js";

const cachedMap = await teamService.findAll()

const self = {
    missed: 0,
    hit: 0,
    getTeam(t) {
        let res = cachedMap[t];
        return res&&res.t2
    },
    add(t1,t2){
        cachedMap[t1]=t2;
    },
    getTeamPair(t1, t2) {
        let t1Found = cachedMap[t1];
        let t2Found = cachedMap[t2];
        if (t1Found && t2Found) {
            self.hit++;
            return {t1: t1Found.team2, t2: t2Found.team2, distance: t1Found.distance}
        }
        self.missed++;
    }
}

export default self;