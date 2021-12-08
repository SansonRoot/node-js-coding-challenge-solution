'use strict'

const User = require('../models/User');

/*
    Profile service module handles post validated
    business logic, It has the required models injected into it
    This module is fully testable standalone
 */

module.exports = class ProfileService{

    static async profile(_id){
        //fetch user from token
       const user = await User.findOne({_id});

       return user;
    }

    static async logout(_id){
        //fetch user from token
        const user = await User.findOne({_id});
        const expire = await user.expireToken();

        return expire;
    }

}