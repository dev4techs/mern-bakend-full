/* this file is to handle the error in req-rescycle. return the relevant error whether it is
 from validator constraints in the UserSchema or from the queries from the database*/

const getUniqueErrorMessage=(err)=>
{
    let output;
    console.log("The error from the getuniqueerrormessage: ", err)
    try{
        let fieldName = err.message.substring(err.message.lastIndexOf('$')+2, err.message.lastIndexOf('_1'));
        output= fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + 'already exists'
    }
    catch(err)
    {
        output= 'Unique Field already exists'

    }
    return output
}


const getErrorMessage= (err)=>
{
    let message= ''
    console.log(err)
    console.log(err.error)
    if(err.code)
    {
        console.log(err.code)
        switch(err.code)
        {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err)
            break
            default:
                message= "something went wrong"
        }
    }
    else
    {
        for(let errName in err.errors)
        {
        if(err.errors[errName].message )
        {
            message = err.errors[errName].message

        }
    }
    }
    return message
}

module.exports = {getErrorMessage};