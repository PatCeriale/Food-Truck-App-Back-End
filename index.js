const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require ("cors");
const bcrypt = require("bcrypt");

const db = require("./models");
const { User } = require("./models");

const PORT = process.env.PORT || 5000;

// const User = require("./Models/userModel.js");
const app = express();

app.use(logger("dev"));

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/foodtruck", { useNewUrlParser: true });


// //Sign In Route
// app.post("/signin", (req, res)=>{
//   db.User.findOne({
//     where: {
//       email: req.body.email
//     }
//   }).then(foundUser=>{
//     if(!foundUser){
//      return res.status(404).send("user not found")
//     }
//     if(bcrypt.compareSync(req.body.password, foundUser.password)) {
//       return res.status(200).send("log in successful")
//     } else {
//       return res.status(403).send("wrong email or password")
//     }
//   })
// });





//User routes 
//GET all users
app.get("/", (req, res) => {
    db.User.find()
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});
 
//CREATE new user
app.post("/newuser", (req, res)=>{
    db.User.create(req.body).then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
})

//UPDATE a user
app.put("/user/:id", (req, res)=>{
  db.User.findByIdAndUpdate(req.params.id,
    req.body
  ).then(dbUser => {
    res.json(dbUser);
  })
  .catch(err => {
    res.json(err);
  })
  });

  // update users favorite vendor 
  app.put("/updatevendor/:id", (req, res) => {
  db.User.findOneAndUpdate(req.params.id, { $push: { favoriteVendor: req.body.vendorId } }, { new: true })
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  });

//DELETE user
app.delete("/user/:id", (req, res) => {
  db.User.deleteOne({_id: req.params.id})
  .then(dbUser => {
    res.json(dbUser);
  })
  .catch(err => {
    res.json(err);
  });
});




//Vendor routes
//GET all vendors
app.get("/vendor", (req, res) => {
    db.Vendor.find()
    .then(dbVendor => {
      res.json(dbVendor);
    })
    .catch(err => {
      res.json(err);
    });
});


//CREATE new vendor
app.post("/newvendor", (req, res)=>{
    db.Vendor.create(req.body).then(dbVendor => {
        res.json(dbVendor);
      })
      .catch(err => {
        res.json(err);
      });
})


//UPDATE a vendor
app.put("/vendor/:id", (req, res)=>{
  db.Vendor.findByIdAndUpdate(req.params.id,
    req.body
  ).then(dbVendor => {
    res.json(dbVendor);
  })
  .catch(err => {
    res.json(err);
  })
  });

//DELETE vendor
app.delete("/vendor/:id", (req, res) => {
  db.Vendor.deleteOne(
    
    {_id: req.params.id}

  )
  .then(dbVendor => {
    res.json(dbVendor);
  })
  .catch(err => {
    res.json(err);
  });
});

//Review routes
//GET all reviews
app.get("/review", (req, res) => {
    db.Review.find()
    .then(dbReview => {
      res.json(dbReview);
    })
    .catch(err => {
      res.json(err);
    });
});

//CREATE a review
app.post("/newreview", (req, res)=>{
    db.Review.create(req.body).then(dbReview => {
        res.json(dbReview);
      })
      .catch(err => {
        res.json(err);
      });
})


//UPDATE a review
app.put("/review/:id", (req, res)=>{
db.Review.findByIdAndUpdate(req.params.id,
  req.body
).then(dbReview => {
  res.json(dbReview);
})
.catch(err => {
  res.json(err);
})
});


//DELETE a review
app.delete("/review/:id", (req, res) => {
  db.Review.deleteOne({_id: req.params.id})
  .then(dbReview => {
    res.json(dbReview);
  })
  .catch(err => {
    res.json(err);
  });
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
