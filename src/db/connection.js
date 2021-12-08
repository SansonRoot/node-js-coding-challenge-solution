'use strict'

require('dotenv').config({path: '.env'});
const connection = require('mongoose');

connection.connect(
  process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (error)=>{
      if (error) console.log('ERROR CONNECTING DB: '+error);

    }
);
