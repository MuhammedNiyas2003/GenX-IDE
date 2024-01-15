import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import compilerRouter from "./routes/compiler.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", async (req, res) => {
  res.send("GenX backend");
});

//routes
app.use("/api/compiler", compilerRouter);

//db connection
mongoose.set("strictQuery", true);
mongoose
  .connect(
    process.env.MONGODB_URL || {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`server port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(`${err} : did not connect`));
