import NavBar from '../../common/NavBar/NavBar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Typography, Row } from 'antd';
import img from '../../../img/002.jpg';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;
const { Meta } = Card;

const Collections = () => {
  const navigate = useNavigate();
  const [coll, setColl] = useState([]);
  const [spin, setSpin] = useState(true);
  const userId = !localStorage.getItem('userData')
    ? null
    : JSON.parse(localStorage.getItem('userData')).id;
  // const loadMoreItems = () => {
  //   axios.post('/api/pli/getPlis/search', {}).then((res) => {
  //     if (res.data.success) {
  //       setPlis([...res.data.plis]);
  //     } else {
  //       alert('플리 가져오기 실패');
  //     }
  //   });
  // };
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

  const loadCollections = () => {
    axios.get('/api/users/getcollections').then((res) => {
      setColl([...res.data.collections]);
      setSpin(false);
    });
  };
  useEffect(() => {
    if (userId == null) {
      navigate('/login');
    }
    checkAuth(loadCollections);
  }, []);

  const renderCards = coll.map((value, index) => {
    return (
      <Col lg={6} md={8} xs={12} key={index}>
        <div style={{ position: 'relative' }}>
          <a href={`/users/${value._id}/${value.nickname}`}>
            <img style={{ width: '100%' }} alt='thumbnail' src={img} />
          </a>
        </div>
        <div style={{ paddingTop: '0.3rem', paddingBottom: '1rem' }}>
          <Meta title={`${value.nickname}의 컬렉션`} />
          <span>{value.likeList.length} items</span>
        </div>
      </Col>
    );
  });

  return (
    <div>
      <div
        style={{ width: '85%', margin: '3rem auto', paddingBottom: '3.5rem' }}
      >
        <Title level={3} style={{ display: 'inline-block' }}>
          다른 유저의 컬렉션
        </Title>
        <hr />

        <Row gutter={16}>{renderCards}</Row>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      ></div>
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
      <NavBar value={2} />
    </div>
  );
};

export default Collections;
