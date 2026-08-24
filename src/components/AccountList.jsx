// src/components/AccountList.jsx
export default function AccountList({ accounts }) {
  return (
    <div className="card">
      {accounts.length === 0 ? (
        <p>読込中...</p>
      ) : (
        <ul className="account-list">
          {accounts.map(account => (
            <li key={account.accountId}>
              <strong>{account.accountName}</strong><br />
              <span style={{ fontSize: '0.85em', color: '#aaa' }}>ID: {account.accountId}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}