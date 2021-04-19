const express = require('express');
const bodyParser = require('body-parser');
const db =require('./database/db');
const cors = require('cors');
const User_route = require('./route/user_route');
const productRoute = require('./route/productRoute');
const carts = require('./route/carts')
const { static } = require('express');



const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
 app.use('/images',static(__dirname+"/images"))
app.use(User_route);
app.use(productRoute);
app.use(carts);




app.listen(90)