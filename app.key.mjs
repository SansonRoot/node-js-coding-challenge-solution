'use strict'

import cryptoRandomString from 'crypto-random-string';
import fs from 'fs';
import readline from 'readline';

//read environment variables into an array
const data = fs.readFileSync('.env').toString().split("\n");

const env = {};

//insert into dictionary
data.forEach((d)=>{
    var split = d.split('=');

    //do not add empty rows to array
    if(split[0]!=='') env[split[0]]=split[1];
})

//check if key is already specified, ask for permission from user to override key
if (env.JWT_SECRET !== undefined && env.JWT_SECRET !== ''){

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('App key has already been generated, Do you want to override it ? ( Y/N ) : ',answer => {

        if (answer === 'Y' || answer === 'y' || answer === 'yes' || answer === 'Yes'){

            //override the existing key
            env.JWT_SECRET = cryptoRandomString({length: 100,type: 'base64'});
        }

        writeToFile();

        rl.close();
    })


}else{

    //create a fresh key
    env.JWT_SECRET = cryptoRandomString({length: 100,type: 'base64'});

    writeToFile();
}

function writeToFile() {
//clear the contents of the file
    fs.writeFileSync('.env','');

//write back configuration into .env file
    for (const [key,value] of Object.entries(env)){
        fs.appendFileSync(".env",key+"="+value+"\n");
    }
}

