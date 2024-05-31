const Resume = require('../models/resumeModel');
const multer = require('multer');
const archiver = require('archiver')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('pdf');

const saveResume = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    const newResume = new Resume({
      username: req.body.username,
      pdf_data: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    });

    const savedResume = await newResume.save();
    res.status(200).json({ message: 'Resume saved successfully', resume: savedResume });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const serveResume = async (req, res) => {
  try {
    const { username } = req.params;
    console.log(username);
    const resumes = await Resume.find({ username });

    if(resumes && resumes.length > 0) {
      const archive = archiver('zip', { zlib: { level: 9 }})
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', `attachment; filename="${username}_resumes.zip"`);
      archive.pipe(res);
      resumes.forEach((resume, index) => {
        if(resume.pdf_data && resume.pdf_data.data) {
          archive.append(Buffer.from(resume.pdf_data.data), { name: `${username}_resume_${index + 1}.pdf`})
        }
      })
      archive.finalize();
    } else {
      res.status(404).send('No resumes found')
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

module.exports = { saveResume, serveResume };