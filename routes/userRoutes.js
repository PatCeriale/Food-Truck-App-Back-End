const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models");
const User = require("../models/userModel");
const authenticate = require("../middleware/authenticate");
require("dotenv").config();

//check if user is logged in
const checkAuthStatus = (request) => {
  console.log("request headers here!", request.headers);
  if (!request.headers.authorization) {
    return false;
  }

  const token = request.headers.authorization.split(" ")[1];
  console.log("+++++++++++token received+++++++++++");
  const loggedInUser = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, data) => {
      console.log("===========token error=========");

      if (err) {
        console.log("test!!!!!!!!!!", err);

        return false;
      } else {
        console.log(data);
        return data;
      }
    }
  );
  console.log(loggedInUser);
  return loggedInUser;
};

//GET all users
router.get("/user", authenticate, (req, res) => {
  db.User.find()
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
});

//GET one user
router.get("/oneuser", (req, res) => {
  console.log("==========LOGGED IN================");
  const loggedInUser = checkAuthStatus(req);
  console.log(">>>>>>>>LOGGED IN<<<<<<<<<<<<");
  console.log("logged in user", loggedInUser);
  if (!loggedInUser) {
    return res.status(401).send("did it work");
  } else {
    res.json(loggedInUser);
  }

  // db.User.findOne({
  //   _id: loggedInUser._id,
  // })
  //   .then((dbUser) => {
  //     res.json(dbUser);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).send("an error occurred please try again later");
  //   });
});

//POST route to get user data from token
router.post("/userdata", (req, res) => {
  console.log(req.body);
  const token = req.body.token;
  const loggedInUser = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, data) => {
      if (err) {
        console.log("test!!!!!!!!!!", err);

        return false;
      } else {
        // console.log(data);
        return data;
      }
    }
  );
  console.log("WOOOHOO", loggedInUser);
  res.json(loggedInUser);
});

//CREATE new user
router.post("/signup", (req, res) => {
  console.log("i am a new user");
  console.log(req.body);
  db.User.create(req.body)
    .then((dbUser) => {
      console.log("error creating user");
      console.log(dbUser);
      console.log("i am inside of dbUser");

      const myUser = {
        username: dbUser.username,
        email: dbUser.email,
        location: dbUser.location,
        //isAdmin: dbUser.isAdmin,
        _id: dbUser._id,
      };
      let token = jwt.sign(myUser, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10m",
      });
      res.json({
        message: "signup successful",
        token: token,
      });
    })
    .catch((err) => {
      console.log("============================");
      console.log(err);
      console.log("============================");
      res.json(err);
    });
});

//UPDATE a user
router.put("/user/:id", (req, res) => {
  console.log(">>>>>>>>>>>>>>I am inside of dummy user<<<<<<<<<");
  console.log(req.body);

  db.User.findByIdAndUpdate(req.params.id, req.body)
    .then((dbUser) => {
      console.log("====UPDATE=====A======USER=============");
      console.log(req.body);

      res.json(dbUser);
    })
    .catch((err) => {
      console.log("============================");
      res.json(err);
      console.log("============================");
    });
});

// update users favorite vendor
router.put("/updatevendor/:id", (req, res) => {
  db.User.findOneAndUpdate(
    req.params.id,
    { $push: { favoriteVendor: req.body.vendorId } },
    { new: true }
  )
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
});

//DELETE user
router.delete("/user/:id", (req, res) => {
  db.User.deleteOne({ _id: req.params.id })
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Sign In Route
router.post("/signin", (req, res) => {
  console.log("============", req.body);
  db.User.findOne({
    username: req.body.username,
    // password: req.body.password,
  }).then((foundUser) => {
    console.log(foundUser);
    console.log("<<<<<<FOUND USER >>>>>>>>");
    if (!foundUser) {
      console.log("<<<<<<USER NOT FOUND?>>>>>>>>");

      res.status(404).send("user not found");
    }

    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      console.log("+++++++++++++++++++++++");
      console.log(foundUser);
      console.log("+++++++++++++++++++++++");

      const myUser = {
        username: foundUser.username,
        email: foundUser.email,
        location: foundUser.location,
        isAdmin: foundUser.isAdmin,
        _id: foundUser._id,
      };
      let token = jwt.sign(myUser, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10m",
      });
      res.json({
        message: "login successful",
        token: token,
      });
    } else {
      console.log("++++++++SIGN IN ERROR++++++++++++++");

      res.status(403).send("wrong email or password");

      console.log("++++++++SIGN IN ERROR++++++++++++++");
    }
  });
});

module.exports = router;
