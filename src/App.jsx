import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import AccountList from './components/AccountList';
import DailyCostBarChart from './components/DailyCostBarChart';
import CostPieChart from './components/CostPieChart';
import ResourceTable from './components/ResourceTable';
import BudgetList from './components/BudgetList';
import AlertList from './components/AlertList';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aws-cost-monitoring-api.onrender.com';

function App() {
  // 1. 翻訳フックと関数はここに配置します！
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'ja' ? 'en' : 'ja';
    i18n.changeLanguage(nextLang);
  };

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
      {/* ヘッダー部分にボタンを追加し、タイトルを t('title') に変更 */}
      <header className="dashboard-header" style={{ marginBottom: '30px', textAlign: 'center', position: 'relative' }}>
        <h1>{t('title')}</h1>
        <button 
          onClick={toggleLanguage} 
          style={{ position: 'absolute', right: '10px', top: '10px', padding: '8px 16px', cursor: 'pointer', borderRadius: '4px', backgroundColor: '#3b3b4f', color: '#fff', border: '1px solid #555' }}
        >
          🌐 {i18n.language === 'ja' ? 'English' : '日本語'}
        </button>
      </header>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 48%', minWidth: '400px' }}>
          <h2>{t('dailyCost')}</h2>
          <DailyCostBarChart dailyCosts={dailyCosts} />
        </div>
        <div style={{ flex: '1 1 48%', minWidth: '400px' }}>
          <h2>{t('costRatio')}</h2>
          <CostPieChart dailyCosts={dailyCosts} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 30%', minWidth: '250px' }}>
          <h2>{t('awsAccount')}</h2>
          <AccountList accounts={accounts} />
        </div>
        <div style={{ flex: '1 1 30%', minWidth: '250px' }}>
          <h2>{t('budget')}</h2>
          <BudgetList budgets={budgets} />
        </div>
        <div style={{ flex: '1 1 30%', minWidth: '250px' }}>
          <h2 style={{ color: '#ff4d4f' }}>{t('alert')}</h2>
          <AlertList alerts={alerts} onResolve={handleResolveAlert} />
        </div>
      </div>

      <div style={{ width: '100%' }}>
        <h2>{t('resourceList')}</h2>
        <ResourceTable resources={resources} />
      </div>
    </div>
  );
}

export default App;