import React from 'react'
import { Title } from '..'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function PieChartWithLabel({ width = "100%", height = 300 }) {

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#33FF71'];

    const data = [
        { name: 'Group 1', value: 400 },
        { name: 'Group 2', value: 300 },
        { name: 'Group 3', value: 250 },
        { name: 'Group 4', value: 200 },
        { name: 'Group 5', value: 100 },
        { name: 'Group 6', value: 50 },
    ];

    const randomColors = []

    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, startAngle, endAngle, outerRadius, fill, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    data.forEach((element) => {

        const color = getRandomColor()
       
        var handled = false

        while (!handled) {
            if (!randomColors.includes(color)) {
                randomColors.push(color)
                handled = true
            }
        }

    })

    return (
        <React.Fragment>
            <ResponsiveContainer width={width} height={height}>
                <Title>PieChartWithLabel</Title>
                <PieChart  width={width} height={height}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        // label
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                    >

                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={randomColors[index % randomColors.length]} />
                        ))}
                    </Pie>
                    <Tooltip/>
                    <Legend
                        verticalAlign="top"
                        height={5}
                        iconType='circle'
                        iconSize={10}
                    />

                </PieChart>
            </ResponsiveContainer>

        </React.Fragment>

    )
}
