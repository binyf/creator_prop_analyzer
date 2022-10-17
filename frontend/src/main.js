import React from "react";
import './App.css';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

function Main() {
  const [text, setText] = React.useState('')
  const [channels, setChannels] = React.useState([])
  const [check, setCheck] = React.useState(false)
  const channel_search = (channel_name) => {
    console.log(process.env.REACT_APP_PROXY_HOST)
    console.log(channel_name)
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
    fetch(`/api/v1/channel/${channel_name}`, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        setChannels(json.channels)
        console.log(channels)
        setCheck(true)
      })
      .catch((error) => {console.log(error)});
  };
  return (
    <div className="outer-div">
      <Container component='main' maxWidth="lg">
        <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">테스트</Typography>
        </Box>
        <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
      </Box>
        <Toolbar>
        <TextField 
        fullWidth 
        value = {text} 
        label="fullWidth" 
        onChange = {(e)=>setText(e.target.value)} />
        <Button 
        size = 'large'
        onClick={()=>{
          if (text !== ''){
            channel_search(text)
          }
          
        }}
        >검색</Button>
        </Toolbar>

      {check ? 
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {
            channels.map((channel,index) => (
            <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src={channel.thumbnail} />
            </ListItemAvatar>
            <ListItemText
              primary={channel.channel_name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {channel.description}
                  </Typography>
                </React.Fragment>
              }
            />
            </ListItem>
            ))
          }
          
        </List>
      :<div/>}
      </Container>
    </div>
  );
}

export default Main;
