const express = require("express");
const mongoose=require("mongoose")
const app = express();
const userRouter = require('./userRouter')
const morgan=require("morgan")
const cors=require("cors")

app.use(express.json());
app.use(morgan('dev'));

app.use(cors(
   { origin:"http://localhost:3000",
}));
app.use('/api',userRouter);

var mongodb='mongodb+srv://dineshosthi2310:qjJvUCDr3hmt3aEy@cluster0.y8spak2.mongodb.net/fitpro';
   mongoose.connect(mongodb);
   mongoose.Promise=global.Promise;   
   var db=mongoose.connection;
   db.on('connected',function(){
    console.log("mongoose connected")
   });
   db.on("error",function(err){
    console.log("error program")
   });



app.listen(process.env.PORT || 5000);