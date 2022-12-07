const express = require('express');
const mongoose  = require('mongoose');
const router = express.Router();
const UserScemas = require('../schemas/userScemas');
const Data = new mongoose.model("taskUser", UserScemas);


// get all user
router.get('/user' , async(req, res) => {
    try {
        const data = await Data.find();
        res.status(200).json({
            result: data,
            message: "User was send successfully"
        });
    } 
    catch (error) {
        res.status(500).json({error:'There was a Server Side Error!'})
    }
})


// post A user
router.post('/user' , (req, res) => {
    const newData = new Data(req.body)
     newData.save((err) => {
        if(err){
            res.status(500).send({
                error: 'There was a server side error'
            })
        } else {
            res.status(200).json({
                retsult: newData,
                message: 'User was inserted successfully'
            })
        }
    });
});

// post multiple user
router.post('/alluser' , (req, res) => {
    Data.insertMany(req.body, (err) => {
        if(err){
            res.status(500).send({
                error: 'There was a server side error'
            })
        } else {
            res.status(200).json({
                message: 'User was inserted successfully'
            })
        }
    })
});

// get a user
router.get('/:id' , async(req, res) => {
    try {
        const data = await Data.find({ _id: req.params.id});
        res.status(200).json({
            result: data,
            message: "Uesr was send successfully"
        });
    } 
    catch (error) {
        res.status(500).json({error:'There was a Server Side Error!'})
    }
});


// put user

router.put('/user/:id' , async (req, res) => {
    try {
      const result = await Data.findByIdAndUpdate({ _id: req.params.id }, { $set: 
        {
            checked: req.body.checked,
            name: req.body.name,
            optionValue: req.body.optionValue,           
        }
    }, { new: true, useFindAndModify: false });
    
      res.status(200).json({
        result: result,
        message: "User Was Update successfully!"});
    } catch (error) {
      res.status(500).json({error:'There was a Server Side Error!'})
    }

  });


module.exports = router;