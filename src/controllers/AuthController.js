'use static'

const service = require('../services/AuthService');
const validator = require('../validator/validator');

module.exports = class AuthController {

    static async register(req,res){

        //validate user input
        const validation = validator.validateUser(req.body,
            ['name','email','password']
        );

        if (!validation.isValid){
            return res.status(400).send(validation.errors);
        }

        const data = await service.findByEmail(req.body.email);

        if (data === 500){
            return res.status(500).send({message: 'Error creating user'});
        }else if (data !== undefined && data !== null && data.email !== undefined){

            validation.isValid = false;
            validation.errors = validation.errors.concat({'email':'Email address already taken'});

            return res.status(400).send(validation.errors);
        }

        try{

            const body = await service.save(req.body);

            if (body === 500){
                return res.status(500).send({message: 'Error creating user'});
            }

            return res.status(201).send(body);

        }catch (e) {
            console.log('AuthController->register : '+e);

            return res.status(500).send({message: 'Internal Server error, please try again later'});
        }

    }

    static async login(req,res){

        const validation = validator.validateUser(req.body,
            ['email','password']
        );

        if (!validation.isValid){
            return res.status(400).send(validation.errors);
        }

        try{

            const body = await service.authenticate(req.body.email,req.body.password);

            if(body === 404 || body === 401){
                return res.status(401).send({message: 'Incorrect credentials'});
            }

            return res.status(200).send(body);

        }catch (e) {
            console.log('AuthController->login : '+e);

            return res.status(500).send({message: 'Internal Server error, please try again later'});
        }

    }



}