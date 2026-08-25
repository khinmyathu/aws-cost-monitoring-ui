import { useState, useEffect } from 'react';
import './App.css';
import AccountList from './components/AccountList';
import DailyCostBarChart from './components/DailyCostBarChart';
import CostPieChart from './components/CostPieChart';
import ResourceTable from './components/ResourceTable';
import BudgetList from './components/BudgetList';
import AlertList from './components/AlertList';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aws-cost-monitoring-api.onrender.com';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [dailyCosts, setDailyCosts] = useState([]);
  const [resources, setResources] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v1/accounts`)
      .then(res => res.json()).then(data => setAccounts(data))
      .catch(error => console.error('アカウント取得エラー:', error));

    fetch(`${API_BASE_URL}/api/v1/daily-costs`)
      .then(res => res.json()).then(data => setDailyCosts(data))
      .catch(error => console.error('コスト取得エラー:', error));

    fetch(`${API_BASE_URL}/api/v1/resource-inventories`)
      .then(res => res.json()).then(data => setResources(data))
      .catch(error => console.error('リソース取得エラー:', error));

    fetch(`${API_BASE_URL}/api/v1/budgets`)
      .then(res => res.json()).then(data => setBudgets(data))
      .catch(error => console.error('予算取得エラー:', error));

    fetch(`${API_BASE_URL}/api/v1/alerts?status=OPEN`)
      .then(res => res.json()).then(data => setAlerts(data))
      .catch(error => console.error('アラート取得エラー:', error));
  }, []);

  const handleResolveAlert = (id) => {
    fetch(`${API_BASE_URL}/api/v1/alerts/${id}/resolve`, {
      method: 'PUT',
    })
    .then(res => {
      if (res.ok) {
        fetch(`${API_BASE_URL}/api/v1/alerts?status=OPEN`)
          .then(res => res.json()).then(data => setAlerts(data));
      }
    })
    .catch(error => console.error("アラート解消エラー:", error));
  };

  return (
    <div className="dashboard-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header className="dashboard-header" style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1>FinOps Dashboard 🚀</h1>
      </header>
      
      {/* 1段目: グラフセクション (横並び) */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 48%', minWidth: '400px' }}>
          <h2>サービス別 日次コスト (USD)</h2>
          <DailyCostBarChart dailyCosts={dailyCosts} />
        </div>
        <div style={{ flex: '1 1 48%', minWidth: '400px' }}>
          <h2>コスト割合</h2>
          <CostPieChart dailyCosts={dailyCosts} />
        </div>
      </div>

      {/* 2段目: 予算・アラート・アカウント情報 (3列横並び) */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 30%', minWidth: '250px' }}>
          <h2>AWSアカウント</h2>
          <AccountList accounts={accounts} />
        </div>
        <div style={{ flex: '1 1 30%', minWidth: '250px' }}>
          <h2>💰 月間コスト予算</h2>
          <BudgetList budgets={budgets} />
        </div>
        <div style={{ flex: '1 1 30%', minWidth: '250px' }}>
          <h2 style={{ color: '#ff4d4f' }}>🚨 アラート</h2>
          <AlertList alerts={alerts} onResolve={handleResolveAlert} />
        </div>
      </div>

      {/* 3段目: リソース詳細 (全幅) */}
      <div style={{ width: '100%' }}>
        <h2>リソース詳細一覧</h2>
        <ResourceTable resources={resources} />
      </div>

    </div>
  );
}

export default App;