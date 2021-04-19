const mongoose = require('mongoose');

const Product = mongoose.model('Product',{
    dimage : {
        type : String
    },
    dname : {
        type: String
    },
    ddetails: {
        type: String
    },
    dprice: {
        type: String
    }
  
})


module.exports = Product;