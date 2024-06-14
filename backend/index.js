const express = require('express')
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const resumeRoutes = require('./routes/resumeRoutes')

const app = express()


const PORT = process.env.PORT
const uri = process.env.MONGO_URI


app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://resumegenerator-alpha.vercel.app'
    ]
}))


app.use(express.json())


app.use('/api/user',userRoutes)
app.use('/api/resume',resumeRoutes)


mongoose.connect(uri)
.then(res => {
    console.log('connected to db')
})
.catch(err => console.log(err))


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})