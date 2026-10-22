export default function TransactionList({ transactions, onDelete }) {
  return (
    <div>
      <h3>Transaction History</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {transactions.map((tx) => (
          <li 
            key={tx._id} 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '10px', 
              marginBottom: '8px', 
              background: '#fff', 
              border: '1px solid #ddd', 
              borderLeft: `5px solid ${tx.type === 'income' ? '#28a745' : '#dc3545'}`,
              borderRadius: '4px' 
            }}
          >
            <div>
              <strong>{tx.title}</strong> ({tx.category})<br />
              <small style={{ color: '#666' }}>{new Date(tx.date).toLocaleDateString()}</small>
            </div>
            <div>
              <span style={{ marginRight: '15px', fontWeight: 'bold', color: tx.type === 'income' ? '#28a745' : '#dc3545' }}>
                {tx.type === 'income' ? '+' : '-'}${tx.amount}
              </span>
              <button 
                onClick={() => onDelete(tx._id)} 
                style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}