import React from "react";
import {Routes,Route} from 'react-router-dom';
import Home from "./Home";
import Hello from "./Hello";
import Users from "./Users";
import Signup from "./Signup";
import Signin from "./Signin";
import Profile from "./Profile";
import MenuNav from "./Menu";
import Grid from '@mui/material/Grid';
import Edit from "./EditProfile";

const Main=()=>{

    return( 
            <div>
                <Grid container>     
                    {/* <MenuNav /> */}
             {/* <Home /> */}

            <Routes>
                <Route path="/" element={<Hello />} />    
                <Route path="/api/users" element={<Users />} />
                <Route path="/api/users/signup" element={<Signup />} />
                <Route path="/auth/signin" element={<Signin/>} />
                <Route path="/api/users/:userId" element={<Profile />} />
                <Route path="/api/users/:userId/edit" element={<Edit />} />
            </Routes>
            </Grid>
            </div>
    )
}
export default Main;