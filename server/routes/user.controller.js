const Users = require('./../model/user.model');
const errorHandler = require('./../model/dbErrorHandler');
const { IncomingForm } = require('formidable');
const fs = require('fs')


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

const updateUser = async(req, res)=>{
        
    const form = new IncomingForm();
    form.keepExtensions = true
    console.log('form created')

    const  user = await Users.findById(req.params.userId);

    form.parse(req,  async(err, fields, files) => {
      if (err) {
        next(err);
        console.log("error",err)
        return;
      }
      console.log(fields)
      console.log(files)
      
      let newUser = Object.assign(user, fields) //ok
      newUser.updated = Date.now()

      if(files.photo)
      {
        newUser.photo.data = fs.readFileSync(files.photo.filepath) //we need to read file Sync to avoid callback error
        newUser.photo.contentType = files.photo.mimetype
      }
      

      try{
        await newUser.save()
        newUser.hashed_password = undefined
        newUser.salt = undefined
        res.json({ newUser});
      }
      catch(err)
      {
        return res.status(400).json({error: errorHandler.getErrorMessage(err)})
        
      }
       
    });
      
    }
  



const remove = async(userId)=>{

        return await Users.findByIdAndRemove(userId)
    
}

module.exports= {list,read,createNew,updateUser,remove};