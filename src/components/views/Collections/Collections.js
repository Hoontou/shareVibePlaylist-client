import NavBar from '../../common/NavBar/NavBar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Typography, Row } from 'antd';
import img from '../../../img/002.jpg';
import LoginPage from '../LoginPage/LoginPage';
const { Title } = Typography;
const { Meta } = Card;

const Collections = () => {
  const [coll, setColl] = useState([]);

  // const loadMoreItems = () => {
  //   axios.post('/api/pli/getPlis/search', {}).then((res) => {
  //     if (res.data.success) {
  //       setPlis([...res.data.plis]);
  //     } else {
  //       alert('플리 가져오기 실패');
  //     }
  //   });
  // };
  const loadCollections = () => {
    axios.get('/api/users/getcollections').then((res) => {
      setColl([...res.data.collections]);
      console.log(res.data);
    });
  };
  useEffect(() => {
    loadCollections();
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

  return !localStorage.getItem('userData') ? (
    <LoginPage />
  ) : (
    <div>
      <div style={{ width: '85%', margin: '3rem auto' }}>
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
      <NavBar value={2} />
    </div>
  );
};

export default Collections;
