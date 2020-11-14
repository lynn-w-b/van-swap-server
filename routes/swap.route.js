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
    decision: "Pending Approval",
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

router.get("/swapsdetails/:id", (req, res) => {
  console.log(req.params.id);
  const { id } = req.params;
  Swap.findById(id)
    .populate([
      { path: "swaprequester", populate: { path: "van" } },
      { path: "vanowner"},
      { path: "van" },
    ])
    .then((swap) => {
      if (!swap) {
        res.status(200).json({
          errorMessage: "No swap requests found",
        });
      } else {
        res
          .status(200)
          .json({
            Swap: swap,
            Swaprequester: swap.swaprequester,
            Vanowner: swap.vanowner,
            Vantoswap: swap.swaprequester.van,
            Van: swap.van,
          });
      }
    })
    .catch((err) => res.status(500).json({ errorMessage: err }));
});

router.post("/editswap/:id", (req, res) => {
    const  {decision}  = req.body;
    console.log("Req.body=", req.body);
    const { id } = req.params;
    console.log("Req.params=", req.params);
    Swap.findByIdAndUpdate(id, {decision: decision},{ new: true })
      .then((updatedSwap) => {
        console.log("Updated swap details:", updatedSwap);
        if (!updatedSwap) {
          res.status(200).json({
            errorMessage: "Swap does not exist",
          });
        } else {
          res.status(200).json({
            updatedSwap,
          });
        }
      })
      .catch((err) => res.status(500).json({ errorMessage: err }));
  });
module.exports = router;
