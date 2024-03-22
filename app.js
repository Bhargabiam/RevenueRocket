import express from "express";
import "dotenv/config";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pool from "./config/db.js";
import errorHandler from "./middleware/error.js";
import passport from "passport";
import passportConfig from "./middleware/passport.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const PgSession = connectPgSimple(session);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorHandler);
app.use(express.static("public"));
app.use(
  session({
    store: new PgSession({
      pool: pool,
    }),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 60 * 60 },
  })
);

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);
app.use(routes);

app.listen(PORT, (req, res) => {
  console.log("App listening on port" + PORT);
});
