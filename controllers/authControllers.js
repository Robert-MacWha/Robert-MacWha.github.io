const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { dbURI, authToken } = require('./keys');

// handel errors
const handelErrors = (err) => {
    let errors = { email: '', password: '' };

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    // duplicate email error code
    if (err.code === 11000)
        errors.email = 'Email is already registered';

    // incorrect email
    if (err.message === 'incorrect email')
        errors.email = 'That email is not registered';

    if (err.message === 'incorrect password')
        errors.password = 'The email and password do not match';

    return errors;
}

const maxAge = 3 * 24 * 60 * 60;  // time in seconds

const createToken = (id) => {
    // use same string as authMiddleware.js > checkUser
    return jwt.sign({ id }, authToken, {
        expiresIn: maxAge
    });
}

const signupGet = (req, res) => {
    res.render('auth/signup', {admin: false});
}

const signupPost = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);

        res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge * 1000});
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors = handelErrors(err);
        res.status(400).json({ errors });
    }
}

const loginGet = (req, res) => {
    res.render('auth/login', {admin: false});
}

const loginPost = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);

        // gives the user a cookie that can be used to authenticate them - expires in maxAge seconds
        res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge * 1000});
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        const errors = handelErrors(err);
        res.status(400).json({ errors });
    }
}

const logoutGet = (req, res) => {
    // delete the jwt cookie from the user's browser (sets it to a blank cookie that expires in 1ms)
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}

module.exports = { signupGet, signupPost, loginGet, loginPost, logoutGet };