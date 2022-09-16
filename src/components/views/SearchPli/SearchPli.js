import NavBar from '../../common/NavBar/NavBar';
import InputGroup from 'react-bootstrap/InputGroup';
import { Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import './SearchPli.scss';
import LoginPage from '../LoginPage/LoginPage';

const { Meta } = Card;

const SearchPli = () => {
  const [plis, setPlis] = useState([]);
  const [value, setValue] = useState('');
  const [add, setAdd] = useState([]);
  const [spin, setSpin] = useState(true);

  const fetchPliSearch = () => {
    if (localStorage.getItem('userData')) {
      axios.get('/api/pli/getplis/searchpli').then((res) => {
        if (res.data.success) {
          setPlis([...res.data.plis]);
          setTimeout(() => {
            setSpin(false);
          }, 300);
        } else {
          alert('플리 가져오기 실패');
        }
      });
    }
  };
  const search = (word) => {
    let result = [];
    plis.map((pli, index) => {
      if (pli.title.includes(word)) {
        result.push(pli);
      }
      if (pli.subTitle.includes(word)) {
        result.push(pli);
      }
    });
    setAdd([...result]);
  }; // 리스트 순회하면서 단어 포함돼있는지 확인 후 결과에 추가
  const onChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    fetchPliSearch();
  }, []);
  useEffect(() => {
    if (value.length >= 2) {
      // 두글자 이상일 때 검색실행
      search(value); // 글자 바뀔때 마다 검색함
    }
  }, [value]);

  const renderCards = add.map((pli, index) => {
    return (
      <Col lg={4} md={6} xs={8} key={index}>
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
        <InputGroup className='mb-3'>
          <Form.Control
            placeholder='적적해서 서로의 전화기를 꺼내'
            onChange={onChange}
            value={value}
          />
        </InputGroup>
        <hr />
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

      <div style={{ width: '85%', margin: '1.5rem auto' }}>
        <Row gutter={16}>{renderCards}</Row>
      </div>
      {!(value.length >= 2) && (
        <div
          className='text-center'
          style={{
            justifyContent: 'center',
          }}
        >
          <p>오늘은 가지마</p>
          <p>오늘만 가지마</p>
          <p>오늘만 더 옆에 있어주면</p>
          <p>나 잊을 수 있어</p>
        </div>
      )}

      <NavBar value={1} />
    </div>
  );
};

export default SearchPli;
