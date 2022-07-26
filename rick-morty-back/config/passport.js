const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
const User = require("../models/user.model");
const passport = require("passport");

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret;

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    const user = await User.findOne({ _id: jwtPayload.data.id });
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  })
);
