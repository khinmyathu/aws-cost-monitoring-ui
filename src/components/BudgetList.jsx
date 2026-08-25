export default function BudgetList({ budgets }) {
  return (
    <div className="card">
      {budgets.length === 0 ? (
        <p>読込中...</p>
      ) : (
        <ul className="budget-list" style={{ listStyle: 'none', padding: 0 }}>
          {budgets.map((budget) => (
            <li key={budget.id} style={{ borderBottom: '1px solid #444', padding: '10px 0' }}>
              <strong>{budget.budgetName}</strong><br />
              <span style={{ fontSize: '0.85em', color: '#aaa' }}>
                予算額: ${budget.budgetAmount} (警告閾値: {budget.warningThreshold}%)
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}