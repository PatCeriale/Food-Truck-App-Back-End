const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");


const db = require("./models");

const PORT = process.env.PORT || 3000;

// const User = require("./Models/userModel.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/foodtruck", { useNewUrlParser: true });

//User routes
app.get("/", (req, res) => {
    db.User.find()
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/", (req, res)=>{
    db.User.create(req.body).then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
})

//Vendor routes
app.get("/vendor", (req, res) => {
    db.Vendor.find()
    .then(dbVendor => {
      res.json(dbVendor);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/newvendor", (req, res)=>{
  console.log("inside post req");
    db.Vendor.create(req.body).then(dbVendor => {
        res.json(dbVendor);
      })
      .catch(err => {
        res.json(err);
      });
})

//Review routes
app.get("/review", (req, res) => {
    db.Review.find()
    .then(dbReview => {
      res.json(dbReview);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/newreview", (req, res)=>{
    db.Review.create(req.body).then(dbReview => {
        res.json(dbReview);
      })
      .catch(err => {
        res.json(err);
      });
})


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
