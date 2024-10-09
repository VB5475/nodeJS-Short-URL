const express = require('express')
const { connectToMongoDB } = require("./connect")
const path = require("path")
const cookieParser = require("cookie-parser")
const { checkForAuthentication, restrictTo } = require("./middlewares/auth")

const urlRoutes = require("./routes/url")
const staticRoutes = require("./routes/staticRouter")
const userRoutes = require("./routes/user")


const app = express()
const PORT = 8001

connectToMongoDB("mongodb://0.0.0.0:27017/shot-url").then(() => console.log("mongodb connected"))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(checkForAuthentication)


app.use("/user", userRoutes)

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoutes)

app.use("/", staticRoutes)

app.listen(PORT, () => { console.log(`server started at port ${PORT}`) })