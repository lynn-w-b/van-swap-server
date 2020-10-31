// routes/auth.routes.js

const { Router } = require("express");
const router = new Router();
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/User.model");
const Session = require("../models/Session.model");
const mongoose = require("mongoose");

////////////////////////////////////////////////////////////////////////
///////////////////////////// SIGNUP //////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .post() route ==> to process form data
router.post("/signup", (req, res, next) => {
  const { fullname, email, password, dateofbirth, location, about } = req.body;
  console.log(req.body);
  if (!fullname || !email || !password || !dateofbirth || !location || !about) {
    res.status(200).json({
      errorMessage:
        "All fields are mandatory. Please provide your full name, email, password, date of birth, location and about information.",
    });
    return;
  }

  // make sure passwords are strong:

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(200).json({
      errorMessage:
        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        // username: username
        fullname,
        email,
        // password => this is the key from the User model
        //     ^
        //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
        password: hashedPassword,
        dateofbirth,
        location,
        about
      });
    })
    .then((user) => {
      Session.create({
        userId: user._id,
        createdAt: Date.now()
      }).then((session) => {
        console.log(
          `Session created successfully, accesstoken ${session._id}, user ${user}}`
        );
        res.status(200).json({ accessToken: session._id, user: user, van: user.populate("van")});
      });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(200).json({ errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(200).json({
          errorMessage: "Email must be unique. Email is already in use.",
        });
      } else {
        res.status(500).json({ errorMessage: error });
      }
    }); // close .catch()
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// LOGIN ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .post() login route ==> to process form data
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  console.log("Req.body=", req.body);
  if (email === "" || password === "") {
    res.status(500).json({
      errorMessage: "Please enter both email and password to login.",
    });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(200).json({
          errorMessage: "Email is not registered. Try with another email.",
        });
        return;
      } else if (bcryptjs.compareSync(password, user.password)) {
        Session.create({
          userId: user._id,
          createdAt: Date.now(),
        }).then((session) => {
          res.status(200).json({ accessToken: session._id, user: user, van: user.populate("van")});
          });
      } else {
        res.status(200).json({ errorMessage: "Incorrect password." });
      }
    })
    .catch((error) => res.status(500).json({ errorMessage: err }));
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// LOGOUT ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

router.post("/logout", (req, res) => {
  console.log("This will kill the session");
  Session.findOne({ userId: req.body.accessToken })
    .then((test1) => {
      console.log(test1);
      Session.deleteOne({
        userId: req.body.accessToken,
      }).then((session) => {
        console.log(session);
        Session.findOne({ userId: req.body.accessToken }).then((test2) => {
          console.log(test2);
          res.status(200).json({ success: "User was logged out" });
        });
      });
    })
    .catch((error) => res.status(500).json({ errorMessage: error }));
});

router.get("/session/:accessToken", (req, res) => {
  const { accessToken } = req.params;
  console.log("This is looking for the access token", accessToken);
  Session.findById({ _id: accessToken })
    .populate("userId")
    .then((session) => {
      if (!session) {
        res.status(200).json({
          errorMessage: "Session does not exist",
        });
      } else {
        res.status(200).json({ session });
      }
    })
    .catch((err) => res.status(500).json({ errorMessage: err }));
});

router.get("/profile/:id", (req, res) => {
  Session.findById({ userId: req.body.accessToken })
    .then((session) => {
      if (!session) {
        res.status(200).json({
          errorMessage: "Session does not exist",
        });
      }
    })
    .catch((err) => res.status(500).json({ errorMessage: err }));
});

router.get("/profile/edit/:id", (req, res) => {
  Session.findById({ userId: req.body.accessToken })
    .then((session) => {
      if (!session) {
        res.status(200).json({
          errorMessage: "Session does not exist",
        });
      }
    })
    .catch((err) => res.status(500).json({ errorMessage: err }));
});

router.put("/profile/edit/:id", (req, res) => {
  const { username, email, password, about, image } = req.body;
  const id = req.params.id;
  User.findByIdAndUpdate(
    { id },
    { username, email, password, about, image },
    { new: true }
  )
    .then((foundUser) => {
      res.render(`/profile/:${id}`, foundUser);
    })
    .catch((err) => res.status(500).json({ errorMessage: err }));
});

router.delete("/profile/delete/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then(res.render("/"))
    .catch((err) => res.status(400).json({ errorMessage: err }));
});

module.exports = router;
