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


export default function Analyzer(props) {
    const [state, setState] = React.useState(false);
    const [barData, setBarData] = React.useState();
    const [radarData, setRadarData] = React.useState();
    const [pieData, setPieData] = React.useState();
    const [numComment, setNumComment] = React.useState(0);
    const [topComment, setTopComment] = React.useState();
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
      setTopComment(result[3]);
      setNumComment(result[4]);
      console.log(numComment)
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
            <>
            <div style={{backgroundColor : `${barData[0]['clean'] >= 70 ? '#cfffaa'
                   : barData[0]['clean'] >= 50 ? '#fff5ce' 
                   : '#ffafaf' }`}}>
            <Container className = 'outer-div' component='main' maxWidth="lg" style={{
              backgroundImage:`url(${banner_url})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize : 'contain',
              backgroundColor : `${barData[0]['clean'] >= 70 ? '#cfffaa'
              : barData[0]['clean'] >= 50 ? '#fff5ce' 
              : '#ffafaf' }`
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
                {numComment >= 100 ?
                  <>
                <Grid xs={7}>
                <Item  sx={{height:'450px', padding : '5%'}}>
                  <img alt = {channel_name} src = {thumb_url} style={{width : '300px', height: '300px'}}/>
                  <Typography color = 'black' fontSize={window.innerWidth*0.02}>
                    {channel_name}
                  </Typography>
                  <Typography color = {barData[0]['clean'] >= 70 ? 'green'
                   : barData[0]['clean'] >= 50 ? 'orange' 
                   : 'red' } fontSize={window.innerWidth*0.015}>
                    {barData[0]['clean'] >= 70 ? '양호' : barData[0]['clean'] >= 50 ? '주의' : '경고' }
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
                    <Tab label="혐오표현비율" {...a11yProps(0)} />
                    <Tab label="혐오표현분포" {...a11yProps(1)} />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    <Box sx={{ justifyContent:'center',alignItems:'center', width: 700, height:400}}>
                      <RadarGraph data = {radarData}/>
                    </Box>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Box sx={{justifyContent:'center',alignItems:'center', width: 700, height:400}}>
                      <PieGraph data = {pieData}/>
                    </Box>
                  </TabPanel>
                  </Box>
                  </Item>
                </Grid>


                <Grid xs={12}>
                  <Item >
                    <Typography color = 'black' variant='h4'>
                      대표 댓글
                    </Typography>
                    &nbsp;
                    <List sx={{ width: '100%', bgcolor: 'background.paper'}}>
                      {topComment.map((comments,index)=>(
                        <Grid container>
                          <Grid xs={9}>
                            <Typography textAlign='left' color = 'black' variant='h6'>
                              <b>{comments[0]}</b>
                            </Typography>
                          </Grid>
                          <Grid xs={3}>
                            {comments[1].map((object,idx)=>(
                              <Typography>
                                  {object['label']} : {(object['score']*100).toFixed(3)}%
                              </Typography>
                            ))}
                          
                          </Grid>
                    </Grid>
                    ))}
                    </List>
                  </Item>
                </Grid>
                  </>
              :
                <>
                  <Grid xs={7}>
                <Item  sx={{height:'450px', padding : '5%'}}>
                  <img alt = {channel_name} src = {thumb_url} style={{width : '300px', height: '300px'}}/>
                  <Typography color = 'black' fontSize={window.innerWidth*0.02}>
                    {channel_name}
                  </Typography>
                  <Typography>
                      분석에 필요한 데이터가 충분하지 않습니다.
                    </Typography>
                </Item>
                </Grid>
                <Grid xs={5}>
                  <Item sx={{justifyContent:'center', height:'470px', padding : '5%'}}>
                    <Typography>
                      분석에 필요한 데이터가 충분하지 않습니다.<br/>
                      채널에 새로운 영상이 올라온 직후이거나 <br/>
                      실시간 방송 진행 중에는 <br/>
                      댓글 데이터 수집이 원활하지 않을 수 있습니다.
                    </Typography>
                  </Item>
                </Grid>
                </>              
              }
             </Grid>
             </Container>
            </div>
            </>
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