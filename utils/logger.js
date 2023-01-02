

import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';



export default {

    info:(log,...args)=>{
        console.log(`%c ${log} `,' color: #58D68D',...args);

    },
    debug:(log,...arg)=>{
        console.log(`%c ${log} `,' color: #F4D03F',...arg);
    }
    ,
    error:(log,...arg)=>{
        console.log(`%c ${log} `,' color: #E74C3C',...arg);
    }
    ,
    log:(log,...arg)=>{
        console.log(log,...arg);
    },

    fatal:(log,...arg)=>{
        console.log(`%c ${log} `,' color: #641E16',...arg);
    }
}











function configureLogger(logger,fileName){
    logger.configure({
        level: 'verbose',
        transports: [
            new DailyRotateFile({
                filename: `./logs/${fileName}-%DATE%.log`,
                datePattern: 'YYYY-MM-DD-HH',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d'
            }, { flags: 'w' })
        ]
    });
}


function createLogger(fileName, renew=true){

    let opt={}
    if(renew){
        opt= { flags: 'w' }
    }


   const logger= winston.createLogger({
        level: 'info',
        defaultMeta: { service: 'user-service' },
        transports: [
            new winston.transports.File({ filename: `./logs/${fileName}`, options: opt })

        ],
    });

   //configureLogger(logger,fileName);
   return logger;
}




const logger = createLogger('logger');
const matchNotFound = createLogger('comp/matchNotFound');
const betWinnerTeam = createLogger('comp/betWinnerTeam');
const blockedTeam=createLogger('blockedTeam/blockedTeam',false);
//configureLogger(blockedTeam.clear(),'blockedTeam')




