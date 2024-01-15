import React from 'react'
import { Title } from '..'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function PieChartWithLabel({title='', chartData=[], height = 300 }) {

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

   /*  const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    } */

    return (
        <React.Fragment>
            <ResponsiveContainer height={height}>
                <Title>{title}</Title>
                <PieChart>
                    <Pie
                        data={chartData}
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
                        {chartData.map((entry, index) => (
                            
                            <Cell 
                                key={`cell-${index}`} 
                               // fill={randomColors[index % randomColors.length]} 
                               fill={entry.color}
                                />
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
