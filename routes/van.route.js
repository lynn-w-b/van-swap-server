const { Router } = require("express");
const router = new Router();
const User = require('../models/User.model');
const Van = require('../models/Van.model');
const Swap = require('../models/SwapRequest.model');
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
    User.findByIdAndUpdate(user._id, {van: van._id}, {new:true})
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

router.get('/myvan/:id', (req,res) => {
    console.log(req.params);
    const {id} = req.params;
    Van.findById(id)
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

router.post("/editvan/:id", (req, res) => {
    const { make, model, year, location, about} = req.body;
    console.log("Req.body=", req.body);
    const { id } = req.params;
    console.log("Req.params=", req.params);
    Van.findByIdAndUpdate(id, {make:make, model:model, year:year, location:location, about:about}, {new: true} )
      .then((updatedVan) => {
        console.log("Updated van details:", updatedVan)
        if (!updatedVan) {
          res.status(200).json({
            errorMessage: "Van does not exist",
          });
        } else {
          res.status(200).json({
            updatedVan
          });
        }
      })
      .catch((err) => res.status(500).json({ errorMessage: err }));
  });

  router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    Van.findByIdAndDelete(id)
      .then((response) => res.status(200).json({"success":{"message":"Van successfully deleted"}}))
      .catch((err) => res.status(400).json({ errorMessage: err }));
  });
  
router.get('/allvans', (req, res) => {
    Van.find({})
    .then((vans) => {
        console.log("allvans response:", vans);
        res.status(200).json({vans});
    })
    .catch(err => res.status(400).json({errorMessage: err}))
});

router.get('/details/:id', (req,res) => {
    console.log(req.params);
    const {id} = req.params;
    Van.findById(id).populate('owner')
    .then ((van) => {
        if(!van) {
            res.status(200).json({
                errorMessage: "Error retrieving van details!!",
            });
        } else {
            res.status(200).json({ Van: van });
        }
    })
    .catch((err) => res.status(500).json({errorMessage: err}));
});

router.post('/swaprequest/:id', (req,res) => {
  console.log(req.params);
  const {id} = req.params;
  const {swaprequester, vanowner, startdate, enddate, additionalInfo} = req.body;
  Swap.create({
    swaprequester,
    vanowner, 
    van: id,
    startdate,
    enddate,
    additionalInfo
})
.then((swap) => {
  User.findByIdAndUpdate(vanowner, {swapsreceived: swap._id}, {new:true})
  .then((updatedUser) => {
        User.findByIdAndUpdate(swaprequester, {swapssent: swap._id}, {new:true})
        .then((user) => {
          res.status(200).json({swap:swap})
          .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err)) 
      })
  })
})

module.exports = router;