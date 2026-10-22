import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { transactionService, authService } from '../services/api';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

export default function Dashboard({ setToken }) {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const userData = await authService.getMe();
      setUser(userData.data);
      const txData = await transactionService.getTransactions();
      setTransactions(txData.data);
    } catch (err) {
      setError(err.message);
      if (err.message.includes('not authorized') || err.message.includes('token')) {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTransaction = async (txData) => {
    try {
      await transactionService.addTransaction(txData);
      fetchData(); // Refresh list
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await transactionService.deleteTransaction(id);
      setTransactions(transactions.filter(tx => tx._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  // Calculate totals
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const netBalance = totalIncome - totalExpense;

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading your dashboard...</div>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Welcome, {user?.name}</h2>
        <button onClick={handleLogout} style={{ padding: '8px 12px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px' }}>Logout</button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
        <div style={{ flex: 1, background: '#e9ecef', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h4>Net Balance</h4>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>${netBalance}</p>
        </div>
        <div style={{ flex: 1, background: '#d4edda', padding: '15px', borderRadius: '8px', textAlign: 'center', color: '#155724' }}>
          <h4>Income</h4>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>+${totalIncome}</p>
        </div>
        <div style={{ flex: 1, background: '#f8d7da', padding: '15px', borderRadius: '8px', textAlign: 'center', color: '#721c24' }}>
          <h4>Expenses</h4>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>-${totalExpense}</p>
        </div>
      </div>

      <TransactionForm onAddTransaction={handleAddTransaction} />

      {transactions.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>No transactions recorded yet. Add one above to get started!</p>
      ) : (
        <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
      )}
    </div>
  );
}