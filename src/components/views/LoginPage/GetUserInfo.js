import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../common/NavBar/NavBar';
const GetUserInfo = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [spin, setSpin] = useState(true);
  const getUserData = async () => {
    const token = location.hash.split('=')[1].split('&')[0];
    await axios
      .post(
        '/api/users/register',
        {
          token,
        },
        { withCredentials: true }
      )
      .then((res) => {
        localStorage.setItem('userData', JSON.stringify(res.data));
        navigate('/myvibe');
      });
  };

  useEffect(() => {
    if (!location.hash) {
      //토큰이 없으면 정상적인 접속이 아니므로 로그인 페이지로 이동.
      navigate('/login');
    } else {
      if (localStorage.getItem('userData')) {
        navigate('/myvibe');
      } else {
        //랜덤으로 가사 하나 뽑아서 보여주면서 원 1~2초동안 돌리고 다음으로 넘어가면 좋을듯.
        setTimeout(() => {
          getUserData();
          localStorage.removeItem('com.naver.nid.oauth.state_token');
          //잔류하는 데이터 삭제한다.
        }, 3000);
      }
    }
  }, []);

  //랜덤으로 가사 하나 뽑아서 보여주면서 원 1~2초동안 돌리고 다음으로 넘어가면 좋을듯.
  return (
    <div className='container text-center'>
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
      <div style={{ position: 'absolute', bottom: '50%' }}>
        <h4>상처를치료해줄사람어디없나</h4>
        <h4>가만히놔두다간끊임없이덧나</h4>
        <p>네이버에서 사용자 정보를 가져오는중...</p>
      </div>
      <NavBar value={4} />
    </div>
  );
};

export default GetUserInfo;
