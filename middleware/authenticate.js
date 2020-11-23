// require("dotenv").config();
const jwt =  require("jsonwebtoken");

// const access = jwt.sign(User, process.env.JWT_KEY)


const authenticate = (req, res, next) => {
try {
    const token = req.headers.authorization.split(" ")[1]
    const decode = jwt.verify(token,  "c--SkX5Hfh")

    req.user = decode
    next()
}
catch(error) {
    res.json({
        message: "Please log in to see this page"
    })
}
}

module.exports = authenticate