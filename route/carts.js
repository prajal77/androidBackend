const express = require('express');
const router = express.Router()
const MyCarts = require('../model/carts');
const {verifyUser} = require('../middleware/auth');
const upload = require('../middleware/upload');


router.post('/product/book/',verifyUser, function(req,res){
    // router.post('/tours/insert',upload.single('dimage'),function(req,res, next){
    // console.log("Asdasdasdasdasd")  
    console.log(req.User._id)
   // console.log(req.body.Destination)


    const Carts = new MyCarts({
            UserId:req.User._id,
            Product:req.body._id,
            Qty:req.body.Qty
        })
    Carts.save().then(function(result){
            res.status(200).json({
                success:true, message:"Booked One product"
            })
        })
    })
    

router.get('/UserBooking/showall',verifyUser,function(req,res){
    // console.log(req.User._id)
    MyCarts.find({UserId:req.User._id})
    .populate("Product")
    .then((function(data){
        console.log(data)
        res.status(200).json({ success :true,data:data})
    }))

    })

    
//delete 
router.delete("/Mycarts/delete/:id",verifyUser,function (req, res) {
      const id = req.params.id;
      MyCarts.deleteOne({ _id: id })
        .then(function (result) {
          res.status(200).json({ success : true, message: "Product deleted" });
        })
        .catch(function (err) {
          res.status(500).json({ error: err });
        });
    }
  );
   //Update
// id - updated data from user
router.put('/Mycarts/update/:id',verifyUser, function(req,res){
  const id = req.params.id;
  const Qty = req.body.Qty;
  console.log(Qty)
  MyCarts.updateOne({_id : id}, {
      Qty : Qty
  })
  .then (function(result){
    console.log("success")
      res.status(200).json({success : true})
  })
  .catch(function(e){
      console.log("err")
      res.status(500).json({error : e})
  })
})


module.exports = router