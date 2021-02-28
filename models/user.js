const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email:    { 
        type: String, 
        required: [true, 'Please enter an email'], 
        unique: true, 
        lowercase: true,
        validate: [isEmail, 'Please enter valid email']
    },
    password: { 
        type: String, 
        required: [true, 'Please enter a password'], 
        minlength: [6, 'Minimum password length is 6 characters'] 
    }
});

// fire a function before doc is saved to the database
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    
    next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
    // try to find a user with the given email in the UserSchema
    const user = await this.findOne({ email });
    if (user) {
        // compare the user's password to the given password
        const auth = await bcrypt.compare(password, user.password);
        if (auth)
            return user;

        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const User = mongoose.model('user', userSchema);

module.exports = User;