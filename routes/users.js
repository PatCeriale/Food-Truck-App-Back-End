const router = require ("express").Router

const usersController = require ("../controllers/UsersController")
router.route("../api/users/login").get(usersController.findOne);