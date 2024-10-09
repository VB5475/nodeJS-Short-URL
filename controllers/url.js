const { nanoid } = require('nanoid')
const shortid = require("shortid")
// const { nanoid } = require('nanoid');  // Correct import

const URL = require("../models/url")

async function handleGenerateShortURL(req, res) {
    console.log("Req hit");

    const body = req.body
    if (!body.url) {
        return res.status(400)
    }
    const shortID = await shortid();
    console.log("Short id", shortID)
    console.log(body.url)
    await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    });
    return res.render("home", { id: shortID })
}

async function handleVisitHistory(req, res) {

    const shortID = await req.params.shortID

    const entry = await URL.findOneAndUpdate({
        shortID
    }, {
        $push: {
            visitHistory: { timestamp: Date.now() }
        }
    })
    res.redirect(entry.redirectURL)
}

async function handleAnlytics(req, res) {
    const shortID = req.params.shortID;
    const result = await URL.findOne({ shortID })

    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory })
}

module.exports = {
    handleGenerateShortURL,
    handleVisitHistory,
    handleAnlytics
}


