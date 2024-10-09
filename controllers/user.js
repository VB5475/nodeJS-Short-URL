const { v4: uuidv4 } = require("uuid")
const User = require("../models/user")
const { setUser } = require("../services/auth")
async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body
    await User.create({
        name,
        email,
        password
    })
    return res.render("home")
}

async function handleUserLogin(req, res) {

    const { email, password } = req.body
    console.log(email)
    console.log(password)
    const user = await User.findOne({ email, password })
    if (!user) return res.render("login", { error: "invalid credentials" })
    // const sessionId = uuidv4() for statefull auth
    // setUser(sessionId, user)
    // res.cookie("uid", sessionId)
    // const token = setUser(user) //jwt method stateless method using cookies
    // res.cookie("uid", token)
    const token = setUser(user) //jwt method stateless method using cookies
    res.cookie("token", token)
    return res.redirect("/")

}
module.exports = {
    handleUserSignUp,
    handleUserLogin
}
