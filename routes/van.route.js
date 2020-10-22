const { Router } = require("express");
const router = new Router();
const User = require('../models/User.model');
const Van = require('../models/Van.model')
const Session = require('../models/Session.model');
const mongoose = require('mongoose');

router.get('/allvans', (req, res) => {
    Van.find({})
    .then((vans) => res.render('/allvans', vans))
    .catch(err => res.status(400).json({errorMessage: err}))
})


module.exports = router;