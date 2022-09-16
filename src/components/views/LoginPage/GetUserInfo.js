import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { naverLogin } from './naverLogin';
import NavBar from '../../common/NavBar/NavBar';
import Modal from '@mui/material/Modal';
import { Typography } from 'antd';
import Box from '@mui/material/Box';

const GetUserInfo = (props) => {
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

  const navigate = useNavigate();
  const location = useLocation();
  const [spin, setSpin] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const postUserData = (data) => {
    axios.post('/api/users/register', { data }).then((res) => {
      if (res.data.success) {
        localStorage.setItem('userData', JSON.stringify(data));
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
    if (!location.hash) {
      //토큰이 없으면 정상적인 접속이 아니므로 로그인 페이지로 이동.
      navigate('/login');
    } else if (localStorage.getItem('userData')) {
      //유저정보 있으면 랜딩으로 이동
      navigate('/');
    } else {
      naverLogin.getLoginStatus(function (status) {
        if (status) {
          console.log('1');
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
  }, []);

  //랜덤으로 가사 하나 뽑아서 보여주면서 원 1~2초동안 돌리고 다음으로 넘어가면 좋을듯.
  return (
    <div className='container text-center'>
      {spin && (
        <svg class='spinner' viewBox='0 0 50 50'>
          <circle
            class='path'
            cx='25'
            cy='25'
            r='20'
            fill='none'
            stroke-width='5'
          ></circle>
        </svg>
      )}
      <div style={{ position: 'absolute', bottom: '50%' }}>
        <h4>상처를치료해줄사람어디없나</h4>
        <h4>가만히놔두다간끊임없이덧나</h4>
        <p>네이버에서 사용자 정보를 가져오는중...</p>
      </div>
      <NavBar value={4} />
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

export default GetUserInfo;
