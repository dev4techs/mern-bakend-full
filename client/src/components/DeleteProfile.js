import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import auth from "../users/authenticate";
import { remove } from "../users/api-users";
import { Navigate } from "react-router-dom";
import {PropTypes} from 'prop-types';

const DeleteProfile =(props)=>{

const [action, setAction] = useState({
    open:  true,
    redirectTo: false
});

console.log(action.redirectTo);

const handleSubmit=()=>{
    const jwt = auth.isAuthenticated()
    remove({userId: props.userId}, {t: jwt.token})
    .then((resp)=>{
        if(resp && resp.error)
        {
            console.log(resp.error)
        }
        else
        {
            auth.clearJWT();
            setAction({...action, open: false, redirectTo: true})
            
        }
    })

}

const handleCancel=()=>{
    setAction({...action, open:false})
}


    if(action.redirectTo)
    {
        return (<Navigate to='/' />)
    }


    return(
        <Dialog
                open={action.open}
              >
                <DialogTitle id="alert-dialog-title">
                  Delete Confirmation
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Do You Want to Delete the Profile 
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                       <Button autoFocus onClick={()=>{handleSubmit()}}> Confirm </Button>
                       <Button onClick={handleCancel}> Cancel </Button>
                </DialogActions>
              </Dialog>
    )
}

DeleteProfile.propTypes = 
{ 
    userId: PropTypes.string.isRequired
}

export default DeleteProfile;

