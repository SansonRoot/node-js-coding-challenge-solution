'use strict'

require('dotenv').config({path: '.env'});
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    id: {

    },
    name: {
        type: String,
        required: true,
        max: 100
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    _token: {
        type: String
    }

},{
    timestamps: true
});

// Hash password before saving user
userSchema.pre('save',async function (next) {

    const user = this;

    if (user.isModified('password')){

        user.password = await bcrypt.hash(user.password,parseInt(process.env.HASH_ROUNDS));
    }

    next();
});

//create method to generate generate token
userSchema.method('generateToken',async function () {

    const user = this;

    if (!user) return new Error('User resource not found');

    const token = await jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET);

    user._token = token;

    await user.save();

    return token;

})

userSchema.method('expireToken',async function () {

    const user = this;

    user._token = await jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET,{expiresIn: 1});

    await user.save();

    return true;

})

module.exports = mongoose.model('User',userSchema);