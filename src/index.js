/**
 * Author: Nilanga Virajith
 */

import express from "express";
import errorHandler from "./common/errorHandler.js";
import router from "./routes/index.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use("/api", router);

app.use(errorHandler());

app.listen(5000, () => {
  console.log("Listening on port " + 5000);
});
