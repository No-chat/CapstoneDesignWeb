import express from "express";
import mongoose from 'mongoose';
import cors from "cors";

import trafficRouter from './router/traffic.js';
import config from "./config/localMongo.js";
const TRAFFIC_URI = '/api/traffic-infos';
const app = express();

// CORS 방지 미들웨어 적용
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}))

mongoose.connect(config.mongoURI)
.then(() => {console.log("mongoDB connected")})
.catch(console.log)

app.use(TRAFFIC_URI, trafficRouter)

app.get('/', (req, res, next) => {
  res.status(200);
  res.send("Hello");
})

app.listen(8080);