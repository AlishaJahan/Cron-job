import express from 'express';
// import task from './scheduler1.js'
import "./scheduler3.js"
import 'dotenv/config';

const app = express();
app.use(express.json());

app.listen(3000, ()=>{
    console.log("App is listening on port 3000");
})

// task();
