import React, { useState } from "react";
import {create} from '../users/api-users';
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
import {Link} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import MenuNav from "./Menu";



const Signup = ()=>{
   
    const [values, setValues] = useState({
      name: '',
      email: '',
      password: '',
      open: false,
      error: null
      
})
const handleChange = (name)=>(event)=>{
  // console.log(name);
  // console.log(event.target.value);
  setValues({...values, [name]: event.target.value});
}

const clickSubmit=()=>
{
  console.log("submitting")
  const user={
    name: values.name || undefined,
    email: values.email || undefined,
    password: values.password || undefined
  }

  create(user).then((data)=>{
    if(data.error)
    {
      setValues({...values, error: data.error})
    }
    else
    {
      setValues({...values, error: null, open: true})
      console.log("I am here",user);
    }
  })
  

}
const handleCloseD=()=>{
  setValues({...values, open: false})
}
    return(
<>
<MenuNav />
    <Grid item xs={8} sx={{ m: 10,mx: "auto"}}>
        
        <Card>
        
        <CardHeader sx={{mx:3}}
        title="Sign Up Form"
        subheader="Sign up by filling the information below"
      />
    
 
      <CardContent >
                <TextField sx={{mx:2, width:"600px" }} id="name" label="Name"  value= {values.name} onChange={handleChange('name')} color="success"/>
                <br/>
                <TextField sx={{mx:2, mt:4 , width:"600px"}} id="email" label="Email" value={values.email} onChange={handleChange('email')} color="success" />
                <br/>
                <TextField sx={{mx:2, mt:4 , width:"400px"}} id="password" label="Password" value={values.password} onChange={handleChange('password')} color="success" />
                <br/>
                {
            values.error && (<Typography color="error">
                    
              {values.error}</Typography>)
          }       
            
      </CardContent>
      <CardActions>
      <Button sx={{mx:3}} variant="contained" onClick={clickSubmit} endIcon={<SendIcon />}>
        Submit
      </Button>
      </CardActions>
        </Card>
                <Dialog
                open={values.open}
                onClose={handleCloseD}
              >
                <DialogTitle id="alert-dialog-title">
                  New Account
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    New Account Successfully Created!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  
                       <Link to='/auth/signin' >
                       <Button autoFocus> Sign In </Button>
                       </Link>
                  
                  
                </DialogActions>
              </Dialog>
    </Grid>
 </>
    )
}

export  default Signup;