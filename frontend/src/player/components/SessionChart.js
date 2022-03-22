import React from 'react'

import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

import moment from 'moment'


export default ({statistics}) => {

    const sessionData = {
        labels: statistics.map(data => moment(data.created_at).format('DD.MM')),
        datasets: [
            {
                label: 'Results',
                data: statistics.map(data => data.result),
                borderColor: 'grey',
                backgroundColor: 'grey',
            },
            {
                label: 'Profit',
                data: statistics.map(data => data.profit),
                borderColor: 'black',
                backgroundColor: 'black',
            }
        ],
    }

    return (
        <Line data={sessionData} />
    )
}
