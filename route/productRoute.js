const express = require('express');
const router = express.Router()
const Product = require('../model/product_model');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');



router.post('/product/insert',upload.single('dimage'),function(req,res, next){
  
// console.log(req.file);
    const dimage = req.file.filename;
    const dname = req.body.dname;
    const ddetails = req.body.ddetails;
    const dprice = req.body.dprice;
    
    if(req.file == undefined)
    {
        res.status(401).json({"success":false,"message":"Invalid File"})
    }
    else
    {
        const Productdata = new Product({ dimage : dimage,dname: dname, ddetails: ddetails, dprice: dprice})
    Productdata.save()

    .then(function(result){
        res.status(201).json({message : "product inserted!!", success: true, data: result})
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
    }
    
})

//Update
// id - updated data from user
router.put('/product/update/:id', function(req,res){
    const dimage = req.body.dimage;
    const dname = req.body.dname;
    const ddetails = req.body.ddetails;
    const dprice = req.body.dprice;
    const id = req.body.id;
    Product.updateOne({_id : id}, {
        //dimage : dimage,
        dname : dname,
        ddetails : ddetails,
        dprice : dprice
      
    })
    .then (function(result){
        res.status(200).json({"success":true })
        //  res.status(200).json({message : "Updated!!"})
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
})



//Delete
router.delete('/product/delete/:id', function(req,res){
    const id = req.params.id;
    Product.deleteOne({_id : id})
    .then(function(result){
        res.status(200).json({message : "Deleted!!"})
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
})

router.get('/product/showall', function(req,res){
    Product.find()
    .then(function(data){
        console.log(data)
        res.status(200).json({success: true, data: data})
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
})

router.get('/product/single/:id', function(req,res){
    const id = req.params.id;
    Product.findOne({_id : id})
    .then(function(data){
        res.status(200).json(data)
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
})
module.exports = router;