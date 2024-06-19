const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWVBOZEV5UmI4a0wvUExBQ3dYcnhYUStRUFVPNzVSb1h4SDlPY2hSYWpsTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNUEzMm1CbDNFdHVMN1Q1WklVODBHQ3VUN1FLazRsaDZ4bTFVN2pkOGRHRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVS25zZ2xxZU1mQ2cwL2pFR01hRTNZYitKNEkzcnJ2bnMzUmQwZjE5UzFzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrZG9mTEZBaEZoeWRZS2J3cXQ5SHRxYTcyK2wyNUx5bVNvYjJMU1pOMWg4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNOV3Z2TGhrbW52RVhqTDdYeVI5L2RGV2hPSzRZRXk5cW5oQTVyRjl2bUU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhRNGJyVy9SWWRZd2JHS0luRkd4eUhGTHdnZk1oR1FDbGdiMlBDRmxGM289In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUQvQ2tGL3BYV09XbFRUdG1ka1dranZXdEM5UlBQZEFPYjNCclErMmZYbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieFNidHY5OVRDNFBmM2JJK3NLVEZEUnBWUkF4NG5ZSnFSd0VEK2VGQ3lDZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRLdUZ2RkZrMEwxbjR1bmR3UlM5R0M0eUdiT1kwcHlTZ2duNnZYVXpxd212dzNYci9JVDJDcFNxVDRxSURKd25WYlZoYllvQ3JDS2Z5T2tybUhTQWpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzMsImFkdlNlY3JldEtleSI6InYvbjNtVE9SMlRIRGhUTnJnTllSZ2hMRDVheVBrV05aU1FRY2NYWE9BUjA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlhlVlJuZm5EUTZ5VzNFM2lxUjdWQkEiLCJwaG9uZUlkIjoiNzJlNmI5NjYtN2MyZi00ODI1LTkwMGUtNWNiMDNiNjY3OGZmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkN6VkpUMUhicTlUSlE0YTFvMWpwdzVUbTBmZz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJieklXSVRkRFcxMzFKNG8yY2RaM2lGc1dxTFU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWkFUQ1pQNFMiLCJsYXN0UHJvcEhhc2giOiIxdjRBNmMiLCJtZSI6eyJpZCI6IjIyMTc2MDI2MzYzMTo2M0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLjgqTjg5Djg6njg5Ljg54u8J2QgfCdkKLwnZCc8J2QqPCdkKbwnZCa8J2Qq/CdkK4g8J2QkvCdkKHwnZCo8J2QoPCdkK7wnZCn8J2QmsSrIiwibGlkIjoiODM5NjY3Nzg0MDkxNTk6NjNAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMR0V2OXNIRUtLL3piTUdHQWNnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJnZmRUMFFud1oxTThpOFZTcnlQc1l4QjRMWVgrV042UGJhaFB0U2xKNkVVPSIsImFjY291bnRTaWduYXR1cmUiOiI2Rm5DeXMyN1laWEtBbHUwbU5OYjdpT0FRTkFpa0NMUG9SRnY5V1JjNWU5TzVOc2lMTW1KRERzWFFBVEJ4L3FaSmwzN1BkV3BSelNFaXpIRWFiajJDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNlBPRmE4MG5EZDRhMTNweVl3SWd5MU4vUzZPd2RKaUlYZS9JSE1IVm5lYXdTM0VPUlJYTGdsRmJHNkM0dFN1aDQxcm9FSzZCVVFDUGM5aXI1WW1VaUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMjE3NjAyNjM2MzE6NjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWUgzVTlFSjhHZFRQSXZGVXE4ajdHTVFlQzJGL2xqZWoyMm9UN1VwU2VoRiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxODgzNzE1OCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFNejAifQ==',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "BicomLab-Md",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Zokou_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
