import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import Footer from './components/Footer'
import PlayerListScreen from './admin/screens/PlayerListScreen'
import PlayerDetailsScreen from './admin/screens/PlayerDetailsScreen'
import PlayerEditScreen from './admin/screens/PlayerEditScreen'
import AdminListScreen from './admin/screens/AdminListScreen'
import AdminDetailsScreen from './admin/screens/AdminDetailsScreen'
import RoomListScreen from './admin/screens/RoomListScreen'
import RoomDetailsScreen from './admin/screens/RoomDetailsScreen'
import HomeScreen from './admin/screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import { Container } from 'react-bootstrap'


function App() {

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container className='my-3'>
          <Routes>
            { 
              userInfo && userInfo.is_staff && (
                <>
                  <Route path='/' element={<HomeScreen />} />
                  <Route path='/players' element={<PlayerListScreen />} />
                  <Route path='/players/:id' element={<PlayerDetailsScreen />} />
                  <Route path='/players/:id/edit' element={<PlayerEditScreen />} />
                  <Route path='/rooms' element={<RoomListScreen />} />
                  <Route path='/rooms/:id' element={<RoomDetailsScreen />} />
                  <Route path='/admins' element={<AdminListScreen />} />
                </>
              )
            }
            {
              userInfo && !userInfo.is_staff && (
                <Route path='/' element={<HomeScreen />} />
              )
            }
            
            <Route path='/login' element={<LoginScreen />} />
            
          </Routes>
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
