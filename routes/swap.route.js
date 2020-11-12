const { Router } = require("express");
const router = new Router();
const uploadCloud = require("../config/cloudinary.config");
const User = require("../models/User.model");
const Van = require("../models/Van.model");
const Swap = require("../models/SwapRequest.model");
const Session = require("../models/Session.model");
const mongoose = require("mongoose");

router.post("/swaprequest/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const {
    swaprequester,
    vanowner,
    startdate,
    enddate,
    additionalInfo,
  } = req.body;
  Swap.create({
    swaprequester,
    vanowner,
    van: id,
    startdate,
    enddate,
    additionalInfo,
    accepted: false,
  })
    .then((swap) => {
      console.log("Van swap request successfully created");
      return res.status(200).json({ swap: swap });
    })
    .catch((err) => console.log(err));
});

router.get("/swaprequests/:id", (req, res) => {
  console.log(req.params.id);
  const { id } = req.params;
  Swap.find({ swaprequester: { $eq: id } })
    .then((swaps) => {
      if (!swaps) {
        res.status(200).json({
          errorMessage: "No swap requests found",
        });
      } else {
        res.status(200).json({ Swaps: swaps });
      }
    })
    .catch((err) => res.status(500).json({ errorMessage: err }));
});
router.get("/swapsreceived/:id", (req, res) => {
  console.log(req.params.id);
  const { id } = req.params;
  Swap.find({ vanowner: { $eq: id } })
    .then((swapsgot) => {
      if (!swapsgot) {
        res.status(200).json({
          errorMessage: "No swap requests found",
        });
      } else {
        res.status(200).json({ Swapsgot: swapsgot });
      }
    })
    .catch((err) => res.status(500).json({ errorMessage: err }));
});
module.exports = router;
