import { useState, useEffect } from 'react';
import './App.css';
import AccountList from './components/AccountList';
import DailyCostBarChart from './components/DailyCostBarChart';
import CostPieChart from './components/CostPieChart';
import ResourceTable from './components/ResourceTable';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [dailyCosts, setDailyCosts] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/api/v1/accounts')
      .then(res => res.json()).then(data => setAccounts(data));

    fetch('http://localhost:8081/api/v1/daily-costs')
      .then(res => res.json()).then(data => setDailyCosts(data));

    fetch('http://localhost:8081/api/v1/resource-inventories')
      .then(res => res.json()).then(data => setResources(data))
      .catch(error => console.error('通信エラー:', error));
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>FinOps Dashboard 🚀</h1>
      </header>
      
      <div className="dashboard-content">
        <div className="column-left">
          <h2>AWSアカウント</h2>
          <AccountList accounts={accounts} />
        </div>

        <div className="column-right">
          <h2>サービス別 日次コスト (USD)</h2>
          <DailyCostBarChart dailyCosts={dailyCosts} />
        </div>
      </div>

      <div className="dashboard-row-bottom">
        <h2>コスト割合</h2>
        <CostPieChart dailyCosts={dailyCosts} />
      </div>

      <div className="dashboard-row-bottom">
        <h2>リソース詳細一覧</h2>
        <ResourceTable resources={resources} />
      </div>

    </div>
  );
}

export default App;