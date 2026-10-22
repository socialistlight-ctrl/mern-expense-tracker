import { useState } from 'react';

export default function TransactionForm({ onAddTransaction }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('General');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    
    setLoading(true);
    await onAddTransaction({
      title,
      amount: Number(amount),
      type,
      category
    });
    setLoading(false);

    // Reset form
    setTitle('');
    setAmount('');
    setCategory('General');
  };

  return (
    <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
      <h3>Add New Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Title:</label><br />
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="e.g., Groceries, Salary" 
            required 
            style={{ width: '100%', padding: '6px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Amount ($):</label><br />
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="e.g., 50" 
            required 
            style={{ width: '100%', padding: '6px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Type:</label><br />
          <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: '100%', padding: '6px' }}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Category:</label><br />
          <input 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            style={{ width: '100%', padding: '6px' }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ padding: '8px 15px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' }}>
          {loading ? 'Adding...' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
}