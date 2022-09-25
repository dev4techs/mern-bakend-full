import  {signout}  from "./api-auth"

const auth= {
    //storing the jwt on the client side 

    authenticate(jwt,cb)
    {
        if( typeof window !== "undefined")
        {
            sessionStorage.setItem('jwt',JSON.stringify(jwt))
            cb()
        }
    },
    isAuthenticated()
    {
        if(typeof window == "undefined")
        {return false}
        if(sessionStorage.getItem('jwt'))
        {return JSON.parse(sessionStorage.getItem('jwt'))}
        else
        {return false}
    },
    clearJWT()
    {
        if(typeof window !== "undefined" )
        {

            sessionStorage.removeItem('jwt')
        }
        
        signout()
        .then(()=>{
            document.cookie="t=; expires = Thu, 01 Jan 1970 00:00:00 UTC path=/;"
        }).catch((err)=>console.log(err))
    }

}

export default auth;