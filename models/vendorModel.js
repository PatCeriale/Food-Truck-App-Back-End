const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VendorSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is Required",
  },
  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    validate: [({ length }) => length >= 6, "Password should be longer."],
  },
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
  },
  userCreated: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: Number
  },
  website: {
    type: String
  },
});

const Vendor = mongoose.model("Vendor", VendorSchema);

module.exports = Vendor;
