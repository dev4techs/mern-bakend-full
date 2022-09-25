const create = async(user) =>
{
    try{
        let response = await fetch('/api/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()

    }
    catch(err)
    {
        console.log(err)
    }
    
}

const list = async(signal) =>
{
    try {
        let response = await fetch("/api/users" ,
            {
                method: 'GET',
                signal: signal
            })
            
        return await response.json();
    }
    catch(err)
    {
        console.log(err);

    }  
}

const read = async(signal,params,credentials)=>{
    // console.log(params.userId,credentials)
    try{
        let response = await fetch('/api/users/'+params.userId,{
            method: 'GET',
            signal: signal,
            headers:{
                "Accept": 'application/json',
                "Content-Type" : 'application/json',
                "Authorization": 'Bearer '+ credentials.t

            }
        })
        console.log("getting response: ",response)
        return await response.json()

    }
    catch(err)
    {
        console.log(err)
    }
}

const userupdate=async(user,params,credentials)=>{
    try{
        console.log("coming to update")
        let response = await fetch('/api/users/'+params.userId,{
            method: 'PUT',
            headers:{
                "Accept": 'application/json',
                "Content-Type" : 'application/json',
                "Authorization": 'Bearer '+ credentials.t

            },
            body: JSON.stringify(user)
        })
        console.log("update response",response)
        return await response.json()

    }
    catch(err)
    {
        console.log(err)
    }

}

const remove = async(params, credentials)=>
{
    try{
        let response = await fetch('/api/users/'+params.userId,{
            method: 'DELETE',
            headers:{
                "Accept": 'application/json',
                "Content-Type" : 'application/json',
                "Authorization": 'Bearer '+ credentials.t

            }
        })
        return await response.json()

    }
    catch(err)
    {
        console.log(err)
    }

}

export {list,create,read,userupdate,remove};