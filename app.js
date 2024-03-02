import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import router from "./routes/customerRoutes/customerRoutes.js";

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", router);

app.listen(PORT, (req, res) => {
  console.log("App listening on port" + PORT);
});
