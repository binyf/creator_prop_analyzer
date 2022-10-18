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
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Grow from '@mui/material/Grow';
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar';
import Dialog from "@mui/material/Dialog";
import ChannelCard from "./channelCard";


function Main() {
  const [text, setText] = React.useState('')
  const [channels, setChannels] = React.useState([])
  const [check, setCheck] = React.useState(false)
  const [alert, setAlert] = React.useState(false);
  const [ch_info, setInfo] = React.useState({id:'',name:'',img:''});
  const [open, setOpen] = React.useState(false);
  const handleAlert = () => {
    setAlert(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
  };

  const channel_search = (channel_name) => {
    setCheck(false)
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
        setChannels(json.channels)
        setCheck(true)
      })
      .catch((error) => {console.log(error)});
  };
  return (
    <div>
      <Snackbar open={alert} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert variant="filled" onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
          채널명을 입력해주세요!
        </Alert>
      </Snackbar>
    <div className="outer-div">
      <Container component='main' maxWidth="xl">
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
        label="채널 검색" 
        onChange = {(e)=>setText(e.target.value)} />
        <Button 
        size = 'large'
        onClick={()=>{
          if (text !== ''){
            channel_search(text)
          }
          else{
            handleAlert()
          }
          
        }}
        >검색</Button>
        </Toolbar>

      {check ? 
        <List sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'auto', maxHeight: `${window.innerHeight*0.6}px`}}>
          {
            channels.map((channel,index) => (
              <Grow in={check}  {...(check ? { timeout: 300*(index+1) } : {})}>
            <ListItemButton 
            alignItems="flex-start" 
            onClick = {() =>{
              setInfo({
                id:channel.channel_id,
                name:channel.channel_name,
                img:channel.thumbnail
              });
              setOpen(true);
            }
            }>
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
            </ListItemButton>
            </Grow>
            ))
          }
        </List>
      :<div/>}
      <Dialog
          open={open}
          onClose={()=>{setOpen(false)}}
          fullWidth='true'
          maxWidth='md'
        >
          <ChannelCard info = {ch_info}/>
        </Dialog>
      </Container>
    </div>
    </div>
  );
}

export default Main;
