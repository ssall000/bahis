import teamRepository from "./teamRepository.js";



export default {
    insertTeam(team1, team2, distance) {

        return teamRepository.insertTeam(team1, team2, distance);
    },
    async findPair(key1,key2){
        const res= await (await teamRepository.findPair(key1,key2)).toArray();
        if(res.length===0) return
        return res;
    },
    async findTeam(key1){
        const res= await (await teamRepository.findTeam(key1)).toArray();
        if(res.length===0) return
        return res;
    },
    async findAll(){
        let res= await (await teamRepository.findAll()).toArray();
        if(res.length===0) return
        return res.reduce((prev,curr)=>{
            prev[curr.team1]=curr
            return prev
        },{})
    }
}