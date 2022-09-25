import React, { useEffect, useState } from "react";
import {Link, Navigate, useParams} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { ListItemSecondaryAction } from "@mui/material";
import auth from '../users/authenticate'
import { read } from "../users/api-users";
import MenuNav from "./Menu";
import DeleteProfile from "./DeleteProfile";

const Profile=()=>{
    // console.log(props.userId) both are working fine
    // const match = useMatch('/api/users/:userId')
    // console.log("match",match.params.userId)
    const params= useParams()
    // console.log("params",params.userId)

    const [user, setUser] = useState()
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const [opend, setOpenD] = useState(false)

    useEffect(()=>{
        console.log("calling use effect")
        const abortController = new AbortController();
        const signal = abortController.signal
        const jwt= auth.isAuthenticated()
        read(signal,{userId: params.userId}, {t: jwt.token})
        .then((data)=>{
            console.log("promises: ",data)
            if(data & data.error)
            {
                console.log(data.error)
                setRedirectToSignin(true)
            }
            else
            {
                setUser(data)
                abortController.abort()
            }
        })
    },[params.userId])

    const handleDelete=()=>{
        setOpenD(true)
    }

    if(redirectToSignin)
    {
        
        return <Navigate to="/auth/signin"/>
    }
    return(
        <>
        <MenuNav />
        <Grid item  sx={{ mx:"auto" , mt: 10 , align: "center"}}>
        { user && (<Card sx={{width: 400}}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                   {"My Profile"}
                </Typography>
                <List dense>
                <ListItem>
                  
                            <ListItemAvatar>
                                    <Avatar variant="solid" />
                            </ListItemAvatar>
                            <ListItemText
                                 primary={user.name} secondary={user.email}
                            />
                            {auth.isAuthenticated().user && auth.isAuthenticated().user._id === user._id && (<ListItemSecondaryAction >
                            <IconButton edge="end" aria-label="delete"  onClick={handleDelete}>
                                    <DeleteIcon />
                                    {opend && (<DeleteProfile userId={user._id}/>)}
                            </IconButton>
                            <Link to={"/api/users/"+auth.isAuthenticated().user._id+"/edit"} style={{ textDecoration: 'none' }}>
                            <IconButton edge="end" aria-label="edit">
                                    <EditIcon />
                            </IconButton>
                            </Link>
                            </ListItemSecondaryAction>)}
                </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary={"Joined: "+(
              new Date(user.created)).toDateString()}/>
                    </ListItem>
            
            </List>
            </CardContent>
        </Card>)}
        </Grid>

        </>
    )
}

export default Profile;