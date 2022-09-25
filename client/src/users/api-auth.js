const signin= async(user)=>
{
    // console.log("from the client", user)
    try{
        let response = await fetch('/auth/signin/',{
            method: 'POST',
            headers:
            {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(user)
            
        })
        // console.log('from the client body',response.body)
        return await response.json()
        
    }
    catch(err)
    {
        console.log("error",err)
    }
}

const signout = async( )=>{
    try{
        let response= await fetch('/auth/signout/',{
            method: 'GET'
        })
        return await response.json()
    }
    catch(err)
    {
        console.log(err)
    }
}

export {signin, signout}