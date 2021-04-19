const mongoose = require('mongoose');
const date = new Date()

const Carts = mongoose.model('MyCarts',{
   
    UserId : {
        type:mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },

    Qty:{
        type: Number,
        default:1
    },

    Product: {
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: 'Product'
    },
    Date: {
        type:String,
        default:date.getDate()
    }

  
})


module.exports = Carts;