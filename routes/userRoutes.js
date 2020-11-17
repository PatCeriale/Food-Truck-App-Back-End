const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const User = require('../models/userModel')

router.post('/signup', (req, res, next) => {
    console.log(req.body);
    User.create(req.body);
    //   create({email: req.body.email})
//       .exec()
//       .then(user => {
//           if (user) {
//               return res.status(409).json({
//                   message: 'email exist'
//               });
//           } else {
              
//           }
//       })
//     bcrypt.hash(req.body.password, 10, (err, hash) => {
//         if (err) {
//             return res.status(500).json ({
//                 error: err
//             });
//         } else {
//             const user = new User({
//                 _id: new mongoose.Types.ObjectId(),
//                 email: req.body.email,
//                 password: hash
//            });
//            user
//            .save()
//            .then(result => {
//                console.log(result);
//                res.status(201).json({
//                    message: 'User created'
//                });
//            })
//            .catch(err => {
//                console.log(err);
//                res.status(500).json({
//                    error: err
//                });
//            });
//         }
//     });

});
    
// const usersController = require ("../controllers/UsersController")
    // router.route("../api/users/login").get(usersController.findOne);
   module.exports = router;