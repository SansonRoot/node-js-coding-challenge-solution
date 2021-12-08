'use strict'

const User = require('../models/User');

module.exports = class ProfileService{

    static async profile(_id){
        //fetch user from token
       const user = await User.findOne({_id});

       return user;
    }

    static async logout(_id){
        //fetch user from token
        const user = await User.findOne({_id});
        const expire = user.expireToken();

        if (expire) return true;

        return false;
    }

}