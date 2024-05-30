const mongoose = require('mongoose')

const resumeSchema = new mongoose.Schema({
    username: String,
    pdf_data: { data: Buffer, contentType: String } // assuming the PDF data is stored as a Base64 string
  });
  

const Resume = mongoose.model('Resume',resumeSchema)

module.exports = Resume