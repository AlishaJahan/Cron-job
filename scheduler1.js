import cron from 'node-cron';

const task = () => {
    console.log("Running the first scheduled cron job", new Date());
}

cron.schedule("* * * * *", task);

export default task;