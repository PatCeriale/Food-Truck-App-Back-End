const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const db = require('../models')


//Review routes
//GET all reviews
router.get("/review", (req, res) => {
    db.Review.find()
      .then((dbReview) => {
        res.json(dbReview);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  //CREATE a review
  router.post("/newreview", (req, res) => {
    db.Review.create(req.body)
      .then((dbReview) => {
        res.json(dbReview);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  //UPDATE a review
  router.put("/review/:id", (req, res) => {
    db.Review.findByIdAndUpdate(req.params.id, req.body)
      .then((dbReview) => {
        res.json(dbReview);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  //DELETE a review
  router.delete("/review/:id", (req, res) => {
    db.Review.deleteOne({ _id: req.params.id })
      .then((dbReview) => {
        res.json(dbReview);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
module.exports = router;