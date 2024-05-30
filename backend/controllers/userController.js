const User = require('../models/userModel')

const signupUser = async (req,res) => {
    const { userName, password, confirmPassword } = req.body
    // console.log(userName)
    try {
        
        const user = await User.signup(userName,password,confirmPassword)
        
        res.status(200).json({userName})

    } catch(err) {
        console.log(err.message)
        res.status(400).json({error : err.message})
    }
}

const loginUser = async (req,res) => {
    const { userName, password } = req.body
    try {

        const user = await User.login(userName,password)
        console.log(user)
        res.status(200).json(user)
            

    } catch(err) {
        console.log(err.message)
        res.status(400).json({error : err.message})
    }
}
module.exports = { signupUser, loginUser }