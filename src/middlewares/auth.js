'use strict'

require('dotenv').config({path: '.env'});
const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{

    const bearerToken = req.headers.authorization;

    if (bearerToken === undefined) return res.status(401).send({message: 'Unauthorized access'});

    try{

        const tokenSplit = bearerToken.split(' ');

        const decoded =jwt.verify(tokenSplit[1],process.env.JWT_SECRET);


        if (!decoded) return res.status(401).send({message: 'Unauthorized access'});

        req.body._id = decoded._id;

        next();

    }catch (e) {
        console.log('AuthMiddleware: decoded '+e);
        return res.status(401).send({message: 'Unauthorized access'});
    }

}