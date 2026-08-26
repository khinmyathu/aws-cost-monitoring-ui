import React from 'react';
import { useTranslation } from 'react-i18next';

const BudgetList = ({ budgets }) => {
  const { t } = useTranslation(); // 翻訳フックを追加

  if (!budgets || budgets.length === 0) {
    return <p>予算データがありません</p>;
  }

  return (
    <div>
      {budgets.map(budget => (
        <div key={budget.id} style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #444' }}>
          {/* DBのデータ(予算名)を翻訳 */}
          <h4 style={{ margin: '0 0 5px 0' }}>{t(budget.budgetName)}</h4>
          <div style={{ fontSize: '0.9em', color: '#ccc' }}>
            {/* ラベルを翻訳 */}
            {t('budgetAmount')}: ${budget.budgetAmount} ({t('warningThreshold')}: {budget.warningThreshold}%)
          </div>
        </div>
      ))}
    </div>
  );
};

export default BudgetList;