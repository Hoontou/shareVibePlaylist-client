import axios from 'axios';
import { useEffect, useState } from 'react';

const Follow = (props) => {
  let _id = props._id; // 팔로우 할 사람_id
  let my_id = pass; //내 _id

  const [followNum, setFollowNum] = useState(0);
  const [followList, setFollowList] = useState([]);

  const getFollow = (_id) => {
    axios.post('/api/follow/getfollowd', { _id: _id }).then((res) => {
      console.log(res.data);
      console.log('success');
    });
  };

  const addFollow = () => {
    axios.post('/api/follow/addToFollow');
  };

  useEffect(() => {
    getFollow(_id);
  });

  return <>{_id}</>;
};

export default Follow;
