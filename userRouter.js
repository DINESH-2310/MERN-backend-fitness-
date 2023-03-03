const router = require("express").Router();
const User = require('./userSchema');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors =require("cors")

// var corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }

router.post('/register', async (req, res) => {

    try {
        //mail checking
        var emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) {
            return res.status(400).json("email already exist")
            
        }
        //password hash
        var hash = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
        });

        var data = await user.save();
        res.json(data);
    } catch (error) {
        res.status(400).json(error)
    }

});
router.post("/sigin", async (req, res) => {
    try {
        let userData = await User.findOne({ email: req.body.email });
        if (!userData) {
            return res.status(400).json("Email Not register")
        }
        let validPaw = await bcrypt.compare(req.body.password, userData.password)
        if (!validPaw) {
            return res.status(400).json(" increate Password")
        }
        let userToken = jwt.sign({ email: userData.email }, "dinesh");
        res.header('auth', userToken).json(userToken);

    } catch (error) {
        res.status(400).json(error)
        console.log("error it")
    }
})

const validUser =(req,res,next)=>{
    var token=req.header('auth');
    req.token = token;
    next();
}

router.get("/getusers",validUser, async(req,res)=>{
    jwt.verify(req.token,"dinesh", async (err,data)=>{
        if(err){
            res.status(404)
        }
        else{
            const email=req.body;
            const data= await User.findOne({email});
            res.json(data)
        }
    })
   
})















module.exports = router