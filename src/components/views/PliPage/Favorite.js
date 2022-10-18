import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import { Button } from '@mui/material';

const Favorite = (props) => {
  const pliId = props.pliId;
  const userFrom = JSON.parse(localStorage.getItem('userData'));
  let body = {
    pliTo: pliId,
    userFrom: userFrom.id,
    _id: pliId,
  };

  const [FavoriteNumber, setFavoriteNumber] = useState();
  const [Favorited, setFavorited] = useState(false);

  useEffect(() => {
    axios.post('/api/favorite/favorited', body).then((res) => {
      if (res.data.success) {
        setFavorited(res.data.favorited);
      } else {
        alert('정보를 가져오는데 실패 했습니다.');
      }
    });

    axios.post('/api/pli/getpli', body).then((res) => {
      setFavoriteNumber(res.data.pli.likes);
      props.setNum(res.data.pli.likes); //자식에서 부모로 데이터 넘기기
      props.setSpin(false);
      //props로 부모의 useState 함수를 받아서 실행한다.
    });
  }, []);

  const onClickFavorite = () => {
    props.setSpin(true);
    if (Favorited) {
      axios.post('/api/favorite/removeFromFavorite', body).then((res) => {
        if (res.data.success) {
          setFavoriteNumber(FavoriteNumber - 1);
          props.setNum(props.num - 1);
          setFavorited(!Favorited);
        } else {
          alert('Favorite 리스트에서 지우는 걸 실패했습니다.');
        }
      });
    } else {
      axios.post('/api/favorite/addToFavorite', body).then((res) => {
        if (res.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          props.setNum(props.num + 1);
          setFavorited(!Favorited);
        } else {
          alert('Favorite 리스트에서 추가하는 걸 실패했습니다.');
        }
      });
    }
    props.setSpin(false);
  };

  return (
    <div>
      <Button
        color={Favorited ? 'error' : 'primary'}
        variant='outlined'
        onClick={onClickFavorite}
        startIcon={
          Favorited ? (
            <FavoriteIcon
              style={{ marginRight: '-0.2rem' }}
              sx={{ color: red[500] }}
            />
          ) : (
            <FavoriteBorderIcon
              style={{ marginRight: '-0.2rem' }}
              sx={{ color: red[500] }}
            />
          )
        }
      >
        {FavoriteNumber} {Favorited ? 'Liked' : 'Like'}
      </Button>
    </div>
  );
};

export default Favorite;
