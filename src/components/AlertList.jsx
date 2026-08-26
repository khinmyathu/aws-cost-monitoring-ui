import React from 'react';
import { useTranslation } from 'react-i18next';

const AlertList = ({ alerts, onResolve }) => {
  const { t } = useTranslation(); // 翻訳フックを追加

  if (!alerts || alerts.length === 0) {
    return <p>{t('noAlerts')}</p>;
  }

  return (
      <div>
        {alerts.map(alert => (
          <div key={alert.id} style={{ borderLeft: '4px solid #ff4d4f', padding: '10px', marginBottom: '10px', backgroundColor: '#2a2a35' }}>
            {/* t('serviceLabel') に置き換え */}
            <div style={{ fontWeight: 'bold' }}>{t('serviceLabel')}: {alert.serviceCode}</div>
            <div style={{ fontSize: '0.9em', color: '#ccc', margin: '5px 0' }}>
              {/* t('actualValue') と t('threshold') に置き換え */}
              {t('actualValue')}: ${alert.actualValue} / {t('threshold')}: ${alert.thresholdValue}
            </div>
            <button 
              onClick={() => onResolve(alert.id)}
              style={{ padding: '4px 8px', fontSize: '0.8em', cursor: 'pointer', backgroundColor: 'transparent', border: '1px solid #888', color: '#fff', borderRadius: '4px' }}
            >
              {t('resolve')}
            </button>
          </div>
        ))}
      </div>
    );
};

export default AlertList;