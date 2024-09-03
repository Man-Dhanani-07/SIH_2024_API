const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const db = require('./Database/db');
const router = express.Router();
const model = require('./Models/data')
const PORT = process.env.PORT || 3000;


const addproduct = require('./Routes/addproduct');


app.use(bodyParser.json());

app.use('/addproduct',addproduct);

app.get('/',(req,res)=>{
    res.json({msg:"Welcome, Welcome, Bhale Padhara"});
})


app.listen(PORT, ()=>{
    console.log("Listing on port 3000...");
})