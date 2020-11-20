const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const db = require("../models");

//GET all users
router.get("/user", (req, res) => {
  db.User.find()
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
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

      res.json(dbUser);
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
  console.log("==================");
  db.User.findOne({
    username: req.body.username,
    // password: req.body.password,
  }).then((foundUser) => {
    console.log(foundUser)
    console.log("<<<<<<FOUND USER >>>>>>>>");
    if (!foundUser) {
      console.log("<<<<<<USER NOT FOUND?>>>>>>>>");

      res.status(404).send("user not found");
    }
    // if(bcrypt.compareSync(req.body.password, foundUser.password)) {
    //   return res.status(200).send("log in successful")
    // }
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      console.log("+++++++++++++++++++++++");
      console.log(foundUser);
      console.log("+++++++++++++++++++++++");

      res.status(200).json(foundUser);
    } else {
      console.log("++++++++SIGN IN ERROR++++++++++++++");

      res.status(403).send("wrong email or password");

      console.log("++++++++SIGN IN ERROR++++++++++++++");
    }
  });
});

//User Logout route
router.get("/logout", (req, res) => {
  console.log("you are logged out");
  req.logout();
  console.log("you are logged out");
});

module.exports = router;
