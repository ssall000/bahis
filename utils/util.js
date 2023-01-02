import CONSTS from './consts.js';
let reservedKey = [

    'Alianza' , 'futebol','real','calcio','sugar','african','atletico','united',  'town', 'sports', 'Club',  'maccabi', 'hapoel', 'city', 'park', 'club',  'club',  'bnei'
]



let gameTypeEssential = {
    U21: 'U21',
    U20: 'U20',
    U19: 'U19',
    U23: 'U23',
    SRL:'SRL'
}
let gametype = {
    DEFAULT: 'DEFAULT',
    NOT_ACCEPTED: 'NOT_ACCEPTED',

}
const genderType = [
    '(Bayanlar)', '(K.)', 'W.', '(Women)','Women'
]

const reservedType = ['(res.)', 'reserve']

gametype = {
    ...gametype,
    ...gameTypeEssential
}
reservedKey = [...reservedKey, ...Object.values(gametype).map(name => name.toLowerCase()), ...genderType, ...reservedType]


const utils = {
    gameType: gametype,
    gameTypeEssential:gameTypeEssential,
    reservedKey,

    isReserved(gName1, gName2, lName) {
        let isReserved = reservedType.some(item => {
            let isTeam1Reserved = gName1.toLowerCase().includes(item) || (lName && lName.toLowerCase().includes(item));
            let isTeam2Reserved = gName2.toLowerCase().includes(item) || (lName && lName.toLowerCase().includes(item));
            return isTeam1Reserved || isTeam2Reserved;
        })
        if (isReserved) return 'res';


    },

    getTypeOfGame(gName1, gName2, lName) {
        let isReserved = this.isReserved(gName1, gName2, lName);
        if (isReserved) return isReserved;

        let typeOfTeam1 = this.getTypeOfTeam(gName1);
        let typeOfTeam2 = this.getTypeOfTeam(gName2);
        if (typeOfTeam1 === typeOfTeam2) {
            return typeOfTeam2;
        }

        let isEssential = this.gameTypeEssential[typeOfTeam1] || this.gameTypeEssential[typeOfTeam2];
        if (isEssential) return isEssential;

        return this.gameType.NOT_ACCEPTED;

    },

    getTypeOfTeam(gName) {

        if (gName.includes(gametype.U19)) return gametype.U19;
        if (gName.includes(gametype.U20)) return gametype.U20;
        if (gName.includes(gametype.U21)) return gametype.U21;
        if (gName.includes(gametype.U23)) return gametype.U23;
        if (gName.includes('UAE')) return gametype.DEFAULT;

        if (gName.toLowerCase().includes(gametype.SRL.toLowerCase())) return gametype.NOT_ACCEPTED;
        

        let spGameType = gName.match(/(\()\w+(\))/g);
        if (!spGameType) return gametype.DEFAULT;

        spGameType = spGameType.filter(item => !genderType.includes(item));
        if (spGameType.length == 0) return gametype.DEFAULT;


        return gametype.NOT_ACCEPTED;
    },
    getGenderOfGame(gName1, gName2,lName) {

        let isWomenfromTeamName = genderType.some(item => gName1.toLowerCase().includes(item.toLowerCase()) || gName2.toLowerCase().includes(item.toLowerCase()));
        let isWomenfromLeagueName=genderType.some(item=> lName&&lName.toLowerCase().includes(item.toLowerCase()));
        return isWomenfromTeamName||isWomenfromLeagueName ? 'W' : 'M';
    },

    reArrangeString(str) {

        str = str.toLowerCase().replaceAll('-', ' ').replaceAll("`", "").replaceAll("'", "");
      
        str = utils.replaceSpChar(str);
        str= utils.removeReservedKey(str)
        return str;
    },
    removeReservedKey(str){

        utils.reservedKey.forEach((item)=>{
            str=str.replaceAll(item,'');
        })
         return str;
    },

    replaceSpChar(str) {
        str = str.replaceAll('é', 'e');
        str = str.replaceAll('í', 'i');
        str = str.replaceAll('á', 'a');
        str = str.replaceAll('ã', 'a');
        str = str.replaceAll('ó', 'o');
        str = str.replaceAll('ñ', 'n');
        str = str.replaceAll('ê', 'e');
        str = str.replaceAll('ú', 'u');
        str = str.replaceAll('ç', 'c');
        str = str.replaceAll('à', 'a');
        str = str.replaceAll('ü', 'u');
        str = str.replaceAll('è', 'e');
        return str;
    },
    intersect(arr1, arr2) {




    },

    hasIntersect(arr1, arr2) {
        const intersect = utils.intersect(arr1, arr2);
        return intersect.length !== 0;

    },
    timeFilter(d1, d2, filter) {

        d1.setDate(d1.getDate() + filter);
        return d1 >= d2;
    },

    async wait(timeout) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, timeout);
        })
    },

    isObjectEmpty(obj) {

        return Object.keys(obj).length === 0;
    },
    isObject(obj) {
        return obj && obj.constructor===Object
    },
    DUMANBET: {
        getOddsCatagory(t) {

            return {
                IsHandicap: !(!t.h && !t.IsHandicap),
                isMatchResultMarket: t.idrm || t.IsDefaultResultMarket,
                isOverUnder: !(!t.ou && !t.IsOverUnder),
                isEuropeanHandicap: !(!t.eh && !t.IsEuropeanHandicap),
                visible: !(!t.vis && !t.Visible),
                name: t.name || t.Name,
                hasDescription: t.hasdesc,
                columns: null == t.col ? t.Columns : t.col,
                isHeader: t.IsHeader,
                sportID: t.sp || t.Sport,
                marketCategories: t.cs && t.cs.length > 0 ? t.cs : [t.c],
                isOutrightMarket: t.iso,
            }
        },



    }
}

export default utils;