const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    authProvider: {
        type: String,
        enum: ['google', 'github'],
        required: true
    },
    providerId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        unique: true,
        sparse: true
    },
    avatar: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    }
}, { timestamps: true });


userSchema.statics.findOrCreate = async function(userData) {
    const { authProvider, providerId, email } = userData;
    let user = await this.findOne({ authProvider, providerId });

    if (!user) {
        if (email) {
            const existingUser = await this.findOne({ email });
            if (existingUser) {

                existingUser.authProvider = authProvider;
                existingUser.providerId = providerId;
                existingUser.name = userData.name;
                existingUser.avatar = userData.avatar;
                existingUser.username = userData.username;
                user = await existingUser.save();
                return user;
            }
        }

        user = await this.create(userData);
    }

    return user;
};

module.exports = mongoose.model('User', userSchema);
