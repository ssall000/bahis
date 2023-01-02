

const map =
{
    'altringham':'altrincham',
    'qpr':'queens park rangers',
    'wa all stars':'legon cities',
    'rtu':'real tamale united',
    'sc kfar qasem':'kafr qasim',
    'doves all stars':'arua hill',
    'ebbsfleed united':'ebbsfleet united',
    'al khlood':'al kholood',
    'al rifaa':'riffa',
    'al hikma':'sagesse',
    'al tadamon':'al tadamun sc',
    'al khoor':'al khor sports',
    'qatar sc':'katar sc',
    'Al Majd':'Al Magd',
    'mostakbl watn':'mostaqbal watan (bayanlar)',
    'bangalore united fc':'bufc',
    'al musannah sc':'al msnaa',
    'al orouba':'al oruba sc',
    'masfoot sports club':'masfut',
    'city football club':'city fc dubai',
    'al i̇ttifak':'ettifaq dammam',
    'al faiha':'al feiha',
    'al faysaly':'al faisaly harmah',
    'al tai':'al taee',
    'al baten':'al batin',
    'al kuveyt sc':'al kuwait',
    'al nasr sc':'al naser sporting club',
    'red arrows':'lee woon jae',
    'hapoel herzelia':'hapoel herzliya f.c.',
    'sc tzeirey taibe':'ms tseirey taybe',
    'Bani Yas (Res.)':'baniyas u21',
    'maccabi herzelia':'maccabi herzliya f.c.',
    'hapoel azur':'hapoel azor',
    'maccabi shaaraim':'maccabi shaarayim f.c.',
    'bani yas (res.)':'baniyas u21',
    'ase alger centre w.':'aseac (bayanlar)',
    'al masria itesalat':'telecom egypt',
    'masr club':'zed',
    'el terasanah':'tersana sc',
    'us bougouni':'bougouba',
    'usck':'usc kita',
    'afe':'afrique football elite',
    'dubba al husun':'dibba al hisn',
    'al hamriyah':'al hamriah',
    'al arabi':'al arabi umm al',
    'al taawoun fc':'al taawon fc',
    'damac':'dhamk',
    'almeira':'ud almeria',
    'sc kfar qasim u19':'kafr qasim u19 ',
    'maccabi hertzliya u19':'maccabi herzliya f.c. u19',
    'al rams':'al ramms mirbih',
    'al jazeera':'al jazira club u21',
    'rennes':'stade rennais f.c.',
    'airdrieonians':'airdrie united',
    'gijon':'sporting de gijón',
    'al arabi umm al':'al arabi umm al quwain',
    'marsilya':'olympique de marseille',
    'brest':'stade brestois',
    'thaon':'thaonnaise',
    'psg':'paris saint germain f.c.',
    'i̇stiklal tahran':'esteghlal f.c.',
    'padideh mashhad':'shahr khodro',
    'zobahan':'zob ahan isfahan f.c.',
    'al adalh fc':'al adalah',
    'maccabi bney reine':'maccabi bnei raina',
    'hapoel kfar saba fc':'37349',
    'малага':'malaga cf',
    'paok thessaloniki b':'p.a.o.k. ii',
    'panseraikos':'panserraikos',
    'ierapetras':'ierapetra',
    'kissamikos':'chania',
    'Lekhwiya':'al duhail',
    'pafos fc':'aep paphos f.c.',
    'al badii':'al budaiya',
    'silla cf':'sylla',
    'l entregu cf':'lentregu cf',
    'inter':'internazionale milano',
    'northeast united fc':'north east united fc',
    'cs esportiva al u20':'cse u20',
    'gremio sao carlense u20':'gd saocarlense u20',
    'guinea':'gine',
    'ce europa':'ce avrupa u19',
    'reina':'raina',
    'al akhdood':'al okhdood',
    'al taawon buraidah u19':'al tadamun sc',
    'al khalidiyah':'al khalidiya',
    'mfm':'mountain of fire and miracles',
    'europa fc':'avrupa fc',
    'hapoel nof hagalil fc':'hapoel nazareth illit fc',
    'rc arbaa':'rc arba',








}

export default {
    get(teamName){
        const mapTeam=map[teamName];
        if(mapTeam) return mapTeam;

        return teamName;
    }
}