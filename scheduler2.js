import cron from 'node-cron';
import  fs from 'fs';

cron.schedule("* * * * *", ()=>{
    try {
        fs.writeFileSync('logs.txt', '');
        console.log("logs clear");
    } catch (error) {
        console.log(error);
    }
})

