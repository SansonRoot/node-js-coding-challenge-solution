'use strict'

const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port,(err)=>{

    if (err)
        console.log('Error serving app');
    else
        console.log('Serving app at : '+port);

});

