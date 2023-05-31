// import required modules/packages
const mongoose = require("mongoose");

// url schema instance
const urlSchema = new mongoose.Schema({
    host: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },    
    originalUrl: {
        type: String,
        require: true
    },
    shortenedUrl: {
        type: String,
        require: true
    }
});

// urlSchema model instance
const Url = mongoose.model("url", urlSchema);

// export model instance
module.exports = Url;