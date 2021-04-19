 const express = require('express');
//  const {update} = require('../model/user_model');
 const router = express.Router();
 const { check, validationResult } = require('express-validator');
const User = require('../model/user_model');
const bcryptjs =require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register',[
    check('firstname', "Firstname is required").not().isEmpty(),
    check('lastname', "Lastname is required!").not().isEmpty(),
    check('email', "Invalid email!").isEmail(),
    check('email', "Email is required!").not().isEmpty(),
    check('username', "Username is required!").not().isEmpty(),
    check('password', "Password is required!").not().isEmpty()
    // check('confirmpassword', "Invalid password!").confirmpassword().
    // check('confirmpassword', "Confirm password is required!").not().isEmpty()
], 
function(req,res){
    console.log("helo")
    const errors = validationResult(req);
    if(errors.isEmpty()){
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const address = req.body.address;
        const username = req.body.username;
        const password = req.body.password;
        const userType = req.body.userType;
        
        
        bcryptjs.hash(password, 10, function(err,hash){
            const data = new User({firstname:firstname, lastname:lastname,email:email, address:address, username:username,password:hash, userType: userType})
            data.save()
            .then(function(result){
                //success message with status code
                res.status(201).json({message: "User account registered!", data:result, success: true})
            })
            .catch(function(err){
                res.status(500).json({error: err})
            })
        })
    }
    else{
        //Invalid data from User
        res.status(202).json(errors.array())
    }
})

//lets create a login system
router.post('/login',function(req,res){

    const username = req.body.username;
    const password = req.body.password;
    
    User.findOne({username:username})
    .then(function(accData){
        if(accData===null){
               //email or username not found...
                return res.status(401).json({success:false,message : "Invalid credential!"})    

        }
        //now lets compare the password....
        bcryptjs.compare(password,accData.password,function(err,result){
            if(result===false){
            
                //username correct/ password incorrect
                return res.status(401).json({success:false,message: "Invalid credential!"})
            }
            //now lets generate token
            const token = jwt.sign({accId : accData._id}, 'secretkey');
            res.status(200).json({success:true,token:token, message: "Auth success!!"})
          console.log("hello")

        })
    })
    .catch(function(e){
        res.status(500).json({error : e })
    })
})

router.get('/display',function(req,res){
    User.find().then(function(data){
        res.send(data)
    })
})

//for delete
router.delete('/userdelete/:myid', function(req,res){
    const id = req.params.myid;
    User.deleteOne({_id : id}).then(function(){
        res.send('deleted!!')
    })
})


//for update
router.put('/userupdate/:myid', function(req,res){
    const id = req.params.myid;
    const username = req.body.username;
    const address = req.body.address;
    const firstname = req.body.firstname;

    User.updateMany({_id : id}, {username:username, address:address, firstname:firstname})
    .then(function(){
        res.send('Updated!!')

    })
})



module.exports = router
