const express = require('express')


const router = express.Router()
const { handleGenerateShortURL, handleVisitHistory, handleAnlytics } = require("../controllers/url")

router.post("/", handleGenerateShortURL)

router.get("/:shortID", handleVisitHistory)

router.get("/analytics/:shortID", handleAnlytics)

module.exports = router 