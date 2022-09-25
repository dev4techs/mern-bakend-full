import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Link, Navigate, useParams} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import MenuNav from "./Menu";
import auth from "../users/authenticate";
import { userupdate, read } from "../users/api-users";




const Edit =()=>{

    const params= useParams()
    

    const [user, setUser] = useState({
      name: '',
      email: '',
      password: '',
      error: '',
      redirectTo: false,
      open: false
})
    const [update,setUpdate] = useState()


    useEffect(()=>{
      
        const abortController = new AbortController();
        const signal = abortController.signal
        const jwt= auth.isAuthenticated()

        read(signal,{userId: params.userId}, {t: jwt.token})
        .then((data)=>{
            if(data & data.error)
            {
                console.log(data.error)
                
            }
            else
            {
                setUser(data)
                abortController.abort()
            }
        })

    },[params.userId])


    const handleChange=(name)=>(event)=>{
        console.log(name, event.target.value)
        setUser({...user, [name]: event.target.value});
    }

    const clickSubmit=()=>{
        console.log("updating.....")
        const jwt= auth.isAuthenticated()
        const updatedUser={
          name: user.name || undefined,
          email: user.email || undefined,
          password: user.password || undefined
        }

        userupdate(updatedUser, {userId: params.userId}, {t: jwt.token})
        .then((resp)=>{
          console.log(resp)
          if(resp && resp.error)
          {
            setUser({...user, error: resp.error, redirectTo: false})
            console.log("error: ",resp.error)
          }
          else
          {
            setUser({...user, userId: resp._id,  open: true})
            console.log("updated")
          }
        })
    }

    const  handleCloseD=()=>{
        setUser({...user, redirectTo: true, open: false})
    }

    if(user.redirectTo)
    {
      return (<Navigate to={"/api/users/"+auth.isAuthenticated().user._id} />)
    }

    return(
        <>
<MenuNav />
    <Grid item xs={8} sx={{ m: 10,mx: "auto"}}>
        
        <Card>
        
        <CardHeader sx={{textAlign: 'center'}}
        title="Edit Profile"
        subheader="Please Update Your Information Below"
      />
    
 
      <CardContent >
                <TextField sx={{mx: 2, width:"600px" }} id="name" label="Name"  value={user.name} onChange={handleChange('name')} color="success"/>
                <br/>
                <TextField sx={{mx:2, mt:4 , width:"600px"}} id="email" label="Email" value={user.email} onChange={handleChange('email')} color="success" />
                <br/>
                <TextField sx={{mx:2, mt:4 , width:"400px"}} id="password" label="Password"  value={user.password} onChange={handleChange('password')} color="success" />
                <br/>
                {
            user.error && (<Typography color="error">
                    
              {user.error}</Typography>)
          }       
            
      </CardContent>
      <CardActions>
      <Button sx={{mx:'auto'}} variant="contained" onClick={clickSubmit} endIcon={<SendIcon />}>
        Submit
      </Button>
      </CardActions>
        </Card>
                <Dialog
                open={user.open}
              >
                <DialogTitle id="alert-dialog-title">
                  Profile Update
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Profile Updated Successfully!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>

                       <Button autoFocus onClick={handleCloseD}> Okay</Button>
                </DialogActions>
              </Dialog>
    </Grid>
 </>
    )
}

export default Edit;