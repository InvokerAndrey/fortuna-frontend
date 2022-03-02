import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import Footer from './components/Footer'
import PlayerListScreen from './admin/screens/PlayerListScreen'
import PlayerDetailsScreen from './admin/screens/PlayerDetailsScreen'
import RoomListScreen from './admin/screens/RoomListScreen'
import RoomDetailsScreen from './admin/screens/RoomDetailsScreen'
import HomeScreen from './admin/screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import { Container } from 'react-bootstrap'


function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container className='my-3'>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/players' element={<PlayerListScreen />} />
            <Route path='/players/:id' element={<PlayerDetailsScreen />} />
            <Route path='/rooms' element={<RoomListScreen />} />
            <Route path='/rooms/:id' element={<RoomDetailsScreen />} />
          </Routes>
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
