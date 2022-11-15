import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { naverLogin } from './naverLogin';
import './LoginPage.css';
import vibeImg from '../../../img/002.jpg';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Typography } from 'antd';
const LoginPage = () => {
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const postUserData = (data) => {
    axios.post('/api/users/register', { data }).then((res) => {
      if (res.data.success == 1) {
        localStorage.setItem('userData', JSON.stringify(res.data.userData));
        localStorage.removeItem('com.naver.nid.oauth.state_token');
        localStorage.removeItem('com.naver.nid.access_token');
        navigate('/changeinfo');
      } else if (res.data.success == 2) {
        localStorage.setItem('userData', JSON.stringify(res.data.userData));
        localStorage.removeItem('com.naver.nid.oauth.state_token');
        localStorage.removeItem('com.naver.nid.access_token');
        navigate('/');
      } else {
        setMsg(
          '서버에 문제가 있어 로그인에 실패했어요. 나중에 다시 들러주세요 ㅜㅜ'
        );
        handleOpen();
      }
    });
  };

  useEffect(() => {
    //로컬스토리지에 이미 유저정보가 있는데 로그인 페이지 접근하면  /  로 이동
    if (localStorage.getItem('userData')) {
      navigate('/');
    } else {
      naverLogin.init();
      naverLogin.getLoginStatus(function (status) {
        if (status) {
          const userData = {
            id: naverLogin.user.id,
            nickname: naverLogin.user.nickname,
            birthyear: naverLogin.user.birthyear,
            profile_image: naverLogin.user.profile_image,
            gender: naverLogin.user.gender,
          };
          postUserData(userData);
        }
      });
    }
  });

  return (
    <div className='container text-center'>
      <div style={{ width: '90%', margin: '1.5rem auto' }}>
        <div style={{ width: '100%' }}>
          <img
            alt='example'
            src={vibeImg}
            style={{
              marginTop: '50px',
              marginBottom: '-80px',
              maxWidth: '500px',
              width: '100%',
              height: 'auto',
              borderRadius: '9px',
            }}
          />
        </div>
      </div>
      <div style={{ position: 'relative', top: '150px' }}>
        <h5 className='stagger-1'>바이브 사용자를 위한</h5>
        <h1 className='stagger-1'>플레이리스트 저장소</h1>
        {/*<p className='stagger-2'>플리 바다에서 취향에 맞는 플리를 찾아봐요</p>*/}
      </div>
      <div
        className='login-area stagger-3'
        style={{ position: 'relative', top: '150px' }}
      >
        <div id='button_area'>
          <div id='naverIdLogin'></div>
        </div>
      </div>
      <div>
        <p
          style={{ fontSize: '0.6rem', position: 'relative', top: '170px' }}
          className='stagger-4'
        >
          <p style={{ fontSize: '1rem' }}>
            대학생 토이프로젝트이며 네이버와는 관련 없습니다.
          </p>
          <p>모바일 화면에 최적화</p>

          <p>각종 오류제보, 기능건의 등등</p>
          <p>hoontou@gmail.com</p>
          <p>using MERN stack</p>
        </p>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {msg}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginPage;
