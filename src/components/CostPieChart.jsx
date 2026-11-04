import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './CostPieChart.css';

const SERVICE_COLORS = {
  AmazonRDS: '#52c41a',
  AmazonEC2: '#727cf5',
  AmazonS3: '#faad14',
  AWSLambda: '#ff7875',
};

const DEFAULT_COLOR = '#8884d8';

export default function CostPieChart({ dailyCosts }) {
  const { t } = useTranslation();

  const aggregatedData = useMemo(() => {
    if (!dailyCosts || dailyCosts.length === 0) return [];

    const totals = {};

    dailyCosts.forEach(item => {
      const service = item.serviceCode || item.service || 'Other';
      const amount = Number(item.costAmountUsd || item.cost || 0);

      if (!totals[service]) {
        totals[service] = 0;
      }
      totals[service] += amount;
    });

    return Object.keys(totals)
      .map(service => ({
        name: service,
        value: Number(totals[service].toFixed(2)),
      }))
      .filter(item => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [dailyCosts]);

  if (aggregatedData.length === 0) {
    return (
      <div className="card pie-chart-empty">
        {t('noData') || 'データがありません'}
      </div>
    );
  }

  return (
    <div className="card pie-chart-card">
      <div className="pie-chart-header">
        <h3 className="pie-chart-title">
          {t('serviceSummary') || 'サービス別サマリー'}
        </h3>
      </div>

      <div className="pie-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={aggregatedData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={95}
              paddingAngle={3}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {aggregatedData.map((entry) => (
                <Cell 
                  key={entry.name} 
                  fill={SERVICE_COLORS[entry.name] || DEFAULT_COLOR} 
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#2a2a35', borderColor: '#444', color: '#fff', borderRadius: '4px' }}
              formatter={(value) => [`$${Number(value).toFixed(2)}`, t('cost') || 'コスト']}
            />
            <Legend 
              verticalAlign="middle" 
              align="right" 
              layout="vertical"
              formatter={(value) => (
                <span className="pie-chart-legend-label">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}