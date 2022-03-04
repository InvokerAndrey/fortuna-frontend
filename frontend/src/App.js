import React from 'react'

import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Container } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './admin/screens/HomeScreen'

import LoginScreen from './screens/LoginScreen'

import PlayerListScreen from './admin/screens/PlayerListScreen'
import PlayerDetailsScreen from './admin/screens/PlayerDetailsScreen'
import PlayerEditScreen from './admin/screens/PlayerEditScreen'
import PlayerRegisterScreen from './admin/screens/PlayerRegisterScreen'

import AdminListScreen from './admin/screens/AdminListScreen'
import AdminDetailsScreen from './admin/screens/AdminDetailsScreen'
import AdminRegisterScreen from './admin/screens/AdminRegisterScreen'

import RoomListScreen from './admin/screens/RoomListScreen'
import RoomDetailsScreen from './admin/screens/RoomDetailsScreen'


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
                  <Route path='/admin' element={<HomeScreen />} />
                  <Route path='/admin/players' element={<PlayerListScreen />} />
                  <Route path='/admin/players/:id' element={<PlayerDetailsScreen />} />
                  <Route path='/admin/players/:id/edit' element={<PlayerEditScreen />} />
                  <Route path='/admin/rooms' element={<RoomListScreen />} />
                  <Route path='/admin/rooms/:id' element={<RoomDetailsScreen />} />
                  <Route path='/admin/admins' element={<AdminListScreen />} />
                  <Route path='/register/admin' element={<AdminRegisterScreen />} />
                  <Route path='/register/player' element={<PlayerRegisterScreen />} />
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
