const mongoose = require('mongoose');
const Users = require('./../model/user.model');


//ednpoints => api/users
const list = async() =>
{
        return await Users.find({},'email name created updated')
}

const createNew = async(req)=>{
    
    return await Users.create(req);
  
}


//endpoint=> api/users/:userId
const read = async (userId)=>{
    
        return await Users.findById(userId)
       
    }

const update = async(req)=>{
    
      let user = await Users.findByIdAndUpdate(req.params.userId,{$set: req.body},{new: true});
       user.updated = Date.now();
    //    user.hashed_password = undefined;

      return await user.save();
      
    }
  



const remove = async(userId)=>{

        return await Users.findByIdAndRemove(userId)
    
}

module.exports= {list,read,createNew,update,remove};