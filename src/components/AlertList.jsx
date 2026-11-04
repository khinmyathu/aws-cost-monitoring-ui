import React from 'react';
import { useTranslation } from 'react-i18next';
import './AlertList.css';

export default function AlertList({ alerts }) {
  const { t } = useTranslation();

  if (!alerts || alerts.length === 0) {
    return (
      <div className="card alert-list-empty">
        {t('noAlerts') || '現在、未確認のアラートはありません 🎉'}
      </div>
    );
  }

  const renderStatusBadge = (alert) => {
    const isWarning = alert.alertType === 'WARNING';
    return (
      <span className={`alert-status-badge ${isWarning ? 'warning' : 'exceeded'}`}>
        {isWarning ? (t('statusWarning') || '警告') : (t('statusExceeded') || '超過')}
      </span>
    );
  };

  return (
    <div className="card alert-list-card">
      <table className="alert-table">
        <thead>
          <tr className="alert-table-head-row">
            <th>{t('actualValue') || '実績値'}</th>
            <th>{t('threshold') || '閾値'}</th>
            <th>{t('status') || '状態'}</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id} className="alert-table-row">
              <td className="alert-actual-value">
                ${Number(alert.actualValue || alert.actual_value).toFixed(2)}
              </td>
              <td className="alert-threshold-value">
                ${Number(alert.thresholdValue || alert.threshold_value).toFixed(2)}
              </td>
              <td className="alert-status-cell">
                {renderStatusBadge(alert)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}