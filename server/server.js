import express from "express";
import mongoose from 'mongoose';
import cors from "cors";
import bodyParser from "body-parser";

import CarValue from "./model/model.js";
import config from "./config/localMongo.js";

const app = express();

// CORS 방지 미들웨어 적용
app.use(cors());
// bodyparser
app.use(bodyParser.urlencoded({extended: true}))
// 
app.use(bodyParser.json());

mongoose.connect(config.mongoURI)
.then(() => {console.log("mongoDB connected")})
.catch(console.log)

app.get('/', (req, res, next) => {
  res.status(200);
  res.send("Hello");
})

// 모든 data를 조회
app.get('/api/traffic-infos', (req, res, next) => {
  CarValue.find()
  .all()
  .then((data) => {
    return res.status(200).json(data)
  })
  .catch((err) => {
    console.log(err);
    return res.status(400).json({
      success: false,
      emsg : 'falied to load data from db'
    })
  })
});

// client에서 지정한 속도범위 내의 data를 조회
app.get('/api/traffic-infos/speed', (req, res, next) => { 
  
  if(req.query.minSpeed === '' || req.query.maxSpeed === ''){
    res.status(400).json({
      success: false,
      emsg: 'no requiredSpeed'
    })
  }

  CarValue.find()
  .where('carSpeed').gte(Number(req.query.minSpeed)).lte(Number(req.query.maxSpeed))
  .then((data) => {
    if(data.length === 0) {
      return res.status(200).send('No match data')
    }
    return res.status(200).json(data)
  })
  .catch(() => {
    return res.status(400).json({
      success: false,
      emsg: 'failed to load data from db'
    })
  })
});



app.listen(8080);