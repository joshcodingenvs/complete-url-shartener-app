// import required modules/packages
const express = require("express");
const url = require("node:url");
const shortId = require("short-uuid");
const Url = require("../model/url");

// router instance
const router = express.Router();

// endpoints
router.get("/urls", async (req, res)=>{
    // get the url 
    const urls = await Url.find({});
    if(!urls){
        return res.status(500).send("Something Broke, Failed to get the urls");
    };
    if(urls.length ===0){
        return res.status(200).send("No url yet");
    }
    res.status(200).json({ urls });
});

router.post("/shorten", async (req, res)=>{
    // get url submitted
    const { url_submitted } = req.body;
    
    // url structure
    const urlStructure = {
        host: url.parse(url_submitted).host,
        path: url.parse(url_submitted).path,
        originalUrl: url_submitted,
        shortenedUrl: `https://${url.parse(url_submitted).host}/${shortId.generate()}`
    };

    // preview the urlStructure
    // console.log(urlStructure);

    // save the url data
    const newUrl = new Url(urlStructure);

    await newUrl.save();

    res.status(201).send("Url structure saved");
});

// export router instance
module.exports = router;