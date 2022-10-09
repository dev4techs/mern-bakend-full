const express = require('express');
const auth = require('./../model/authenticate');
const {list,createNew,read,updateUser,remove} = require ('./user.controller');
const errorHandler = require('./../model/dbErrorHandler');

const userRouter = express.Router();
//list and create methods
userRouter.route('/')
.get( async(req, res) => {
    // res.status(200).json({"message": "working"})
    try{
       
        const users= await list()
        if(users === null)
        {
            res.status(404).json({error: "no user in the list"})
        }
        res.status(200).json(users);
    }
    catch(err)
    {
        res.status(400).json({error: errorHandler.getErrorMessage(err)})
    } 
})
.post(async(req, res)=> {
    
    try{
        const user= await createNew(req.body)
        user.hashed_password = undefined;
        user.salt = undefined;
        res.status(200).json(user)
    }
    catch(err)
    {
        res.status(400).json({error: errorHandler.getErrorMessage(err)})  
    }
  });


//read,update and delete methods
userRouter.route('/:userId')
.get(auth.requireSignin,auth.hasAuthorization, async(req, res) =>{
   const {userId} = req.params;
   try{
    const user = await read(userId)
    if(user === null)
    {
        res.status(404).json({error: "no such user found"}) 
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.status(200).json(user)
   }
   catch(err)
   {
    res.status(400).json({error: err.message})
   }
  })
.put(auth.requireSignin, auth.hasAuthorization, updateUser
//     async(req, res) =>{
//     // 
//    try
//    {
//         const updated= await updateUser(req)
//         // console.log("checking...",updated)
//         // updated.hashed_password = ' '
//         // updated.salt = ' '
//         res.status(200).json(updated)
//    }
//    catch(err)
//    {
//     console.log("error in put call ", err.message)
//     res.status(400).json({error: err.message})
//    }
//   }
  )
.delete(auth.requireSignin, auth.hasAuthorization, async(req, res) =>{
    const {userId} = req.params
    try{
        const removed = await remove(userId)
        res.status(200).json(removed)
    }
    catch(err)
    {
        res.status(400).json({error: err.message})
    }  
  })


module.exports = userRouter;
