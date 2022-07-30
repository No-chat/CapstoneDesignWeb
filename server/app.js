import express from "express";
import cors from "cors";

const app = express();

// CORS 방지 미들웨어 적용
app.use(cors());

app.get('/', (req, res, next) => {
  res.status(200).send("hi");
});

app.listen(8080);