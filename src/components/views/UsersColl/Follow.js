import { Button, ButtonGroup } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import axios from 'axios';
import { useEffect, useState } from 'react';
import FollowPeople from './FollowPeople';

const Follow = (props) => {
  const [followNum, setFollowNum] = useState(0);
  const [followList, setFollowList] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [open, setOpen] = useState(false);
  let body = {
    userTo: props._id, //내가 팔로우 할 사람 _id
    userFrom: props.userId, //내 id
  };

  const checkFollowed = () => {
    axios.post('/api/follow/Followed', body).then((res) => {
      if (res.data.success) {
        setFollowed(res.data.Followed);
      } else {
        //팔로우 불러오기 실패 코드작성
      }
    });
  };

  const getFollowList = () => {
    axios.post('/api/follow/followpeople', body).then((res) => {
      if (res.data.success) {
        setFollowList(res.data.list);
        setFollowNum(res.data.list.length);
      } else {
        //팔로우 불러오기 실패 코드작성
      }
    });
  };

  const openList = () => {
    if (followNum !== 0) {
      axios.post('/api/follow/followpeople', body).then((res) => {
        if (res.data.success) {
          setFollowList(res.data.list);
          setOpen(true);
        } else {
          //팔로우 불러오기 실패 코드작성
        }
      });
    }
  };

  const addFollow = () => {
    if (!followed) {
      axios.post('/api/follow/addToFollow', body).then((res) => {
        if (res.data.followSuccess) {
          setFollowed(!followed);
          setFollowNum(followNum + 1);
        }
      });
    } else {
      axios.post('/api/follow/removeFromFollow', body).then((res) => {
        if (res.data.removeSuccess) {
          setFollowed(!followed);
          setFollowNum(followNum - 1);
        }
      });
    }
  };

  useEffect(() => {
    checkFollowed();
    getFollowList();
  }, []);

  return (
    <div>
      <ButtonGroup variant='outlined' aria-label='outlined button group'>
        <Button
          onClick={addFollow}
          style={{ fontSize: '0.75rem' }}
          color={followed ? 'error' : 'primary'}
          startIcon={
            followed ? (
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
          {followNum} {followed ? 'followed' : 'follow'}
        </Button>
        <Button
          color={followNum !== 0 ? 'error' : 'primary'}
          onClick={openList}
        >
          list
        </Button>
      </ButtonGroup>
      <FollowPeople type={0} open={open} list={followList} onClose={setOpen} />
    </div>
  );
};

export default Follow;
