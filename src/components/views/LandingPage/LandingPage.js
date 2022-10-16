import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Typography, Row } from 'antd';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavBar from '../../common/NavBar/NavBar';
import Button from '@mui/material/Button';
import LoginPage from '../LoginPage/LoginPage';
import './LandingPage.scss';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;
const { Meta } = Card;
const LandingPage = () => {
  const navigate = useNavigate();
  const [plis, setPlis] = useState([]);
  const [Align, setAlign] = useState('Latest Updated');
  const [page, setPage] = useState(1);
  const [spin, setSpin] = useState(false);
  const userId = !localStorage.getItem('userData')
    ? null
    : JSON.parse(localStorage.getItem('userData')).id;

  //정렬옵션이 바뀌면 플리 스테이트랑 페이지 스테이트를 기본으로 바꿔줌.
  //그리고 정렬옵션이 바꼈으므로 useEffect가 실행해서 정렬옵션에 맞춰서 1페이지 불러옴
  const setLatest = () => {
    setPlis([]);
    setPage(1);
    setAlign('Latest Updated');
  };
  const setOldest = () => {
    setPlis([]);
    setPage(1);
    setAlign('Oldest Updated');
  };
  const setFavorite = () => {
    setPlis([]);
    setPage(1);
    setAlign('Number of favorite');
  };
  const spining = () => {
    setSpin(true);
    setTimeout(() => {
      setSpin(false);
    }, 800);
  };
  const loadMoreItems = () => {
    if (Align === 'Latest Updated') {
      fetchPlisLatest();
      setPage(page + 1);
    } else if (Align === 'Oldest Updated') {
      fetchPlisOldest();
      setPage(page + 1);
    } else if (Align === 'Number of favorite') {
      fetchPlisFavorite();
      setPage(page + 1);
    }
  };
  const checkAuth = (callbackFunc) => {
    axios.post('/api/users/auth', { id: userId }).then((res) => {
      if (res.data.auth == 0) {
        logout();
      }
      if (res.data.auth == 1) {
        callbackFunc();
        spining();
      }
    });
  };
  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // [...plis, ...res]이거는 기존 리스트 뒤에 계속해서 넣어준다는 뜻임.
  // 새로 불러 올 때마다 뒤에 넣어줌
  const fetchPlisLatest = () => {
    axios
      .post('/api/pli/getPlis/latest', {
        pageNum: page,
      })
      .then((res) => {
        if (res.data.success) {
          setPlis([...plis, ...res.data.plis]);
          //다음엔 2페이지 불러와라는 뜻
        } else {
          alert('플리 가져오기 실패');
        }
      });
  };
  const fetchPlisFavorite = () => {
    axios
      .post('/api/pli/getPlis/favorite', {
        pageNum: page,
      })
      .then((res) => {
        if (res.data.success) {
          setPlis([...plis, ...res.data.plis]);
        } else {
          alert('플리 가져오기 실패');
        }
      });
  };
  const fetchPlisOldest = () => {
    axios
      .post('https://share-vibe-pli.herokuapp.com/api/pli/getPlis/oldest', {
        pageNum: page,
      })
      .then((res) => {
        if (res.data.success) {
          setPlis([...plis, ...res.data.plis]);
        } else {
          alert('플리 가져오기 실패');
        }
      });
  };
  useEffect(() => {
    checkAuth(loadMoreItems);
    //로컬스토리지에 유저정보 없으면 로그인페이지로 이동

    //정렬 옵션이 바뀔 때 마다 실행
  }, [Align]); // Align이랑 value가 바뀔 때 마다 loaditems 실행, 검색어가 바뀔때 마다 새로고침해줌
  // 더 빠릿빠릿한 검색 구현함.

  //유저가 만든 플리는 thum 배열에 이미지가 네개인데, 만약 플리.thum이 한개가 아니라면 div안에
  //이미지 네개를 넣어주도록 나중에 수정할 예정.
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
            {pli.subTitle}, Likes:{pli.likes}
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
        <Title level={3} style={{ display: 'inline-block' }}>
          {Align}
        </Title>
        <NavDropdown
          style={{
            display: 'inline-block',
            float: 'right',
            paddingLeft: '1rem',
          }}
          id='nav-dropdown-dark-example'
          title='정렬'
          menuVariant='dark'
        >
          {/*누르면 정렬옵션을 바꿔줌*/}
          {Align !== 'Latest Updated' && (
            <NavDropdown.Item onClick={setLatest}>
              최근 추가된 순
            </NavDropdown.Item>
          )}
          {Align !== 'Number of favorite' && (
            <NavDropdown.Item onClick={setFavorite}>좋아요 순</NavDropdown.Item>
          )}
          {Align !== 'Oldest Updated' && (
            <NavDropdown.Item onClick={setOldest}>오래된 순</NavDropdown.Item>
          )}
        </NavDropdown>
        <hr />
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
      <div style={{ width: '85%', margin: '1.5rem auto' }}>
        <Row gutter={16}>{renderCards}</Row>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '5rem',
        }}
      >
        <Button variant='outlined' size='small' onClick={loadMoreItems}>
          Load more
        </Button>
      </div>
      <NavBar value={0} />
    </div>
  );
};

export default LandingPage;
