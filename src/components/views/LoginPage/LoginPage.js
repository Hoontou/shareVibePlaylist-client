import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { naverLogin } from './naverLogin';
import './LoginPage.css';
import vibeImg from '../../../img/002.jpg';
const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //로컬스토리지에 이미 유저정보가 있는데 로그인 페이지 접근하면  /  로 이동
    if (localStorage.getItem('userData')) {
      navigate('/');
    } else {
      naverLogin.init();
    }
  });

  return (
    <div className='container text-center'>
      <div style={{ width: '90%', margin: '1.5rem auto' }}>
        <div style={{ width: '100%' }}>
          <img
            alt='example'
            src={vibeImg}
            style={{
              maxWidth: '500px',
              width: '100%',
              height: 'auto',
              borderRadius: '9px',
            }}
          />
        </div>
      </div>
      <div style={{ position: 'relative', top: '150px' }}>
        <h2 className='stagger-1'>네이버 바이브</h2>
        <h1 className='stagger-1'>플레이리스트 저장소</h1>
        <p className='stagger-2'>플리 바다에서 취향에 맞는 플리를 찾아봐요</p>
      </div>
      <div
        className='login-area stagger-3'
        style={{ position: 'relative', top: '150px' }}
      >
        <div id='button_area'>
          <div id='naverIdLogin'></div>
        </div>
      </div>
      <div>
        <p
          style={{ fontSize: '0.6rem', position: 'relative', top: '170px' }}
          className='stagger-4'
        >
          <p>모바일 화면에 최적화</p>
          <p>대학생 토이프로젝트이며 주기적으로 개선중 입니다.</p>
          <p>각종 오류제보, 기능건의 등등</p>
          <p>hoontou@gmail.com</p>
          <p>using MERN stack</p>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
