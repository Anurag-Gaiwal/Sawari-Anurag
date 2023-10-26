////// THIS IS FOR THE CODE THAT IS REQUIRED FOR THE SRVER.

const fs = require("fs")
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("./../../models/tourModels");

dotenv.config({path: "./config.env"});

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
// console.log(DB);

// It return a promise that is why, "then --> to return an successfull response" & "catch --> To catch error" is used.
mongoose.connect(DB, {
    useNewUrlParser : true ,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB CONNECTION ESTABLISHED');
});

// READ JSON File : 
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

//IMPORT Data into DB: 
const importData = async () => {
    try{
        await Tour.create(tours);
        console.log("Data loaded !!");
    }
    catch(err){
        console.log(err);
    }
    process.exit();
}

//DELETE ALL Data into DB: 
const deleteData = async () => {
    try{
        await Tour.deleteMany();
        console.log("Data DELETED !!");
    }
    catch(err){
        console.log(err);
    }
    process.exit();
}

console.log(process.argv);

if(process.argv[2] === "--import"){
    importData();
}
else if(process.argv[2] === "--delete"){
    deleteData();
}