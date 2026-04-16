import cron from 'node-cron';
import fs from 'fs';

console.log("Scheduler 3 Loaded...");

// Running every 10 seconds for testing (change to '* * * * *' for every minute)
cron.schedule('*/10 * * * * *', () => {
  try {
    console.log("Cron job started - Scanning for inactive users...");

    const activePath = './data/active.json';
    const inactivePath = './data/inactive.json';

    if (!fs.existsSync(activePath)) {
      console.error(`Error: ${activePath} not found.`);
      return;
    }

    const data = fs.readFileSync(activePath, 'utf-8');
    const users = JSON.parse(data);

    const inactiveUsers = [];

    for (let i = users.length - 1; i >= 0; i--) {
      if (users[i].status === 'inactive') {
        inactiveUsers.push(users[i]);
        users.splice(i, 1);
      }
    }

    if (inactiveUsers.length > 0) {
      console.log(`Found ${inactiveUsers.length} inactive user(s). Moving them...`);

      // Read existing inactive users
      let currentInactive = [];
      if (fs.existsSync(inactivePath)) {
        try {
          const inactiveData = fs.readFileSync(inactivePath, 'utf-8');
          currentInactive = JSON.parse(inactiveData || '[]');
        } catch (readErr) {
          console.error('Warning: Could not read existing inactive.json, starting fresh.');
        }
      }

      // Merge and save
      const updatedInactive = [...currentInactive, ...inactiveUsers];
      fs.writeFileSync(inactivePath, JSON.stringify(updatedInactive, null, 2));
      fs.writeFileSync(activePath, JSON.stringify(users, null, 2));

      console.log('Inactive users moved successfully');
    } else {
      console.log('No inactive users found.');
    }
  } catch (err) {
    console.error('Error during cron execution:', err.message);
  }
});