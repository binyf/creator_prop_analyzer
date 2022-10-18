import React from "react";
import './App.css';
import Container from "@mui/material/Container";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function Analyzer(props) {
    const [state, setState] = React.useState(false);
    const id = window.localStorage.getItem('channel_id')
    const center = {
        position: 'absolute',
        bottom:0,
        left:0,
        top:0,
        right:0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    const get_props = (id) => {
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
            setState(true);
          })
          .catch((error)=>{console.log(error)});
      };
    return(
        <div>
            {state ?
             <div></div>
             : 
             <>
             {/* <LinearProgress/> */}
             <div style={center}> 
                <Grid Container direction='column' style={center}>
                    <Grid>
                    <CircularProgress/>
                    </Grid>
                    &nbsp;
                    <Grid>
                    <Typography>채널을 분석하고 있습니다..{id}</Typography>
                    </Grid>
                </Grid>
            </div>
            </>
            }
        </div>
    )
}