const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

let app = express();
app.use(cors());

app.listen(8888, () => {
    console.log("Listening to port 8888");
});

app.get("/studentsList", async (req,res) =>{
    let studentsArr = await Student.find();
    res.json(studentsArr);
})

let studentSchema = new mongoose.Schema({

    firstName: {
        type: String,
    validate: {
      validator: function(v) {
        return /^[A-Za-z]{1,50}$/.test(v);
      },
      message: props => `${props.value} is not a valid FirstName!`,
    },
    required: [true, 'User firstName required'],
    },

    lastName: {
        type: String,
    validate: {
      validator: function(v) {
        return /^[A-Za-z]{1,50}$/.test(v);
      },
      message: props => `${props.value} is not a valid LastName!`,
    },
    required: [true, 'User lastName required'],
    },

    age: {
        type:Number,
        min:[13,"Too young to create an account"],
        max:[100,"Too late to create an account"],
        required:true
    },

    email: {
        type: String,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`,
    },
    required: [true, 'User email required'],
    },

    batchId: String,

    gender: {
        type:String,
        lowercase:true,
        enum:["male","female"]
    },

    maritalStatus: {
        type:String,
        lowercase:true,
        enum:["single","married"]
    },
});

let Student = new mongoose.model("students",studentSchema,"BRNStudents");


let connectToMDB = async()=>{
    try{
    await mongoose.connect("mongodb+srv://saivijnathitatikonda:saivijnathi@day68-intro-to-mongodb.q4dsd.mongodb.net/BRNDB?retryWrites=true&w=majority&appName=day68-Intro-to-MongoDB");
    console.log("Successfully connected to mongoDB");
    }
    catch(err){
        console.log("Unable to connect to MDB");
    }
};

connectToMDB();