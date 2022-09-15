import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid from '@mui/material/Grid';
import { red } from '@mui/material/colors';

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
    });
  }, []);

  const onClickFavorite = () => {
    if (Favorited) {
      axios.post('/api/favorite/removeFromFavorite', body).then((res) => {
        if (res.data.success) {
          setFavoriteNumber(FavoriteNumber - 1);
          setFavorited(!Favorited);
        } else {
          alert('Favorite 리스트에서 지우는 걸 실패했습니다.');
        }
      });
    } else {
      axios.post('/api/favorite/addToFavorite', body).then((res) => {
        if (res.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert('Favorite 리스트에서 추가하는 걸 실패했습니다.');
        }
      });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid style={{ marginTop: '1rem' }} item xs={7}>
        Likes : {FavoriteNumber}
      </Grid>
      <Grid item xs={5}>
        {Favorited ? (
          <FavoriteIcon
            fontSize='large'
            sx={{ color: red[500] }}
            onClick={onClickFavorite}
          />
        ) : (
          <FavoriteBorderIcon
            fontSize='large'
            sx={{ color: red[500] }}
            onClick={onClickFavorite}
          />
        )}
        <div>&nbsp;click!</div>
      </Grid>
    </Grid>
  );
};

export default Favorite;
