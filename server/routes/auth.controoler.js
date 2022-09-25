const Users = require('./../model/user.model');
const jwt = require('jsonwebtoken');

const signin = async(req,res)=>{
    try{
        // console.log("from the auth",req.body)
        let user = await Users.findOne({'email': req.body.email}) 
        if(!user)
        {
            return res.status(401).json({error: "User not found!"})
        }
        if(!user.authenticate(req.body.password))
        {
            return res.status(401).json({error: "Email or Password don't match"})
        }
        console.log("code came here")
        const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY);
        res.cookie('t',token,{expire: new Date(Date.now())+9999})
        console.log("token assigned")
        return res.json({
            token,
            user:
            {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })

    }
    catch(err)
    {
        return res.status(404).json({error: "Could not Signed in"})
    }
}

module.exports = {signin}