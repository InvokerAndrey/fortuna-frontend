import React from "react";
import { useSelector } from 'react-redux'


export default () => {
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    if (!userInfo) return(<></>);

    return (
        <h1>Home</h1>
    )
}