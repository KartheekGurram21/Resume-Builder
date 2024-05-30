const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
},{ timestamps: true })


userSchema.statics.signup = async function(userName, password, confirmPassword) {
    
    if(!userName || !password || !confirmPassword) {
        throw Error('All fields must be filled')
    }
    if(!( password === confirmPassword )) {
        throw Error('Passwords are not matched')
    }
    const exists = await this.findOne({userName})
    if(exists) {
        throw Error('Username exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    const user = await this.create({userName,password : hash})

    return user;
}


userSchema.statics.login = async function(userName,password) {
    if(!userName || !password) {
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({userName})
    if(!user) {
        throw Error('Invalid username')
    }
    const match = await bcrypt.compare(password,user.password)
    if(!match) {
        throw Error('Invalid password')
    }

    return user
}



const userModel = mongoose.model("users",userSchema)


module.exports = userModel