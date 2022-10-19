import NavBar from '../../common/NavBar/NavBar';
import InputGroup from 'react-bootstrap/InputGroup';
import { Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import './SearchPli.scss';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const SearchPli = () => {
  const navigate = useNavigate();
  const [plis, setPlis] = useState([]);
  const [value, setValue] = useState('');
  const [add, setAdd] = useState([]);
  const [spin, setSpin] = useState(true);
  const userId = !localStorage.getItem('userData')
    ? null
    : JSON.parse(localStorage.getItem('userData')).id;
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
    //str.replace(/(\s*)/g,'')는 str의 모든 공백제거.
    // 공백제거 후 대문자 전환 후 title, subtitle과 일치하는 결과만 result에 담아준다.
    let result = [];
    plis.map((pli, index) => {
      if (
        pli.title
          .replace(/(\s*)/g, '')
          .toUpperCase()
          .includes(word.replace(/(\s*)/g, '').toUpperCase())
      ) {
        result.push(pli);
      } else if (
        pli.subTitle
          .replace(/(\s*)/g, '')
          .toUpperCase()
          .includes(word.replace(/(\s*)/g, '').toUpperCase())
      ) {
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
    if (userId == null) {
      navigate('/login');
    }
    if (value.length >= 2) {
      // 두글자 이상일 때 검색실행
      search(value); // 글자 바뀔때 마다 검색함
    } else {
      setAdd([]);
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
            {pli.subTitle}, 좋아요:{pli.likes}{' '}
          </span>
        </div>
      </Col>
    );
  });

  return (
    <div>
      <div
        style={{ width: '85%', margin: '1.5rem auto', paddingBottom: '3rem' }}
      >
        <InputGroup className='mb-3'>
          <Form.Control
            placeholder='아이유 대표곡'
            onChange={onChange}
            value={value}
          />
        </InputGroup>
        <hr />

        <Row gutter={16}>{renderCards}</Row>
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
      </div>
      <NavBar value={1} />
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

export default SearchPli;
