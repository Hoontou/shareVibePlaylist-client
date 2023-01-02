import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { naverLogin } from './naverLogin';
import './LoginPage.css';
import vibeImg from '../../../img/002.jpg';
import { Button, ButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Typography } from 'antd';
const LoginPage = () => {
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const guestId = {
    birthyear: '2021',
    gender: 'M',
    id: 'cheeze',
    nickname: '크림',
    profile_image:
      'https://phinf.pstatic.net/contact/20221018_263/1666088854001J6aBh_JPEG/image.jpg',
    comment: '시간아 멈춰',
  };
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

  const loginAsGuest = () => {
    localStorage.setItem('userData', JSON.stringify(guestId));
    navigate('/');
  };

  useEffect(() => {
    //로컬스토리지에 이미 유저정보가 있는데 로그인 페이지 접근하면  /  로 이동
    if (localStorage.getItem('userData')) {
      navigate('/');
    } else {
      naverLogin.init();
      naverLogin.getLoginStatus(function (status) {});
    }
  });
  useEffect(() => {
    setMsg(
      '저작권 이유로 네이버 로그인이 거부됐어요.. 지금은 게스트로 둘러보기만 가능해요.'
    );
    handleOpen();
  }, []);

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
        <p className='stagger-2'>취향에 맞는 플리를 찾아봐요</p>
      </div>
      <div
        className='login-area stagger-3'
        style={{ position: 'relative', top: '150px' }}
      >
        <ButtonGroup variant='outlined' aria-label='outlined button group'>
          <Button
            color={'primary'}
            onClick={loginAsGuest}
            style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}
          >
            게스트로 둘러보기
          </Button>
        </ButtonGroup>
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
