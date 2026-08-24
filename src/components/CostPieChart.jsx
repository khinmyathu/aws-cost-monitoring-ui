import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

export default function CostPieChart({ dailyCosts }) {
  return (
    <div className="card">
      {dailyCosts.length === 0 ? (
        <p>読込中...</p>
      ) : (
        <div style={{ height: 350, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dailyCosts}
                cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5}
                dataKey="costAmountUsd" nameKey="serviceCode" label
              >
                {dailyCosts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff', border: 'none' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}