export default function ResourceTable({ resources }) {
  return (
    <div className="card" style={{ overflowX: 'auto' }}>
      {resources.length === 0 ? (
        <p>読込中...</p>
      ) : (
        <table className="resource-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>リソース名</th>
              <th>サービス</th>
              <th>リージョン</th>
              <th>ステータス</th>
            </tr>
          </thead>
          <tbody>
            {resources.map(resource => (
              <tr key={resource.id}>
                <td>{resource.id}</td>
                <td>{resource.resourceName}</td>
                <td>{resource.serviceCode}</td>
                <td>{resource.region}</td>
                <td>{resource.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}