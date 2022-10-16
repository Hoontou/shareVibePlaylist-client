import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../common/NavBar/NavBar';
import example from '../../../img/001.png';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import LoginPage from '../LoginPage/LoginPage';
import './PostPli.scss';

function PostPli() {
  const navigate = useNavigate();
  const [Url, setUrl] = useState('');
  const [spin, setSpin] = useState(false);
  const [open, setOpen] = useState(false);
  const [messege, setMessege] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userId = !localStorage.getItem('userData')
    ? null
    : JSON.parse(localStorage.getItem('userData')).id;

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
  const checkAuth = () => {
    axios.post('/api/users/auth', { id: userId }).then((res) => {
      if (res.data.auth == 0) {
        logout();
      }
    });
  };
  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const onUrlHandler = (event) => {
    setUrl(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setSpin(true);
    axios
      .post(
        '/api/pli/postpli',
        {
          url: Url,
        },
        { headers: { 'Access-Control-Allow-Origin': '*' } }
      )
      .then((res) => {
        if (res.data.success === 0) {
          setSpin(false);
          navigate(`/plis/${res.data.pliData._id}`);
        } else if (res.data.success === 1) {
          setSpin(false);
          navigate(`/plis/${res.data.item._id}`);
        } else if (res.data.success === 2) {
          setSpin(false);
          setMessege(
            '현재 서버에 문제가 있어요 ㅜㅜ 나중에 다시 시도해 주세요..'
          );
          handleOpen();
        } else if (res.data.success === 3) {
          setSpin(false);
          setMessege(
            '입력한 주소에서 데이터를 가져올 수 없어요. 바이브의 주소가 아니거나 지금 서버에 문제가 있어요.'
          );
          handleOpen();
        }
      });
  };
  useEffect(() => {
    checkAuth();
    if (userId !== 'KZMTB7q2ldVJqtcmEx_6EhAq39EzQnTeJMYhNQFfksc') {
      alert('지금은 서버관리 때문에 관리자만 접근할 수 있어요 ㅜㅜ');
      navigate('/');
    }
  });

  return !localStorage.getItem('userData') ? (
    <LoginPage />
  ) : (
    <div className='container text-center'>
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
      <div
        style={{ width: '95%', margin: '1.5rem auto', paddingBottom: '5rem' }}
      >
        <div style={{ width: '100%' }}>
          <img
            alt='example'
            src={example}
            style={{
              maxWidth: '500px',
              width: '100%',
              height: 'auto',
              borderRadius: '9px',
            }}
          />
        </div>
        <hr />
        <p>바이브 웹에서 가져올 플리의</p>{' '}
        <p>주소를 통째로 복사해 붙여넣어 주세요.</p>
        <p>버튼은 한번만 누르고 기다려주세요 :)</p>
        <form onSubmit={onSubmitHandler} style={{ margin: '2rem 0 0 0' }}>
          <div className='input-group mb-3'>
            <input
              onChange={onUrlHandler}
              type='url'
              className='form-control'
              placeholder='그대 입술이 다가오기를 멈추지 않아'
              aria-label='그대 입술이 다가오기를 멈추지 않아'
              aria-describedby='button-addon2'
            />
            <button
              className='btn btn-outline-secondary'
              type='submit'
              id='button-addon2'
            >
              추가
            </button>
          </div>
        </form>
        <NavBar value={3} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            저장에 실패했어요
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {messege}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default PostPli;
