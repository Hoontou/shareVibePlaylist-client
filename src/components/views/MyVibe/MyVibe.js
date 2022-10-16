import NavBar from '../../common/NavBar/NavBar';
import { Card, Col, Typography, Row } from 'antd';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import LoginPage from '../LoginPage/LoginPage';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
const { Title } = Typography;
const { Meta } = Card;
const MyVibe = () => {
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [plis, setPlis] = useState([]);
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
  const comment = !localStorage.getItem('userData')
    ? null
    : JSON.parse(localStorage.getItem('userData')).comment || '너 납치된거야';
  const gender = !localStorage.getItem('userData')
    ? null
    : JSON.parse(localStorage.getItem('userData')).gender || 'gen';
  let gen = '';
  if (gender == 'N') {
    gen = '??';
  }
  if (gender == 'M') {
    gen = '남';
  }
  if (gender == 'F') {
    gen = '여';
  }
  const birth = !localStorage.getItem('userData')
    ? null
    : JSON.parse(localStorage.getItem('userData')).birthyear || 'birth';
  const old = 2023 - parseInt(birth);
  const userId = !localStorage.getItem('userData')
    ? null
    : JSON.parse(localStorage.getItem('userData')).id || 'id';
  const Nick = !localStorage.getItem('userData')
    ? null
    : JSON.parse(localStorage.getItem('userData')).nickname;
  const profileImg = !localStorage.getItem('userData')
    ? null
    : JSON.parse(localStorage.getItem('userData')).profile_image;

  const checkAuth = (callbackFunc) => {
    axios.post('/api/users/auth', { id: userId }).then((res) => {
      if (res.data.auth == 0) {
        logout();
      }
      if (res.data.auth == 1) {
        callbackFunc();
      }
    });
  };
  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const edit = () => {
    navigate('/changeinfo');
    // setMsg('닉네임과 사진은 네이버에서 변경 후 다시 로그인 해주세요.');
    // handleOpen();
  };

  const getMyPli = () => {
    axios
      .post('/api/users/getfavorite', {
        id: userId,
      })
      .then((res) => {
        if (res.data.success === 2) {
          setPlis([...res.data.likePli]);
        } else if (res.data.success === 1) {
          setMsg('서버에 오류가 생겨 정보를 가져오지 못했어요..');
          handleOpen();
        } else if (res.data.success === 0) {
          setMsg(
            '마음에 드는 플리에 좋아요를 눌러보세요. 보관함에서 모아볼 수 있어요.'
          );
          handleOpen();
        }
      });
  };

  useEffect(() => {
    checkAuth(getMyPli);
  }, []);

  const renderCards = plis.map((pli, index) => {
    return (
      <Col lg={6} md={8} xs={12} key={index}>
        <div style={{ position: 'relative' }}>
          <a href={`/plis/${pli._id}`}>
            <img
              style={{ width: '100%' }}
              alt='thumbnail'
              src={`${pli.thum}`}
            />
          </a>
        </div>
        <div style={{ paddingTop: '0.3rem', paddingBottom: '1rem' }}>
          <Meta title={pli.title} />
          <span>
            {pli.subTitle}, Likes:{pli.likes}{' '}
          </span>
        </div>
      </Col>
    );
  });

  return !localStorage.getItem('userData') ? (
    <LoginPage />
  ) : (
    <div>
      <div
        style={{ width: '85%', margin: '1.5rem auto', paddingBottom: '3.5rem' }}
      >
        <div>
          <Grid container spacing={4}>
            <Grid item xs={5}>
              <div
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '70%',
                  overflow: 'hidden',
                  marginBottom: '0.2rem',
                  marginLeft: '-0.2rem',
                }}
              >
                <img
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  src={profileImg}
                  alt='profile'
                />
              </div>
            </Grid>
            <Grid item xs={7}>
              <div>
                <p style={{ fontSize: '1.2rem' }}>"{comment}"</p>{' '}
                <p>
                  {old}세, {gen}
                </p>
              </div>
            </Grid>
          </Grid>
          <div>
            <Title level={3} style={{ display: 'inline-block' }}>
              {Nick}님의 저장소
              <EditIcon fontSize='mideum' onClick={edit} />
            </Title>
            <hr style={{ marginTop: '-0.5rem' }} />
          </div>
        </div>
        <div>
          <Row gutter={16}>{renderCards}</Row>
        </div>
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
      <NavBar value={4} />
    </div>
  );
};

export default MyVibe;
