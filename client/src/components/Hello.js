import React from 'react';
import MenuNav from './Menu';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';

const Hello=()=>{

    return(
        <>
        <MenuNav />
        <Card sx={{ maxWidth: 700, m: 'auto', mt: 10}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image=""
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Welcome to Home Page
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        
      </CardActionArea>
    </Card>
        </>
    )
    // const[value,setValue] = useState([])

    // useEffect(()=>{
    //     fetch('/api/users')
    //     .then((res)=>{
    //         if(res.ok)
    //         {return res.json()}
    //     }).then((resp)=>setValue(resp))
    // },[])

    // return(<div>{
    //     value.map((item)=>{
    //         return(
    //             <div key={item._id}>
    //                 <li>{item.name}</li>
    //             </div>
    //         )
    //     })}</div>)
}

export default Hello;