import NavBar from '../../common/NavBar/NavBar';
import { Card, Col, Typography, Row } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Follow from './Follow';
const { Title } = Typography;
const { Meta } = Card;

const UserColl = () => {
  const navigate = useNavigate();
  let urlParams = useParams();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [plis, setPlis] = useState([]);
  const [spin, setSpin] = useState(true);
  const [msg, setMsg] = useState('');
  const [profileImg, setProf] = useState('');
  const [gender, setGender] = useState('');
  const [birthyear, setBirthyear] = useState(0);
  const [comment, setComment] = useState('');
  const userId = !localStorage.getItem('userData')
    ? null
    : JSON.parse(localStorage.getItem('userData')).id;
  const nick = !localStorage.getItem('userData')
    ? null
    : JSON.parse(localStorage.getItem('userData')).nickname;

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

  const checkAuth = (callbackFunc1, callbackFunc2, param) => {
    axios.post('/api/users/auth', { id: userId }).then((res) => {
      if (res.data.auth == 0) {
        logout();
      }
      if (res.data.auth == 1) {
        callbackFunc1(param);
        callbackFunc2(param);
      }
    });
  };
  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const getUserInfo = (id) => {
    axios.post('/api/users/getuserinfo', { _id: id._id }).then((res) => {
      if (res.data.success) {
        const old = 2023 - parseInt(res.data.userData.birthyear);
        let gen = '';
        if (res.data.userData.gender == 'N') {
          gen = '??';
        }
        if (res.data.userData.gender == 'M') {
          gen = '남';
        }
        if (res.data.userData.gender == 'F') {
          gen = '여';
        }
        setBirthyear(old);
        setProf(res.data.userData.profile_image);
        setGender(gen);
        if (res.data.userData.comment == '') {
          setComment('너 납치된거야');
        } else {
          setComment(res.data.userData.comment);
        }
      } else if (!res.data.success) {
        navigate('/collections');
      }
    });
  };

  const getPli = (id) => {
    axios
      .post('/api/users/getfavorite', {
        _id: id._id,
      })
      .then((res) => {
        if (res.data.success == 2) {
          setPlis([...res.data.likePli]);
          setSpin(false);
        } else if (res.data.success == 1) {
          setMsg('서버에 오류가 생겨 정보를 가져오지 못했어요..');
          setSpin(false);
          handleOpen();
        }
      });
  };

  useEffect(() => {
    if (userId == null) {
      navigate('/login');
    }
    if (urlParams.nickname == nick) {
      navigate('/myvibe');
    }
    checkAuth(getPli, getUserInfo, urlParams);
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
            {pli.subTitle}, 좋아요:{pli.likes}{' '}
          </span>
        </div>
      </Col>
    );
  });

  return (
    <div>
      <div
        style={{ width: '85%', margin: '1.5rem auto', paddingBottom: '3.5rem' }}
      >
        <div>
          <Grid container spacing={4}>
            <Grid item xs={4.5}>
              <div
                style={{
                  width: '130px',
                  height: '130px',
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
            <Grid item xs={7.5}>
              <div>
                <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>
                  "{comment}"
                </p>
                <p>
                  {birthyear}세, {gender}
                </p>
                <div>
                  <Follow userId={userId} _id={urlParams._id} />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <Title level={3} style={{ display: 'inline-block' }}>
            {`${urlParams.nickname}의 컬렉션`}
          </Title>
          <hr style={{ marginTop: '-0.5rem' }} />
        </div>
        <div>
          <Row gutter={16}>{renderCards}</Row>
        </div>
      </div>
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
      <NavBar value={2} />
    </div>
  );
};

export default UserColl;
