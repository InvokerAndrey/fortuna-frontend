import React from 'react'

import { useSelector } from 'react-redux'

import RoomTransactions from '../../components/RoomTransactions'


export default () => {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    return (
        <div>
            <h1>Room transactions</h1>
            <RoomTransactions userID={userInfo.id} showAdd={true} />
        </div>
    )
}
