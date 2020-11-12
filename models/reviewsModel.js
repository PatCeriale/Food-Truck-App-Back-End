const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  userId: {
    type: Number
  },
  vendorId: {
    type: Number
  },

  reviewText: {
    type: String,
  },

  rating: {
    type: Number
  },
  reviewCreated: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
