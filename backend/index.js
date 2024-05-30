const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const resumeRoutes = require('./routes/resumeRoutes')

const app = express()
const PORT = 3001


app.use(cors())
app.use(express.json())
app.use('/api/user',userRoutes)
app.use('/api/resume',resumeRoutes)


mongoose.connect('mongodb+srv://kartheek:mongodb123@rtfp.6p7fuja.mongodb.net/')
.then(res => {
    console.log('connected to db')
})
.catch(err => console.log(err))


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})