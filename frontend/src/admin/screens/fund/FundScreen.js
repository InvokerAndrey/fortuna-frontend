import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import FundService from '../../services/FundService'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'


export default () => {

    const fundService = new FundService()

    const dispatch = useDispatch()

    const fundDetails = useSelector(state => state.fundDetails)
    const {loading, error, fund} = fundDetails

    useEffect(() => {
        dispatch(fundService.getFundDetails())
    }, [dispatch])

    if (loading) return <Loader />
    if (error) return <Message variant='danger'>{error}</Message>

    return (
        <div>
            {fund.balance}
            {fund.admins.map(admin => (
                <p key={admin.id}>{admin.user.first_name}</p>
            ))}
        </div>
    )
}
