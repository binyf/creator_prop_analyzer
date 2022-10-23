import React from "react";
import './App.css';
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Unstable_Grid2';
import BarGraph from "../graphs/barGraph";
import RadarGraph from "../graphs/radarGraph";
import {data_process} from "../graphs/dataProcessing"
import PieGraph from "../graphs/pieGraph";
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import { styled } from '@mui/material/styles';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import Tooltip from '@mui/material/Tooltip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

export default function Analyzer(props) {
    const [state, setState] = React.useState(false);
    const [barData, setBarData] = React.useState();
    const [radarData, setRadarData] = React.useState();
    const [pieData, setPieData] = React.useState();
    const [page, setPage] = React.useState(true);
    const [top3, setTop3] = React.useState();
    const id = window.localStorage.getItem('channel_id')
    const thumb_url = window.localStorage.getItem('channel_img')
    const banner_url = window.localStorage.getItem('banner')
    const channel_name = window.localStorage.getItem('channel_name')
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));
    const setData = (data) =>{
      let result = data_process(data);
      setBarData(result[0]);
      setRadarData(result[1]);
      setPieData(result[2]);
      setTop3(result[3]);
      setState(true);
    }
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
        fetch(`/api/v1/analyze/${id}`, requestOptions)
          .then((response) => response.json())
          .then((json) => {
            setData(json);
          })
          .catch((error)=>{console.log(error)});
      };
    React.useEffect(() => {
      get_props(id);
    }, []);
    
    return(
        <>
            {state ?
            <Container className = 'outer-div' component='main' maxWidth="lg" style={{
              backgroundImage:`url(${banner_url})`,
              backgroundRepeat: 'repeat',
              backgroundSize : 'contain'
              }}>
              <Tooltip title="뒤로가기">
              <IconButton color="primary" onClick={()=>{
                  window.location.href = '/main'
              }
              }>
                <ReplyOutlinedIcon/>
              </IconButton>
              </Tooltip>
              
              <Grid container rowSpacing={4} columnSpacing={2}>
                <Grid xs={7}>
                <Item  sx={{height:'450px', padding : '5%'}}>
                  <img alt = {channel_name} src = {thumb_url} style={{width : '300px', height: '300px'}}/>
                  <Typography color = 'black' fontSize={window.innerWidth*0.02}>
                    {channel_name}
                  </Typography>
                  <Typography color = {barData[0]['clean'] >= 60 ? 'green'
                   : barData[0]['clean'] >= 30 ? 'orange' 
                   : 'red' } fontSize={window.innerWidth*0.015}>
                    {barData[0]['clean'] >= 60 ? '양호' : barData[0]['clean'] >= 30 ? '주의' : '경고' }
                  </Typography>
                  &nbsp;
                  <Typography>
                    위험도 : {(barData[0]['일반 악성 댓글']+barData[0]['혐오표현']).toFixed(2)}%
                  </Typography>
                </Item>
                </Grid>
                <Grid xs={5}>
                  <Item sx={{height:'470px', padding : '5%'}}>
                  <div style={{height:470}}>
                    <BarGraph data = {barData}/>
                  </div>
                  </Item>
                </Grid>
                
                <Grid xs={12}>
                  <Item>
                  <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 400 }}>
                  <Tabs
                    orientation="vertical"
                    value={value}
                    indicatorColor="primary"
                    onChange={handleChange}
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                  >
                    <Tab label="혐오현황" {...a11yProps(0)} />
                    <Tab label="혐오분포" {...a11yProps(1)} />
                  </Tabs>
                  <TabPanel style={{justifyContent:'center',alignItems:'center'}} value={value} index={0}>
                    <Box sx={{width: 1000, height:400}}>
                      <RadarGraph data = {radarData}/>
                    </Box>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Box sx={{width: 1000, height:400}}>
                      <PieGraph data = {pieData}/>
                    </Box>
                  </TabPanel>
                  </Box>
                  </Item>
                </Grid>
                <Grid xs={12}>
                  <Item sx={{height:'500px'}}>
                    <List sx={{ width: '100%'}}>
                      {console.log(top3)}
                      {console.log(Array.isArray(top3))}
                    {top3.map((comments,index)=>{
                      {console.log(index,comments[0])}
                      <h5>
                        {comments[0]}
                      </h5>
                    //   <ListItemText
                    //   primary={comments[0]}
                    //   secondary={
                    //     <React.Fragment>
                    //       <Typography
                    //         sx={{ display: 'inline' }}
                    //         component="span"
                    //         variant="body2"
                    //         color="text.primary"
                    //       >
                    //         안녕
                    //       </Typography>
                    //     </React.Fragment>
                    //   }
                    // />
                    })}
                    </List>
                  </Item>
                </Grid>
             </Grid>
             </Container>
             : 
             <>
             <div style={center}> 
                <Grid Container direction='column' style={center}>
                    <Grid>
                    <CircularProgress/>
                    </Grid>
                    &nbsp;
                    <Grid>
                    <Typography>채널을 분석하고 있습니다..</Typography>
                    </Grid>
                </Grid>
              </div>
            </>
            }
        </>
    )
}


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}