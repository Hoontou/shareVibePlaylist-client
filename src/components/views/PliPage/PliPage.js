//추후 좋아요 버튼을 팔로우버튼과 같이 리팩토링 해야함
//근데 좋아요 버튼 만들면서 자식과 부모간의 state공유하는법을 익힘
//리덕스로 구현하면 쉽다는데?

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Favorite from './Favorite';
import NavBar from '../../common/NavBar/NavBar';
import LoginPage from '../LoginPage/LoginPage';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import LikedPeople from './LikedPeople';

const PliPage = (props) => {
  const navigate = useNavigate();
  let _id = useParams();
  const [open, setOpen] = useState(false);
  const [people, setPeople] = useState([]);
  const [spin, setSpin] = useState(true);
  const [Url, setUrl] = useState('');
  const [num, setNum] = useState(); //자식에게서 데이터 받기, props로 부모의 useState함수를 넘겨주고
  //자식에서 'props.부모의state함수' 를 실행한다.
  //https://velog.io/@soral215/React-%EC%9E%90%EC%8B%9D-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%97%90%EC%84%9C-%EB%B6%80%EB%AA%A8%EB%A1%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B3%B4%EB%82%B4%EA%B8%B0
  const userId = !localStorage.getItem('userData')
    ? null
    : JSON.parse(localStorage.getItem('userData')).id;

  const handleClickOpen = () => {
    if (num !== 0) {
      setSpin(true);
      axios.post('/api/favorite/likedpeople', { _id: _id._id }).then((res) => {
        setPeople(res.data.list);
        setSpin(false);
        setOpen(true);
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkAuth = (callbackFunc, id) => {
    axios.post('/api/users/auth', { id: userId }).then((res) => {
      if (res.data.auth == 0) {
        logout();
      }
      if (res.data.auth == 1) {
        callbackFunc(id);
      }
    });
  };
  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };
  const getPli = (_id) => {
    let body = {
      _id: _id._id,
    };
    axios.post('/api/pli/getpli', body).then((res) => {
      setUrl(res.data.pli.url);
    });
  };

  useEffect(() => {
    if (userId == null) {
      navigate('/login');
    }
    checkAuth(getPli, _id);
  });
  return (
    <div style={{ width: '100%', margin: '0', paddingBottom: '3.5rem' }}>
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
                바이브 웹으로
              </a>
            </div>
          </Button>
        </Grid>
        <Grid item xs={5}>
          <div className='text-center'>
            {localStorage.getItem('userData') && (
              <Favorite
                setSpin={setSpin}
                spin={spin}
                setNum={setNum}
                num={num}
                pliId={_id._id}
              />
            )}

            <Button
              onClick={handleClickOpen}
              variant='outlined'
              style={{ marginTop: '0.8rem' }}
            >
              <a style={{ color: 'black' }}>좋아요 누른 사람</a>
            </Button>
          </div>
        </Grid>

        <Grid item xs={1}></Grid>
      </Grid>

      <LikedPeople open={open} list={people} onClose={handleClose} num={num} />
      {spin && (
        <svg className='spinner' viewBox='0 0 50 50'>
          <circle
            className='path'
            cx='25'
            cy='25'
            r='20'
            fill='none'
            strokeWidth='5'
          ></circle>
        </svg>
      )}
      <NavBar value={0} />
    </div>
  );
};

export default PliPage;
