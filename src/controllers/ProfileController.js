
'use static'

const service = require('../services/ProfileService');

/*

 */
module.exports = class ProfileController {

    static async profile(req,res){

        try{

            const user = await service.profile(req.body._id);

            if (!user) return res.status(404).send({message: 'Profile not found'});

            return res.status(200).send(user);

        }catch (e) {
            console.log('ProfileController->profile: '+e);

            return res.status(500).send({message: 'Internal server error, please try again'});

        }

    }

    static async logout(req,res){
        try{

            const loggedOut = await service.logout(req.body._id);

            if (loggedOut){
                return res.status(200).send({message: 'Success'});
            }

            return res.status(500).send({message: 'Internal server error, please try again'});

        }catch (e) {
            console.log('ProfileController->logout: '+e);
            return res.status(500).send({message: 'Internal server error, please try again'});
        }
    }


}