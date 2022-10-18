import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import { DialogTitle } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const LikedPeople = (props) => {
  const navigate = useNavigate();
  const { onClose, open, list } = props;

  const handleClose = () => {
    onClose();
  };
  const onClick = (nick, _id) => {
    const url = '/users/' + _id + '/' + nick;
    navigate(url);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>좋아요 누른 사람들</DialogTitle>
      <List sx={{ pt: 0 }}>
        {list.map((item) => (
          <ListItem
            key={item[0]}
            onClick={() => {
              onClick(item[0], item[1]);
            }}
          >
            <ListItemAvatar>
              <Avatar
                style={{ marginLeft: '-0.3rem' }}
                art={item[0]}
                src={item[2]}
              >
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText style={{ marginLeft: '-0.7rem' }} primary={item[0]} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default LikedPeople;
