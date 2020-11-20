const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const db = require('../models')

//Vendor routes
//GET all vendors
router.get("/vendor", (req, res) => {
    db.Vendor.find()
      .then((dbVendor) => {
        res.json(dbVendor);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  //CREATE new vendor
  router.post("/newvendor", (req, res) => {
    db.Vendor.create(req.body)
      .then((dbVendor) => {
        res.json(dbVendor);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  //UPDATE a vendor
  router.put("/vendor/:id", (req, res) => {
    db.Vendor.findByIdAndUpdate(req.params.id, req.body)
      .then((dbVendor) => {
        res.json(dbVendor);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  //DELETE vendor
  router.delete("/vendor/:id", (req, res) => {
    db.Vendor.deleteOne({ _id: req.params.id })
      .then((dbVendor) => {
        res.json(dbVendor);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  module.exports = router;
