const mongoose = require('mongoose')

const resumeSchema = new mongoose.Schema({
    username: String,
    pdf: {
        data: Buffer,
        contentType: String
    } 
})

const Resume = mongoose.model('Resume',resumeSchema)

module.exports = Resume