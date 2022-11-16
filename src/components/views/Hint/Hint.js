import NavBar from '../../common/NavBar/NavBar';
import img1 from '../../../img/003.jpg';
import img2 from '../../../img/004.jpg';
import { textAlign, width } from '@mui/system';

const Hint = () => {
  return (
    <div>
      <div
        style={{ width: '85%', margin: '1.5rem auto', paddingBottom: '3rem' }}
      >
        <div
          style={{ width: '80%', margin: '1.5rem auto', textAlign: 'center' }}
        >
          <img
            src={img1}
            style={{
              width: '100%',
              minWidth: '200px',
              maxWidth: '400px',
              marginBottom: '15px',
            }}
          />
          <p>
            크롬 or 사파리에서 홈 화면에 추가를 하면 어플처럼 사용할 수 있어요.
          </p>
        </div>
        <div
          style={{ width: '80%', margin: '1.5rem auto', textAlign: 'center' }}
        >
          <img
            src={img2}
            style={{
              width: '100%',
              minWidth: '200px',
              maxWidth: '400px',
              marginBottom: '15px',
            }}
          />
          <p>
            플리를 살펴보고 앱으로 열기를 누르면 바이브 앱에서 볼 수 있어요.
          </p>
        </div>
      </div>
      <NavBar value={4} />
    </div>
  );
};

export default Hint;
