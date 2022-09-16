import NavBar from '../../common/NavBar/NavBar';
import { Card, Col, Typography, Row } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import LoginPage from '../LoginPage/LoginPage';
import { useParams } from 'react-router-dom';
const { Title } = Typography;
const { Meta } = Card;

const UserColl = () => {
  let urlParams = useParams();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [plis, setPlis] = useState([]);
  const [spin, setSpin] = useState(true);
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

  const getPli = (id) => {
    axios
      .post('/api/users/getfavorite', {
        _id: id._id,
      })
      .then((res) => {
        if (res.data.success === 2) {
          setPlis([...res.data.likePli]);
          setSpin(false);
        } else if (res.data.success === 1) {
          setMsg('서버에 오류가 생겨 정보를 가져오지 못했어요..');
          setSpin(false);
          handleOpen();
        }
      });
  };

  useEffect(() => {
    getPli(urlParams);
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
