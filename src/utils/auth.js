const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameFiled: "email",
      passwordField: "password",
      passReqToCallback: true,
    },

    async (email, password, done) => {
      try {
        const user = await User.create({ email, password });
        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameFiled: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "user does not exist" });
        }
        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, { message: "user does not exist" });
        }

        return done(null, user, { message: "Loggedin Successfully" });
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JWTStrategy(
    {
      secretOrKey: "MY-SECRET-CODE",
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret-token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);
