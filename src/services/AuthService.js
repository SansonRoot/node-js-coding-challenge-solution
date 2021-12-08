'use strict'

require('dotenv').config({path: '.env'});
const bcrypt = require('bcrypt');
const User = require('../models/User');

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
        const user = new User({
            name: data.name,
            email: data.email,
            password: data.password
        });

        try{
            const saved = await user.save();
            const token = await user.generateToken();

            return {user: saved,token};

        }catch (e) {

            console.log('AuthService->save: '+e);

            return 500;
        }
    }

    static async findByEmail(value){
        try{

            const d = User.findOne({email:value});

            if (d) return d;

            return false;

        }catch (e) {
            console.log('AuthService->findByField: '+e);

            return 500;
        }
    }

}