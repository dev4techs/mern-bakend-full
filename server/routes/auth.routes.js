const express= require('express');
const authCtrl = require('./auth.controoler');

const authRouter= express.Router();

authRouter.route('/signin')
.post(authCtrl.signin)


authRouter.route('/signout')
.get((req,res)=>{
    res.clearCookie('t')
    res.status(200).json({message: "Signed Out!"})
})


module.exports = authRouter;