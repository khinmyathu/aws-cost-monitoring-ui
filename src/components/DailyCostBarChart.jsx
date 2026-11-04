import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import './DailyCostBarChart.css';

const SERVICE_CONFIG = [
  { key: 'AmazonRDS', color: '#52c41a' },
  { key: 'AmazonEC2', color: '#727cf5' },
  { key: 'AmazonS3', color: '#faad14' },
  { key: 'AWSLambda', color: '#ff7875' },
];

export default function DailyCostBarChart({ dailyCosts, selectedMonth }) {
  const { t } = useTranslation();

  const chartData = useMemo(() => {
    let year, month;
    if (selectedMonth) {
      const parts = selectedMonth.split('-').map(Number);
      year = parts[0];
      month = parts[1];
    } else {
      const now = new Date();
      year = now.getFullYear();
      month = now.getMonth() + 1;
    }

    const daysInMonth = new Date(year, month, 0).getDate();

    const monthDaysMap = {};
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}/${month}/${day}`;
      const displayLabel = `${month}/${day}`;
      monthDaysMap[dateKey] = {
        date: displayLabel,
        AmazonRDS: 0,
        AmazonEC2: 0,
        AmazonS3: 0,
        AWSLambda: 0,
      };
    }

    if (dailyCosts && dailyCosts.length > 0) {
      dailyCosts.forEach(item => {
        const rawDate = item.targetDate || item.date || item.insDttm;
        const service = item.serviceCode || item.service;
        if (!rawDate || !service) return;

        let d;
        if (typeof rawDate === 'string' && rawDate.includes('-')) {
          const [y, m, dayPart] = rawDate.split('T')[0].split('-').map(Number);
          d = { year: y, month: m, day: dayPart };
        } else {
          const dateObj = new Date(rawDate);
          d = {
            year: dateObj.getFullYear(),
            month: dateObj.getMonth() + 1,
            day: dateObj.getDate()
          };
        }

        const matchKey = `${d.year}/${d.month}/${d.day}`;
        if (monthDaysMap[matchKey]) {
          const amount = Number(item.costAmountUsd || item.cost || 0);
          if (monthDaysMap[matchKey][service] !== undefined) {
            monthDaysMap[matchKey][service] += amount;
          } else {
            monthDaysMap[matchKey][service] = amount;
          }
        }
      });
    }

    return Object.values(monthDaysMap);
  }, [dailyCosts, selectedMonth]);

  return (
    <div className="card bar-chart-card">
      <div className="bar-chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#888" 
              tick={{ fontSize: 11 }}
              interval={1}
              angle={-45}
              textAnchor="end"
            />
            <YAxis stroke="#888" tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#2a2a35', borderColor: '#444', color: '#fff', borderRadius: '4px' }}
              formatter={(value, name) => [`$${Number(value).toFixed(2)}`, name]}
            />
            <Legend verticalAlign="top" height={36} />
            {SERVICE_CONFIG.map(svc => (
              <Bar 
                key={svc.key} 
                dataKey={svc.key} 
                stackId="cost" 
                fill={svc.color} 
                name={svc.key} 
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}