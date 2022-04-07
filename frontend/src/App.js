import React from 'react'

import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Container } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

import Header from './components/Header'

import HomeScreen from './admin/screens/HomeScreen'

import LoginScreen from './screens/LoginScreen'

import PlayerListScreen from './admin/screens/player/PlayerListScreen'
import PlayerDetailsScreen from './admin/screens/player/PlayerDetailsScreen'
import PlayerEditScreen from './admin/screens/player/PlayerEditScreen'
import PlayerRegisterScreen from './admin/screens/player/PlayerRegisterScreen'

import AddPlayerTransactionScreen from './admin/screens/player/AddPlayerTransactionScreen'

import AdminListScreen from './admin/screens/admin/AdminListScreen'
import AdminDetailsScreen from './admin/screens/admin/AdminDetailsScreen'
import AdminRegisterScreen from './admin/screens/admin/AdminRegisterScreen'

import PlayerProfileScreen from './player/screens/PlayerProfileScreen'
import RoomTransactionsScreen from './player/screens/RoomTransactionsScreen'
import PlayerTransactionsScreen from './player/screens/PlayerTransactionsScreen'
import AddRoomTransactionScreen from './player/screens/AddRoomTransactionScreen'
import AddPlayerRoomScreen from './admin/screens/player/AddPlayerRoomScreen'
import PlayerRoomEditScreen from './player/screens/PlayerRoomEditScreen'
import PlayerRoomStatisticsScreen from './player/screens/PlayerRoomStatisticsScreen'
import ChangePasswordScreen from './player/screens/ChangePasswordScreen'

import RoomListScreen from './admin/screens/room/RoomListScreen'
import RoomDetailsScreen from './admin/screens/room/RoomDetailsScreen'
import RoomAddScreen from './admin/screens/room/RoomAddScreen'

import SessionListScreen from './player/screens/SessionListScreen'
import SessionDetailsScreen from './player/screens/SessionDetailsScreen'
import SessionCreateScreen from './player/screens/SessionCreateScreen'

import FundScreen from './admin/screens/fund/FundScreen'
import AddFundTransactionScreen from './admin/screens/fund/AddFundTransactionScreen'


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
                  <Route path='/admin/players/:id/:session_id' element={<SessionDetailsScreen />} />
                  <Route path='/admin/players/:id/edit' element={<PlayerEditScreen />} />
                  <Route path='/admin/rooms' element={<RoomListScreen />} />
                  <Route path='/admin/rooms/:id' element={<RoomDetailsScreen />} />
                  <Route path='/admin/admins' element={<AdminListScreen />} />
                  <Route path='/register/admin' element={<AdminRegisterScreen />} />
                  <Route path='/register/player' element={<PlayerRegisterScreen />} />
                  <Route path='/add/room' element={<RoomAddScreen />} />
                  <Route path='/admin/players/:id/add/player-transaction/' element={<AddPlayerTransactionScreen />} />
                  <Route path='/add/player-room/:id' element={<AddPlayerRoomScreen />} />
                  <Route path='/admin/players/:player_id/room/:room_id' element={<PlayerRoomStatisticsScreen />} />
                  <Route path='/admin/fund' element={<FundScreen />} />
                  <Route path='/admin/fund/add/fund-transaction' element={<AddFundTransactionScreen />} />
                </>
              )
            }
            {
              userInfo && !userInfo.is_staff && (
                <>
                  <Route path='/' element={<HomeScreen />} />
                  <Route path='/player/profile' element={<PlayerProfileScreen />} />
                  <Route path='/player/profile/change-password' element={<ChangePasswordScreen />} />
                  <Route path='/player/room-transactions' element={<RoomTransactionsScreen />} />
                  <Route path='/player/player-transactions' element={<PlayerTransactionsScreen />} />
                  <Route path='/add/room-transaction' element={<AddRoomTransactionScreen />}/>
                  <Route path='/player/sessions' element={<SessionListScreen />}/>
                  <Route path='/add/session' element={<SessionCreateScreen />} />
                  <Route path='/player/sessions/:session_id' element={<SessionDetailsScreen />} />
                  <Route path='/player/profile/:room_id/edit' element={<PlayerRoomEditScreen />} />
                  <Route path='/player/:player_id/profile/room/:room_id' element={<PlayerRoomStatisticsScreen />} />
                </>
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
