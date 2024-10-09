const URL = require("../models/url")
const User = require("../models/user")

async function handleHomeRender(req, res) {


    const allURLs = await URL.find({ createdBy: req.user._id })

    return res.render("home", { urls: allURLs })
}

async function handleAdminHomeRender(req, res) {


    const allURLs = await URL.find({})

    return res.render("home", { urls: allURLs })
}

async function handleSignUpRender(req, res) {

    return res.render("signup")
}
async function handleLoginRender(req, res) {

    return res.render("login")
}



module.exports = {
    handleHomeRender,
    handleAdminHomeRender,
    handleSignUpRender,
    handleLoginRender,

}