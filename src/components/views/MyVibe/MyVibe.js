import NavBar from '../../common/NavBar/NavBar';
import { Card, Col, Typography, Row } from 'antd';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import LoginPage from '../LoginPage/LoginPage';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;
const { Meta } = Card;
const MyVibe = () => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem('userData')).id || 'id';
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

  const Nick = JSON.parse(localStorage.getItem('userData')).nickname;
  const profileImg = JSON.parse(localStorage.getItem('userData')).profile_image;

  const edit = () => {
    setMsg('닉네임과 사진은 네이버에서 변경 후 다시 로그인 해주세요.');
    handleOpen();
  };

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const getMyPli = () => {
    axios.post('/api/users/getfavorite', { id: userId }).then((res) => {
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
    getMyPli();
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
      <div style={{ width: '85%', margin: '1.5rem auto' }}>
        <div>
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '70%',
              overflow: 'hidden',
              marginBottom: '0.2rem',
              marginLeft: '-0.2rem',
            }}
          >
            <img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={profileImg}
            />
          </div>
          <div>
            <Title level={3} style={{ display: 'inline-block' }}>
              {Nick}님의 저장소
              <EditIcon fontSize='small' onClick={edit} />
              <Button
                style={{ marginLeft: '0.5rem', float: 'right' }}
                onClick={logout}
                size='small'
                variant='outlined'
              >
                로그아웃
              </Button>
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
