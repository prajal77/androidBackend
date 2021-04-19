const jwt = require('jsonwebtoken');
const { find } =require('../model/user_model');
const User = require('../model/user_model');

//guard
module.exports.verifyUser = function(req,res, next){

    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        const UserData = jwt.verify(token, 'secretkey')
        console.log(UserData)
        User.findOne({ _id : UserData.accId})
        .then(function(result){
            // res.send("auth success")
            req.User = result;
            // req.UserRegistration = result;
            next();
        })
        .catch(function(e){
            res.status(500).json({ message : "auth faileddhdhd"})
        })
    
    }
    catch(err){
        res.status(401).json({message : "auth failed"})
    }
   
}

//next guard
module.exports.verifyAdmin = function(req,res,next){
    if(!req.User){
        return res.status(401).json({message : "Unauthorized User!"})
    }
    else if(req.User.userType !== 'Admin'){
        return res.status(401).json({message : "Unauthorized user"})
    }
    next();
}