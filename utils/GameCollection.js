function __hash(key1, key2) {
    return key1 + '#' + key2
}

export default class GameCollection extends Map {

    constructor() {
        super();
        this.teams = {}
    }

    set(key1, key2, value) {
        super.set(__hash(key1, key2), value);
        if (value.teams) this.teams[__hash(key1, key2)] = value.teams
    }


    getTeams() {
        return this.teams;
    }

    getTeamsAsArray() {
        return Object.values(this.teams);
    }

    get(key1, key2) {
        let appr = super.get(__hash(key1, key2))
        if (appr) return {candidate:appr};
        let reverse = super.get(__hash(key2, key1))
        if(reverse) return {candidate:reverse,isReverse:true};
        return {candidate:undefined};
    }

}