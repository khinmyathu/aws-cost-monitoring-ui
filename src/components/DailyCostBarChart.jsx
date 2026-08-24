import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DailyCostBarChart({ dailyCosts }) {
  return (
    <div className="card">
      {dailyCosts.length === 0 ? (
        <p>読込中...</p>
      ) : (
        <div style={{ height: 300, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyCosts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="serviceCode" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff', border: 'none' }} />
              <Legend />
              <Bar dataKey="costAmountUsd" fill="#8884d8" name="コスト (USD)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}