import React from 'react'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'


export default ({admins}) => {

    let bgColors = []
    let bColors = []

    const random = number => Math.floor(Math.random() * number)

    for (let i = 0; i < admins.length; i++) {
        bgColors.push('rgb(' + random(255)+',' + random(255)+',' + random(255)+', 0.2)')
        bColors.push('rgb(' + random(255)+',' + random(255)+',' + random(255)+', 0.2)')
    }

    const fundData = {
        labels: admins.map(admin => (admin.user.full_name)),
        datasets: [
            {
                label: 'Rate',
                data: admins.map(admin => admin.rate),
                borderColor: bColors,
                backgroundColor: bgColors,
            },
        ],
    }

    return (
        <Doughnut data={fundData} />
    )
}
