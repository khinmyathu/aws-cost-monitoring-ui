--

### フロントエンド用 README.md テンプレート（English & Japanese）

`cloud-monitor-ui` 直下の `README.md` 用テンプレートです。

```markdown
# AWS FinOps & Cost Monitoring Dashboard (UI)

[English](#english) | [日本語](#japanese)

---

<a name="english"></a>
## English

A responsive modern web frontend built with **React**, designed to visualize AWS infrastructure costs and cloud resource health.

### Architecture & Delivery
- **Frontend Framework**: React / Vite
- **Hosting & Distribution**: Amazon S3 (Static Website Hosting) + Amazon CloudFront (CDN)
- **DNS & SSL**: Amazon Route 53 + AWS Certificate Manager (ACM)
- **API Communication**: REST API via HTTPS to backend EC2

### Key Features
- **Cost Trends**: Interactive charts showing daily and monthly cloud expenditure.
- **Alert Dashboard**: Visual indicators for threshold violations.
- **Responsive UI**: Optimized for both desktop and mobile viewports.

---

<a name="japanese"></a>
## 日本語

**React** を使用して構築された、AWS クラウド利用コストとリソース状態を直感的に可視化するダッシュボード UI です。

### インフラ・配信構成
- **フロントエンド**: React / Vite
- **ホスティング・CDN**: Amazon S3（静的ウェブホスティング） + Amazon CloudFront
- **ドメイン・SSL**: Amazon Route 53 + AWS Certificate Manager (ACM) による HTTPS 通信
- **バックエンド通信**: HTTPS 経由で EC2 上の Spring Boot API と連携

### 主な機能
- **コスト可視化**: 日次・月次の利用額推移グラフ表示
- **アラート確認**: コスト上限や異常値の視覚的アラート通知
- **レスポンシブ対応**: デスクトップ・モバイル双方で最適化されたレイアウト