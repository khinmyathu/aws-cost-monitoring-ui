// src/components/AccountList.jsx
export default function AccountList({ accounts }) {
  return (
    <div className="card">
      {accounts.length === 0 ? (
        <p>読込中...</p>
      ) : (
        <ul className="account-list">
          {accounts.map((account, index) => {
            // フィールド名の揺れ（accountId / account_id / id）を吸収
            const id = account.accountId || account.account_id || account.id || index;
            const name = account.accountName || account.account_name || '名称不明';

            return (
              <li key={id}>
                <strong>{name}</strong><br />
                <span style={{ fontSize: '0.85em', color: '#aaa' }}>ID: {id}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}