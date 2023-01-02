import { useEffect, useState } from 'react';
import { Typography } from 'antd';
import NavBar from '../../common/NavBar/NavBar';
import { TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

const ChangeInfo = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem('userData');
  const user = JSON.parse(userData);
  const userId = !localStorage.getItem('userData')
    ? null
    : JSON.parse(localStorage.getItem('userData')).id;
  const [yearold, setYearold] = useState(`${2023 - parseInt(user.birthyear)}`);
  const [gender, setGender] = useState(user.gender);
  const [nickname, setNickname] = useState(user.nickname);
  const [comment, setComment] = useState('');
  const [open, setOpen] = useState(true);
  const handleOpen = (fn) => {
    setOpen(true);
    if (fn) {
      fn();
    }
  };
  const handleClose = () => setOpen(false);
  const [spin, setSpin] = useState(false);
  const [msg, setMsg] = useState(
    '###지금은 사용 불가능###     다른 사용자에게 보여지는 내 정보를 마음대로 바꿀 수 있어요. 프로필 사진은 네이버에서 변경 후 다시 로그인 하면 변경돼요.'
  );
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

  const onChangeN = (e) => {
    setNickname(e.target.value);
  };
  const onChangeY = (e) => {
    setYearold(e.target.value);
  };
  const onChangeG = (e) => {
    setGender(e.target.value);
  };
  const onChangeC = (e) => {
    setComment(e.target.value);
    console.log();
  };

  const failMsg = () => {
    setMsg('조건에 맞게 작성해 주세요!');
    handleOpen();
  };

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const onClick = () => {
    const old = 2023 - parseInt(yearold);
    const gen = gender.toUpperCase();
    //실패조건
    if (nickname.length > 10) {
      failMsg();
      return 0;
    }
    if (typeof old !== 'number') {
      failMsg();
      return 0;
    }
    if (old >= 2018 || old <= 1923) {
      failMsg();
      return 0;
    }
    if (gen !== 'F' && gen !== 'M' && gen !== 'N') {
      failMsg();
      return 0;
    }
    if (comment.length > 22) {
      failMsg();
      return 0;
    }
    //통과 시
    setSpin(true);
    let body = {
      birthyear: old,
      gender: gen,
      nickname: nickname,
      id: user.id,
      comment: comment,
    };
    axios.post('/api/users/update', body).then((res) => {
      if (res.data.success == 1) {
        setSpin(false);
        setMsg('바꾸려고 하는 닉네임이 이미 사용중이에요.');
        handleOpen();
      } else if (res.data.success == 2) {
        setSpin(false);
        localStorage.removeItem('userData');
        localStorage.setItem('userData', JSON.stringify(res.data.userData));
        navigate('/myvibe');
      } else {
        setSpin(false);
        setMsg('서버에 문제가 있어 실패했어요. 나중에 다시 시도해주세요.');
        handleOpen();
      }
    });
  };
  useEffect(() => {
    if (userId == null) {
      navigate('/login');
    }
  });

  return (
    <div>
      <div style={{ width: '85%', margin: '1.5rem auto' }}>
        <Title level={3} style={{ display: 'inline-block' }}>
          정보 변경
        </Title>
        <hr />
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <div
            style={{
              display: 'inline-block',
              width: '200px',
              height: '200px',
              borderRadius: '70%',
              overflow: 'hidden',
              marginBottom: '1.5rem',
              marginLeft: '-0.2rem',
            }}
          >
            <img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={user.profile_image}
              alt='profile'
            />
          </div>
          <TextField
            style={{ marginBottom: '2rem' }}
            margin='dense'
            fullWidth
            id='standard-basic'
            label='닉네임 (10자 제한)'
            variant='standard'
            defaultValue={nickname}
            onChange={onChangeN}
          />
          <TextField
            style={{ marginBottom: '2rem' }}
            margin='dense'
            fullWidth
            id='standard-basic'
            label='나이 (5~100)'
            variant='standard'
            defaultValue={yearold}
            onChange={onChangeY}
          />
          {/*<TextField
            style={{ marginBottom: '2rem' }}
            margin='dense'
            fullWidth
            id='standard-basic'
            label='성별 (M, F, N)'
            variant='standard'
            defaultValue={gender}
            onChange={onChangeG}
          />*/}
          <TextField
            style={{ marginBottom: '5rem' }}
            margin='dense'
            fullWidth
            id='standard-basic'
            label='코멘트 (22자 제한)'
            variant='standard'
            defaultValue={comment}
            onChange={onChangeC}
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '5rem',
        }}
      >
        <Button variant='outlined' size='small'>
          Change
        </Button>
        <Button
          style={{ marginLeft: '5rem', float: 'right' }}
          onClick={logout}
          size='small'
          variant='outlined'
          color='error'
        >
          LOGOUT
        </Button>
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
    </div>
  );
};

export default ChangeInfo;
