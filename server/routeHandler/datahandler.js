const express = require('express');
const mongoose  = require('mongoose');
const router = express.Router();
const DataScemas = require('../schemas/dataScemas');
const Data = new mongoose.model("options", DataScemas);


// get all todo
router.get('/' , async(req, res) => {
    try {
        const data = await Data.find();
        res.status(200).json({
            result: data,
            message: "Option data was send successfully"
        });
    } 
    catch (error) {
        res.status(500).json({error:'There was a Server Side Error!'})
    }
})


// post A todo
router.post('/' , (req, res) => {
    const newData = new Data(req.body)
     newData.save((err) => {
        if(err){
            res.status(500).send({
                error: 'There was a server side error'
            })
        } else {
            res.status(200).json({
                message: 'Option was inserted successfully'
            })
        }
    });
});

// post multiple todos
router.post('/all' , (req, res) => {
    Data.insertMany(req.body, (err) => {
        if(err){
            res.status(500).send({
                error: 'There was a server side error'
            })
        } else {
            res.status(200).json({
                message: 'Option was inserted successfully'
            })
        }
    })
});


module.exports = router;