const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  vendorId: {
    type: String,
  },

  reviewText: {
    type: String,
  },

  rating: {
    type: Number,
  },
  reviewCreated: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
