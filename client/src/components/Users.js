import React, { useEffect, useState } from "react";
import { list } from "../users/api-users";
import Grid from '@mui/material/Grid';
import MenuNav from "./Menu";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Users=()=>{

    const[value,setValue] = useState([])
    


    useEffect(()=>{
        const abortcontroller = new AbortController();
        const signal = abortcontroller.signal;
         list(signal)
        .then((data)=>{
            if(!data)
            {
                console.log("no data loaded")
            }
            else
            {
                // console.log("esle if part", data)
                if (data && data.error)
                     {console.log(data.error)}
                else
                { 
                    // console.log("data comes there", data)
                    setValue(data)
                    abortcontroller.abort()
                }

            }
            
        })
        //abort() was causing the DOM error=> DOMException: The user aborted a request.
        // return function cleanup()
        // {
        //     abortcontroller.abort();
        // }
    },[])

    return(
    <>
    <MenuNav />
    <Grid item xs={8} sx={{ m: 10,mx: "auto"}}>
        {
            value.map((item,index)=>{
                return(
                    // <div key={item._id}>
                    //     <li>{item.name}  |  {item.email}</li>
                    // </div>

                    <Card sx={{width: 400, m: "auto", mb: 4}} key={item._id}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {"Profile "+ index}
                </Typography>
                <List dense>
                <ListItem>
                  
                            <ListItemAvatar>
                                    <Avatar variant="solid" />
                            </ListItemAvatar>
                            <ListItemText
                                 primary={item.name} secondary={item.email}
                            />
                            
                </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary={"Joined: "+ (
              new Date(item.created)).toDateString()}/>
                    </ListItem>
            
            </List>
            </CardContent>
        </Card>
                )
            })
        }
    </Grid>
    </>)
}

export default Users;