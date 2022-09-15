import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './components/views/LoginPage/LoginPage';
import LandingPage from './components/views/LandingPage/LandingPage';
import GetUserInfo from './components/views/LoginPage/GetUserInfo';
import PostPli from './components/views/PostPli/PostPli';
import PliPage from './components/views/PliPage/PliPage';
import Collections from './components/views/Collections/Collections';
import SearchPli from './components/views/SearchPli/SearchPli';
import MyVibe from './components/views/MyVibe/MyVibe';
import UserColl from './components/views/UsersColl/UserColl';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/logining' element={<GetUserInfo />} />
        <Route path='/postpli' element={<PostPli />} />
        <Route path='/plis/:_id' element={<PliPage />} />
        <Route path='/collections' element={<Collections />} />
        <Route path='/searchpli' element={<SearchPli />} />
        <Route path='/myvibe' element={<MyVibe />} />
        <Route path='/users/:_id/:nickname' element={<UserColl />} />
      </Routes>
    </Router>
  );
}

export default App;
