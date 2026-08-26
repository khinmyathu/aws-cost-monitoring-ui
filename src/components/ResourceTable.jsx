import React from 'react';
import { useTranslation } from 'react-i18next';

const ResourceTable = ({ resources }) => {
  const { t } = useTranslation(); // 翻訳フックを追加

  if (!resources || resources.length === 0) {
    return <p>リソースがありません</p>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '#2a2a35', borderBottom: '1px solid #444' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>{t('table.id')}</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>{t('table.name')}</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>{t('table.service')}</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>{t('table.region')}</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>{t('table.status')}</th>
          </tr>
        </thead>
        <tbody>
          {resources.map(resource => (
            <tr key={resource.id} style={{ borderBottom: '1px solid #333' }}>
              <td style={{ padding: '12px' }}>{resource.resourceId.substring(0, 10)}...</td>
              <td style={{ padding: '12px' }}>{resource.resourceName}</td>
              <td style={{ padding: '12px' }}>{resource.serviceCode}</td>
              <td style={{ padding: '12px' }}>{resource.region}</td>
              <td style={{ padding: '12px' }}>{resource.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceTable;