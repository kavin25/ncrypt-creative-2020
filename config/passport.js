const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (_accessToken, _refreshToken, profile, done) {
      const {
        id: githubId,
        displayName,
        username,
        emails: [{ value: email }],
        photos: [{ value: photo }],
        _json: { bio, company, location },
      } = profile;

      client.user
        .upsert({
          create: {
            githubId,
            displayName,
            username,
            email,
            photo,
            bio,
            company,
            location,
          },
          update: {
            githubId,
            displayName,
            username,
            email,
            photo,
            bio,
            company,
            location,
          },
          where: { githubId },
        })
        .then((u) => done(null, u))
        .catch((e) => done(e));

      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((token, done) =>
  client.user
    .findOne({ where: { githubId: token } })
    .then((u) =>
      u ? done(null, { ...u, admin: false }) : done("User not found")
    )
    .catch(done)
);
