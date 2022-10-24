import React from "react";
import './App.css';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Grow from '@mui/material/Grow';
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar';
import Dialog from "@mui/material/Dialog";
import ChannelCard from "./channelCard";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Main() {
  const [text, setText] = React.useState('')
  const [channels, setChannels] = React.useState([])
  const [check, setCheck] = React.useState(false)
  const [alert, setAlert] = React.useState(false);
  const [ch_info, setInfo] = React.useState({id:'',name:'',img:''});
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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
    setCheck(false);
    setLoading(true);
    console.log(process.env.REACT_APP_PROXY_HOST);
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
        setLoading(false);
        setCheck(true)
      })
      .catch((error) => {console.log(error)});
  };
  const search = ()=>{
    if (text !== ''){
      channel_search(text);
    }
    else{
      handleAlert();
    }
  }
  const keyHandler = (event)=>{
      if(event.key === "Enter"){
        search();
      }
  };
  return (
    <div>
      <Snackbar open={alert} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert variant="filled" onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
          채널명을 입력해주세요!
        </Alert>
      </Snackbar>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
        <Typography variant="h4">Youtube 채널 댓글 분석</Typography>
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
        onKeyDown={keyHandler}
        onChange = {(e)=>setText(e.target.value)} />
        <Button 
        size = 'large'
        onClick={search}
        >검색</Button>
        </Toolbar>

      {check ? 
        <List sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'auto', maxHeight: `${window.innerHeight*0.43}px`}}>
          {
            channels.map((channel,index) => (
              <Grow in={check}  {...(check ? { timeout: 300*(index+1) } : {})}>
            <ListItemButton 
            alignItems="flex-start" 
            key={index}
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
          fullWidth={true}
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
