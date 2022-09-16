import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Favorite from './Favorite';
import NavBar from '../../common/NavBar/NavBar';
import LoginPage from '../LoginPage/LoginPage';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import EastIcon from '@mui/icons-material/East';
const PliPage = (props) => {
  let _id = useParams();

  const [Url, setUrl] = useState('');

  const getPli = (_id) => {
    let body = {
      _id: _id._id,
    };
    axios
      .post('https://share-vibe-pli.herokuapp.com/api/pli/getpli', body)
      .then((res) => {
        setUrl(res.data.pli.url);
      });
  };
  useEffect(() => {
    getPli(_id);
  });
  return !localStorage.getItem('userData') ? (
    <LoginPage />
  ) : (
    <div style={{ width: '100%', margin: '0' }}>
      <div
        style={{
          width: '95%',
          height: '70vh',
          margin: '0 auto',
        }}
      >
        <iframe
          title='player'
          src={Url}
          style={{
            width: '100%',
            height: '100%',
            margin: '1rem auto',
          }}
        ></iframe>
      </div>
      <hr />
      <Grid container spacing={5}>
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <Button
            endIcon={<EastIcon />}
            variant='outlined'
            style={{ marginTop: '0.8rem' }}
          >
            <div className='text-center'>
              <a style={{ color: 'black' }} href={Url} target='_blank'>
                바이브에서
                <br />
                저장하러 가기
              </a>
            </div>
          </Button>
        </Grid>
        <Grid item xs={5}>
          <div className='text-center' style={{ marginTop: '0.7rem' }}>
            {localStorage.getItem('userData') && <Favorite pliId={_id._id} />}
          </div>
        </Grid>

        <Grid item xs={1}></Grid>
      </Grid>

      <NavBar value={0} />
    </div>
  );
};

export default PliPage;
