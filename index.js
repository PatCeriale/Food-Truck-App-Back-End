const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

const UsersRoute = require('./routes/users')

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
