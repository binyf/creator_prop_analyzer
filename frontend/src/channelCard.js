import React from "react";
import './App.css';
import MainCard from "./mainCard";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function ChannelCard(props) {
    const [stat, setStat] = React.useState('');
    const get_statistics = (id) => {
        const requestOptions = {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json",
          },
        };
        fetch(`/api/v1/channel_info/${id}`, requestOptions)
          .then((response) => response.json())
          .then((json) => {
            setStat(json);
          })
          .catch((error)=>{console.log(error)});
      };

    React.useEffect(() => {
      get_statistics(props.info.id);
    }, []);
    return(
        <div className="card-div">
            {stat === '' ? <div/> :
            <Container component="main" maxWidth="xl">
                <Paper>
                    <img
                    src={props.info.img}
                    className='thumbnails'
                    alt={props.info.name}
                    loading='lazy'
                    />
                    <Typography varient="h1" textAlign='center'>
                    {props.info.name}
                    </Typography>
                </Paper>
                
            </Container>
            }
            
        </div>
    );
}