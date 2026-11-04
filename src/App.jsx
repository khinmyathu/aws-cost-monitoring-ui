import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import DailyCostBarChart from './components/DailyCostBarChart';
import CostPieChart from './components/CostPieChart';
import AlertList from './components/AlertList';
import MonthPicker from './components/MonthPicker';

//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://finops.katsumichuu-lab.com';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

function App() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'ja' ? 'en' : 'ja';
    i18n.changeLanguage(nextLang);
    document.documentElement.lang = nextLang;
  };

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const [accounts, setAccounts] = useState([]);
  const [dailyCosts, setDailyCosts] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const [selectedAccountId, setSelectedAccountId] = useState('');

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v1/accounts`)
      .then(res => res.json())
      .then(data => {
        setAccounts(data);
        if (data && data.length > 0) {
          const firstId = data[0].accountId || data[0].account_id || data[0].id;
          setSelectedAccountId(firstId);
        }
      })
      .catch(error => console.error('アカウント取得エラー:', error));

    fetch(`${API_BASE_URL}/api/v1/budgets`)
      .then(res => res.json()).then(data => setBudgets(data))
      .catch(error => console.error('予算取得エラー:', error));

    fetch(`${API_BASE_URL}/api/v1/alerts`)
      .then(res => res.json()).then(data => setAlerts(data))
      .catch(error => console.error('アラート取得エラー:', error));
  }, []);

  useEffect(() => {
    if (!selectedAccountId || !selectedMonth) return;

    const [year, month] = selectedMonth.split('-').map(Number);
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

    fetch(`${API_BASE_URL}/api/v1/daily-costs?accountId=${selectedAccountId}&startDate=${startDate}&endDate=${endDate}`)
      .then(res => res.json())
      .then(data => setDailyCosts(data))
      .catch(error => console.error('1ヶ月分コスト取得エラー:', error));
  }, [selectedAccountId, selectedMonth]);

  const currentAccount = useMemo(() => {
    return accounts.find(acc => {
      const id = acc.accountId || acc.account_id || acc.id;
      return String(id).trim() === String(selectedAccountId).trim();
    });
  }, [accounts, selectedAccountId]);

  const currentBudget = useMemo(() => {
    if (!selectedAccountId) return null;
    return budgets.find(b => {
      const accId = String(b.accountId || b.account_id || '').trim();
      return accId === String(selectedAccountId).trim();
    });
  }, [budgets, selectedAccountId]);

  const filteredAlerts = useMemo(() => {
    if (!selectedAccountId || !selectedMonth) return [];

    return alerts.filter(item => {
      const accId = String(item.accountId || item.account_id || '').trim();
      if (accId !== String(selectedAccountId).trim()) return false;

      const month = item.targetMonth || item.target_month;
      return month === selectedMonth;
    });
  }, [alerts, selectedAccountId, selectedMonth]);

  const filteredDailyCosts = useMemo(() => {
    if (!selectedAccountId) return [];
    return dailyCosts.filter(item => {
      const accId = String(item.accountId || item.account_id || '').trim();
      return accId === String(selectedAccountId).trim();
    });
  }, [dailyCosts, selectedAccountId]);

  return (
    <div className="dashboard-container">
      {/* ヘッダー */}
      <header className="dashboard-header">
        <div className="header-spacer"></div>
        <h1 className="header-title">
          {t('title') || 'FinOps Dashboard'} 
        </h1>
        <div className="header-action">
          <button onClick={toggleLanguage} className="lang-btn">
            🌐 {i18n.language === 'ja' ? 'English' : '日本語'}
          </button>
        </div>
      </header>

      {/* アカウント切り替え & カレンダー日付コントロール */}
      <div className="control-bar">
        <div className="control-group">
          <label className="control-label">{t('account') || 'アカウント'}:</label>
          <select
            value={selectedAccountId}
            onChange={(e) => setSelectedAccountId(e.target.value)}
            className="account-select"
          >
            {accounts.map(acc => {
              const id = acc.accountId || acc.account_id || acc.id;
              const name = acc.accountName || acc.account_name || id;
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">{t('targetMonth') || '対象月'}:</label>
          <MonthPicker value={selectedMonth} onChange={setSelectedMonth} />
        </div>
      </div>

      {/* 最上段：日次コスト棒グラフ */}
      <div className="section-barchart">
        <h2 className="section-title">{t('dailyCost') || 'サービス別 日次コスト (USD)'}</h2>
        <DailyCostBarChart dailyCosts={filteredDailyCosts} selectedMonth={selectedMonth} />
      </div>

      {/* 中段：左側指標カードと右側円グラフ */}
      <div className="middle-grid">
        <div className="indicator-column">
          <div className="card indicator-card">
            <div className="indicator-label">{t('accountId') || 'ACCOUNT ID'}</div>
            <div className="indicator-value">
              {currentAccount ? (currentAccount.accountId || currentAccount.account_id || currentAccount.id) : '-'}
            </div>
          </div>

          <div className="card indicator-card">
            <div className="indicator-label">💰 {t('budget') || '月間コスト予算'}</div>
            {currentBudget ? (
              <div className="budget-row">
                <span className="budget-amount">${currentBudget.budgetAmount}</span>
                <span className="budget-threshold">
                  ({t('warningThreshold') || '警告閾値'}: {currentBudget.warningThreshold}%)
                </span>
              </div>
            ) : (
              <div className="budget-not-set">{t('notSet') || '設定なし'}</div>
            )}
          </div>
        </div>

        <div className="pie-chart-column">
          <CostPieChart dailyCosts={filteredDailyCosts} />
        </div>
      </div>

      {/* 最下段：月間予算アラート */}
      <div className="section-alert">
        <h2 className="alert-heading">
          🚨 {t('monthlyBudgetAlert') || '月間予算アラート'}
        </h2>
        <AlertList alerts={filteredAlerts} />
      </div>
    </div>
  );
}

export default App;