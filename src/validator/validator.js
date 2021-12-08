'use strict'

const validator = require('validator');

module.exports = class Validator {

    static validateUser(data,fields){

        let isValid = true;
        let errors = [];

        //name field validation
        if(fields.includes('name')) {
            if (data.name === undefined || validator.isEmpty(data.name)) {
                isValid = false;
                errors.push({'name': 'Name is required'});
            } else if (data.name.length > 100) {
                isValid = false;
                errors.push({'name': 'Name cannot be longer than 100 characters'});
            }
        }

        //email field validation
        if (fields.includes('email')){
            if (data.email === undefined || validator.isEmpty(data.email)) {

                isValid = false;
                errors.push({'email': 'Email address is required'});

            } else if (!validator.isEmail(data.email)) {
                isValid = false;
                errors.push({'email': 'Please provide a valid email address'});
            }
        }

        //password field validation
        if (fields.includes('password')){
            if (data.password === undefined || validator.isEmpty(data.password)) {

                isValid = false;
                errors.push({'password': 'Password is required'});

            }
        }

        return {
            isValid,
            errors
        };

    }

}