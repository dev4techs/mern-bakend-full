const mongoose = require("mongoose");
const  Schema = mongoose.Schema;
const crypto = require('crypto');

var UserSchema = new Schema(
    {
        name:
        {
            type: String,
            trim: true,
            required: 'Name is required'
        },
        email:
        {
            type: String,
            trim: true,
            unique: true,
            match: [/.+\@.+\..+/, 'Please fill a valid email address'],
            required: 'Email is required'
        },
        created:
        {
            type: Date,
            default: Date.now
        },
        updated: Date,
        hashed_password: {
            type: String,
            required: 'Password is required'
        },
        salt: String
    }
)



//a virtual field password given by the user and hashed_password is encrypted using password and stored  in database
UserSchema.virtual('password')
.set(function(password){
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptpassword(password);
})
.get(function()
{
    return this._password
})

UserSchema.path('hashed_password').validate(function (){
    if(this._password && this._password.length<6)
    {
        this.invalidate('password',"Password must be at least 6 character long")
    }
    if(this.isNew && !this._password)
    {
        this.invalidate('password', "Password is required")
    }
},null)


UserSchema.methods = {
    
    encryptpassword: function(password)
    {
        if (!password) return ''
        try{
            return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex')

        }
        catch(err)
        {
            // return ''
            console.log(err)
        }
    },
    makeSalt: function()
    {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    },
    authenticate: function(text)
    {
        return this.encryptpassword(text) === this.hashed_password
    }

}

var Users= mongoose.model('Users', UserSchema);
module.exports=Users;