import React, { useEffect, useState} from "react";
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
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';



const Edit =()=>{

    const params= useParams()
    


    const [user, setUser] = useState({
      name: '',
      email: '',
      about:'',
      password: '',
      photo: '',
      error: '',
      redirectTo: false,
      openD: false,
      id: ''
})


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
                setUser({...user, id: data._id, name: data.name, email: data.email, about: data.about})
                abortController.abort()
            }
        })

    },[params.userId])


   

    const clickSubmit= async()=>{
      const jwt= auth.isAuthenticated()

      
      const form = new FormData();
      
      user.name && form.append('name', user.name)
      user.password && form.append('password', user.password)
      user.email && form.append('email', user.email)
      user.about && form.append('about', user.about)
      user.photo && form.append('photo', user.photo)

        // const updatedUser={
        //   name: user.name || undefined,
        //   about: user.about || undefined,
        //   email: user.email || undefined,
        //   password: user.password || undefined
        // }

        userupdate(form, {userId: params.userId}, {t: jwt.token})
        .then((resp)=>{
          console.log("resp from edit profile: ",resp)
          if(resp && resp.error)
          {
            setUser({...user, error: resp.error, redirectTo: false})
            console.log("error: ",resp.error)
          }
          else
          {
            setUser({...user,  openD: true})
            console.log("updated")
          }
        })
    }


    const handleChange=(name)=>(event)=>{
      // console.log(name, event.target.files[0].name)
      // const value = name === 'photo' ? event.target.files[0] : event.target.value
      // setUser({...user, [name]: value});
      if(name === 'photo')
  {
    
    let file = event.target.files[0];
    console.log("incoming file is: ", file);
    setUser({...user, [name]: file});
  }
  else
  {
    let field = event.target.value
    setUser({...user, [name]: field})

  }

  }


  const  handleCloseD=()=>{
        setUser({...user, redirectTo: true, openD: false})
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
    
 
      <CardContent sx={{textAlign: 'center'}} >
        {/* <label htmlFor="button-file-photo">

        </label>
        <input 
       type="file" accept="image/*" id="button-file-photo" 
       style={{display: 'none'}}
       onChange={handleChange('name')}
       /> */}
      
       <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" multiple="multiple" id="photo" name='photo' onChange={handleChange('photo')}/>
        <PhotoCamera />
      </IconButton>
      <Typography sx={{fontSize: 12}}>
              {user.photo ? user.photo.name : "Upload Your Photo"} 
        </Typography>
      
      <br/>
                <TextField sx={{mx: 2, width:"400px" }} id="name" label="Name"  value={user.name} onChange={handleChange('name')} color="success"/>
                <br/>
                <TextField sx={{mx:2, mt:4 , width:"400px"}} id="email" label="Email" value={user.email} onChange={handleChange('email')} color="success" />
                <br/>
                <TextField sx={{mx:2, mt:4 , width:"400px"}} multiline rows="4" id="about" label="About" value={user.about} onChange={handleChange('about')} color="success" />
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
                open={user.openD}
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