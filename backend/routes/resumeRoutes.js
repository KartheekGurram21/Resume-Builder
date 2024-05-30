const router = require('express').Router()
const resumeController = require('../controllers/resumeController')

router.post('/upload',resumeController.saveResume)
router.get('/files/:username',resumeController.serveResume)

module.exports = router