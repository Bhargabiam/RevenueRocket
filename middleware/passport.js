import { Strategy as localStrategy } from "passport-local";
import { user, userByEmail } from "../db/user/userQuery.js";
import { comparePassword } from "../utils/bcrypt.js";

export default function passportConfig(passport) {
  passport.use(
    new localStrategy(
      { usernameField: "email" },
      async (username, password, cb) => {
        try {
          const findUser = (await userByEmail(username))[0];
          if (!findUser) return cb(null, false, { err: "Incorrect username" });
          const passwordMatch = await comparePassword(
            password,
            findUser.password
          );
          if (!passwordMatch)
            return cb(null, false, { err: "Incorrect password" });
          return cb(null, findUser);
        } catch (err) {
          return cb(err);
        }
      }
    )
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.user_id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const findUser = (await user(id))[0];
      done(null, findUser);
    } catch (err) {
      done(err);
    }
  });
}
