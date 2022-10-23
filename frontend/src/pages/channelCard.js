import React from "react";
import './App.css';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Toolbar from '@mui/material/Toolbar';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button'


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
        <div className="outer-card">
            {stat === '' ? <div/> :
            <div className="outer-card">
            <Container component="main" maxWidth="xl" style={{
              backgroundImage:`url(${stat.banner_url})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize : 'contain'
              }}>
              <Card className='thumb-paper'>
                <CardMedia
                  component="img"
                  image={props.info.img}
                  alt={props.info.name}
                />
                <CardContent>
                  <Typography variant='h5' textAlign='center'>
                    {props.info.name}
                  </Typography>
                  <TableContainer>
                  <Table size="small" aria-label="a dense table">
                  <TableBody>
                    <TableRow>
                    <TableCell><b>구독자 수</b></TableCell>
                    <TableCell align='right'>{stat.sub_count}명</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell><b>영상 수</b></TableCell>
                    <TableCell align='right'>{stat.vid_count}개</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell><b>조회 수</b></TableCell>
                    <TableCell align='right'>{stat.view_count}회</TableCell>
                    </TableRow>
                  </TableBody>
                  </Table>
                  </TableContainer>
                  {/* <Typography variant="body1" textAlign='center'>
                  <b>구독자</b> : {stat.sub_count}명
                  </Typography> */}
                  &nbsp;
                </CardContent>
              </Card>
            </Container>
            <Toolbar sx={{justifyContent:'center'}}>
            <Button variant="contained" onClick={()=>{
              window.localStorage.setItem("channel_id", props.info.id)
              window.localStorage.setItem("channel_img", props.info.img)
              window.localStorage.setItem("channel_name", props.info.name)
              window.localStorage.setItem("banner", stat.banner_url)
              window.location.href = '/analyze'
            }}>이 채널 분석하기</Button>
            </Toolbar>
            </div>
            }
            
        </div>
    );
}