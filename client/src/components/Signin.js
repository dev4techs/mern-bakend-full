import React, { useState } from "react";
import {signin} from '../users/api-auth';
import auth from "../users/authenticate";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import { Navigate} from "react-router-dom";
import MenuNav from "./Menu";

const Signin=()=>{


  const [values,setValues] = useState({
    email:'',
    password: '',
    error: '',
    redirectToReferrer: false
  })


  const onsubmit=()=>{
    console.log("submitting")
    const user ={
      email: values.email || undefined,
      password: values.password || undefined
    }
    // console.log(user)
    signin(user)
    .then((data)=>{
      // console.log(data)
      if(data.error)
      {
        setValues({...values, error: data.error})
        console.log(data.error)
      }
      else
      {
        auth.authenticate(data,()=>{
          setValues({...values, error:'',redirectToReferrer: true})
          console.log("Signed In")
        })
      }
    })
  }

  const handleChange = (name)=>(event)=>{
    // console.log(name);
    // console.log(event.target.value);
    setValues({...values, [name]: event.target.value});

  }

  const {redirectToReferrer} = values

    if(redirectToReferrer)
    {
      console.log("coming further inside")
      return (<Navigate to="/"/>)
    }
    
 
  

    return(
      <><MenuNav />
        
        <Grid item xs={8} sx={{ m: 10,mx: "auto"}}>
        <Card sx={{width: "600px", mx: "auto"}}>
        
        <CardHeader  sx={{mx:3, }}
        title="Sign in"
      />
    
 
      <CardContent>
                <TextField sx={{mx:2, width:"400px"}} id="email" label="Email" color="success" value={values.email} onChange={handleChange('email')}/>
                <TextField sx={{mx:2, mt:4 , width:"400px"}} id="password" label="Password" color="success" value={values.password} onChange={handleChange('password')} />
                <br/>
                {
                values.error && (<Typography color="error">
                        
                  {values.error}</Typography>)
              }
      </CardContent>
      <CardActions>
      <Button sx={{mx:3}} variant="contained" onClick={onsubmit} endIcon={<SendIcon />} >
        Sign In
      </Button>
      </CardActions>
        </Card>
        </Grid>
    </>
    )
}

export default Signin;