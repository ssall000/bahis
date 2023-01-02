const APPDATA = {
    LANGUAGE:'en',
    REQUEST_TIMEOUT:5000,
    COUNT_FOR_FAIL_REQUEST:3,
    DB_URL:'mongodb://localhost:27017/',
    DB_NAME:'bet',
    TIME_FILTER:{
        TODAY:0,
        ONE_DAY:1,
        TWO_DAY:2,
        THREE_DAY:3,
        FOUR_DAY:4,
        FIVE_DAY:5,
        SIX_DAY:6,
        ONE_WEEK:7,
        TWO_WEEK:14,
        THREE_WEEK:21,
        ONE_MOUNT:31   
    },

    DUMANBET: {

        name:'dumanbet',
        BASE_URL: 'https://sportservice.inplaynet.tech/api',
        get TEAMS(){ return `${APPDATA.DUMANBET.BASE_URL}/sport/getheader/teams/${APPDATA.LANGUAGE}`},
        get ALL_GAMES (){ return  `${this.DUMANBET.BASE_URL}/sport/GetGameAll/${this.LANGUAGE}/162/?games=`},
        get FULL_GAME(){ return  `${APPDATA.DUMANBET.BASE_URL}/sport/GetGameFullByGameAndCompany/${APPDATA.LANGUAGE}/162`},
        get PRIVIDERS(){ return  `${APPDATA.DUMANBET.BASE_URL}/sport/GetbettingProviders`},
        get MARKET_CATAGORY(){ return  `${APPDATA.DUMANBET.BASE_URL}/sport/getmarketcategories/${APPDATA.LANGUAGE}`},
        get MATCH_ID(){ return  `${APPDATA.DUMANBET.BASE_URL}/sport/getheader/${APPDATA.LANGUAGE}`},
        get MARKET_POSITIONS(){ return  `${APPDATA.DUMANBET.BASE_URL}/sport/getallmarketsandpositions/${APPDATA.LANGUAGE}`},

        FILTER:{
            FULTBOL:['Futbol','Soccer'],
            ONLINE_LEAGUE:'SRL',
            LOL:['YOSHI','QUAVO','koko'],
            CYBER_LEAGUE:'bluefir3',
            JUDGE_LEAGUE:'judge',
            OTHERS:['rafa','spex','tommy','lio','zeus','general','ALBACK','STDM','zohan','Skripp','aster','johnybegood','poli','gorilla','moic','aibothard','mars','krouks','cliff','herculex','judoka','ray', 'brand', 'apollo','2drots Family', 'Fleshka77', 'Kit', 'rik' ,'Fleshka77']
        }

    },
    BETWINNER: {

        name:'betwinner',
        REDIRECT_URL:'https://rqetrh.top/s/15IQ',
       
        updeteUrls(baseUrl){
            APPDATA.BETWINNER['BASE_URL']= baseUrl,
            APPDATA.BETWINNER['GAMES']=`${APPDATA.BETWINNER.BASE_URL}/service-api/LineFeed/Get1x2_VZip?count=5000&lng=${APPDATA.LANGUAGE}&mode=4&partner=152`;
            APPDATA.BETWINNER['GAME_DATA']=`${APPDATA.BETWINNER.BASE_URL}/service-api/LineFeed/GetGameZip?lng=${APPDATA.LANGUAGE}&cfview=0&isSubGames=true&GroupEvents=true&allEventsGroupSubGames=true&countevents=50000&partner=152&marketType=1&id=`

            APPDATA.BETWINNER['SHORT_ZIP']=`${APPDATA.BETWINNER.BASE_URL}/LineFeed/GetSportsShortZip?sports=1&champs=88637&lng=tr&tf=2200000&tz=3&country=190&partner=152&virtualSports=true&group=342`;
            APPDATA.BETWINNER['HEAD_TO_HEAD']=`${APPDATA.BETWINNER.BASE_URL}/SiteService/HeadToHead?&ln=tr&partner=152&geo=190&gameId=`
            APPDATA.BETWINNER['GAME_TYPE']=`${APPDATA.BETWINNER.BASE_URL}/SubService/api/GetEventTypesByGameId?lng=tr&Source=0&gameId=`
        },

        FILTER:{
            FULTBOL:['Futbol','Football','Soccer']
        }
        

    }


}

export default APPDATA;