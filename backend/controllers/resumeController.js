const Resume = require('../models/ResumeModel');
const multer = require('multer');


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
      pdf: {
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



const getAllResumes = async (req, res) => {
  try {
    const { username } = req.params;
    const resumes = await Resume.find({ username });
    if (!resumes.length) {
      return res.status(404).json({ message: 'No resumes found for this username' });
    }

    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = { saveResume, getAllResumes };
