const express = require("express")
const router = express.Router()

const { handleHomeRender, handleSignUpRender, handleLoginRender, handleAdminHomeRender } = require("../controllers/staticRouter")
const { restrictTo } = require("../middlewares/auth")

router.get("/", restrictTo(["NORMAL", "ADMIN"]), handleHomeRender)
router.get("/admin/urls", restrictTo(["ADMIN"]), handleAdminHomeRender)
router.get("/signup", handleSignUpRender)
router.get("/login", handleLoginRender)

module.exports = router