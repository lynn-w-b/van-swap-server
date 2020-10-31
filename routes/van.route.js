const { Router } = require("express");
const router = new Router();
const User = require('../models/User.model');
const Van = require('../models/Van.model')
const Session = require('../models/Session.model');
const mongoose = require('mongoose');

router.post('/newvan', (req,res) => {
    const {user, make, model, year, location, about} = req.body;
    Van.create({
        make,
        model,
        year,
        location,
        about, 
        owner: user._id
    })
    .then((van) => {
    User.findByIdAndUpdate(user._id, {van: van._id})
    .then((updatedUser) => {
        console.log(`New van created successfully, van details: ${van} and added to user details:${updatedUser}`);
        res.status(200).json({van: van});
    });
    })
    .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          res.status(200).json({ errorMessage: error.message });
        } else {
          res.status(500).json({ errorMessage: error });
        }
        });
    });

router.get('/myvan:id', (req,res) => {
    const {id} = req.params;
    Van.findById({_id: id })
    .then ((van) => {
        if(!van) {
            res.status(200).json({
                errorMessage: "User does not yet have a van!!",
            });
        } else {
            res.status(200).json({ Van: van });
        }
    })
    .catch((err) => res.status(500).json({errorMessage: err}));
});
  
router.get('/allvans', (req, res) => {
    Van.find({})
    .then((vans) => res.render('/allvans', vans))
    .catch(err => res.status(400).json({errorMessage: err}))
});

module.exports = router;