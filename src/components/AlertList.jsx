export default function AlertList({ alerts, onResolve }) {
  return (
    <div className="card">
      {alerts.length === 0 ? (
        <p>現在、未確認のアラートはありません 🎉</p>
      ) : (
        <ul className="alert-list" style={{ listStyle: 'none', padding: 0 }}>
          {alerts.map((alert) => (
            <li key={alert.id} style={{ borderLeft: '4px solid #ff4d4f', paddingLeft: '10px', marginBottom: '15px' }}>
              <strong>サービス: {alert.serviceCode}</strong><br />
              <span style={{ fontSize: '0.85em', color: '#aaa' }}>
                実績値: ${alert.actualValue} / 閾値: ${alert.thresholdValue}
              </span>
              <br />
              <button 
                onClick={() => onResolve(alert.id)}
                style={{ marginTop: '8px', padding: '4px 8px', fontSize: '0.8em', cursor: 'pointer', background: '#333', color: '#fff', border: '1px solid #666', borderRadius: '4px' }}
              >
                確認済みにする
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}