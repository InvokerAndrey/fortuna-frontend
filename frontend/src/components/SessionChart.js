import React from 'react'

import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

import moment from 'moment'


export default ({statistics}) => {

    const sessionData = {
        labels: statistics.map(data => moment(data.created_at).format('DD.MM')),
        datasets: [
            {
                label: 'Profit',
                data: statistics.map(data => data.profit),
                borderColor: 'black',
                backgroundColor: 'black',
            },
            {
                label: 'Results',
                data: statistics.map(data => data.result),
                borderColor: '#d6d5d2',
                backgroundColor: '#d6d5d2',
            },
        ],
    }

    return (
        <Line data={sessionData} />
    )
}
