import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import session from "express-session";
import errorHandler from "./middleware/error.js";

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);
app.use(errorHandler);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, maxAge: 60000 },
  })
);

app.listen(PORT, (req, res) => {
  console.log("App listening on port" + PORT);
});
