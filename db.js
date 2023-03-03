const mongoose=require("mongoose");
var mongoURL = "mongodb+srv://dineshosthi2310:qjJvUCDr3hmt3aEy@cluster0.y8spak2.mongodb.net/mern-pizza"

mongoose.connect(mongoURL,{useUnifiedTopology:true , useNewUrlParser:true})

var db = mongoose.connection
db.on('connected', ()=> {
    console.log('connect success');
})
db.on('error',()=>{
    console.log('please chech the error ');
})
module.exports=mongoose