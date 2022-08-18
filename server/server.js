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
  const minSpeed = Number(req.query.minSpeed)
  const maxSpeed = Number(req.query.maxSpeed)
  if(minSpeed === '' || maxSpeed === ''){
    res.status(400).json({
      success: false,
      emsg: 'no requiredSpeed'
    })
  }

  CarValue.find()
  .where('carSpeed').gte(Number(minSpeed)).lte(Number(maxSpeed))
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

// client에서 체크된 _id값에 해당되는 값을 보내주면 그에 맞는 데이터를 db에서 삭제해준다
app.delete('/api/traffic-infos/:_id', (req, res, next) => {
  const deleteId = req.params._id

  CarValue.deleteOne()
  .where('_id').equals(deleteId)
  .then(() => {
    return res.status(200).json({
      success : true,
      msg : 'deleting data complete'
    })
  })
  .catch(() => {
    return res.status(400).json({
      success : false,
      emsg : 'deleting data failed'
    })
  })
  
});




app.listen(8080);