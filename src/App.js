import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import Alert from './components/alert/alert.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { refreshToken } from './redux/actions/authAction';
import Userhomepage from './pages/user/homepage';
import UserNavbar from './pages/user/navbar';
import Sellerhomepage from './pages/seller/homepage';
import SellerNavbar from './pages/seller/navbar';
import Create from './pages/seller/create';
import Bids from './pages/user/bids';
import Loading from './components/loading/loading';



function App() {
  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())

  }, [dispatch])
  return (
    <>
      <Router>
        <Alert />
        {auth?.token && auth?.user?.category === 0 && < UserNavbar />}
        {auth?.token && auth?.user?.category === 1 && <SellerNavbar />}
        <Routes>
          <Route exact path='/' element=
            {auth?.token ?
              (auth?.user?.category === 0
                ? <Userhomepage />
                : <Sellerhomepage />)
              : <Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/create' element={auth?.user?.category === 1 && <Create />} />
          <Route exact path='/bids' element={auth?.user?.category === 0 && <Bids />} />


        </Routes>
      </Router>
    </>
  );
}

export default App;
