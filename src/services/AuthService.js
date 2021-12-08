'use strict'

//allows module access to the .env configs
require('dotenv').config({path: '.env'});
const bcrypt = require('bcrypt');
const User = require('../models/User');

/*
    This Module handles all pre-authentication requests business logic
    Models are injected into this module for use
    This module is injected into the AuthController and is fully testable
    by itself
 */

module.exports = class AuthService{

    static async authenticate(email,password){
        const user = await User.findOne({email});

        if (!user) return 404;

        const check = await bcrypt.compare(password,user.password);

        if (!check) return 401;

        const token = await user.generateToken();

        return {user,token};
    }

    static async save(data){
        const model = new User({
            name: data.name,
            email: data.email,
            password: data.password
        });

        try{
            const user = await model.save();
            const token = await user.generateToken();

            return {user,token};

        }catch (e) {

            console.log('AuthService->save: '+e);

            return 500;
        }
    }

    static async findByEmail(email){
        try{

            const d = User.findOne({email});

            if (d) return d;

            return false;

        }catch (e) {
            console.log('AuthService->findByField: '+e);

            return 500;
        }
    }

}