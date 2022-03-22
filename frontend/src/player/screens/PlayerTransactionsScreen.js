import React from 'react'

import { useSelector } from 'react-redux'

import PlayerTransactions from '../../components/PlayerTransactions'


export default () => {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    return (
        
        <div>
            <h1>Player transactions</h1>
            <PlayerTransactions userID={userInfo.id} showAdd={false} />
        </div>
    )
}
