const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "Username is Required",
  },
  email: {
    type: String,
    // unique: true,
    // match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
  },
  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    validate: [({ length }) => length >= 6, "Password should be longer."],
  },
  isAdmin: {
    type: Boolean,
  },
  location: {
    type: String,
  },
  favoriteVendor: [
    {
      type:Schema.Types.ObjectId,
      ref:"Vendor"
    }
  ],
  userCreated: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
  },

});

UserSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
  })


bcrypt.hash(user.password, salt, function (err, hash) {
  if (err) return next(err);
  // override the cleartext password with the hashed one
  user.password = hash;
  next();
});

})

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};


const User = mongoose.model("User", UserSchema);

module.exports = User;
