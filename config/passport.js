const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://byu-project2-crud.onrender.com/auth/google/callback",
    scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOrCreate({
            authProvider: 'google',
            providerId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value
        });
        done(null, user);
    } catch (error) {
        console.error('Error in Google strategy:', error);
        done(error, null);
    }
}));


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "https://byu-project2-crud.onrender.com/auth/github/callback",
    scope: ['read:user']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
        if (!email) {
            email = profile._json.email || null;
        }

        const user = await User.findOrCreate({
            authProvider: 'github',
            providerId: profile.id,
            name: profile.displayName || profile.username,
            email: email,
            avatar: profile.photos ? profile.photos[0].value : profile._json.avatar_url,
            username: profile.username
        });
        done(null, user);
    } catch (error) {
        console.error('Error in Google strategy:', error);
        done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    console.log('Serializing user:', user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        console.log('Deserializing user ID:', id);
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;