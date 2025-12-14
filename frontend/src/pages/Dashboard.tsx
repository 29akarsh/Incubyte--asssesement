import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sweet } from '../types';
import { sweetsAPI } from '../services/api';
import SweetCard from '../components/SweetCard';
import SweetForm from '../components/SweetForm';
import SearchBar from '../components/SearchBar';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);

  const loadSweets = async () => {
    try {
      setLoading(true);
      const data = await sweetsAPI.getAll();
      setSweets(data);
      setError('');
    } catch (err: any) {
      setError('Failed to load sweets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSweets();
  }, []);

  const handleSearch = async (params: any) => {
    try {
      setLoading(true);
      const data = await sweetsAPI.search(params);
      setSweets(data);
      setError('');
    } catch (err: any) {
      setError('Search failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (id: string, quantity: number) => {
    try {
      await sweetsAPI.purchase(id, quantity);
      await loadSweets();
      alert('Purchase successful!');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Purchase failed');
    }
  };

  const handleRestock = async (id: string, quantity: number) => {
    try {
      await sweetsAPI.restock(id, quantity);
      await loadSweets();
      alert('Restock successful!');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Restock failed');
    }
  };

  const handleEdit = (sweet: Sweet) => {
    setEditingSweet(sweet);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this sweet?')) {
      try {
        await sweetsAPI.delete(id);
        await loadSweets();
        alert('Sweet deleted successfully!');
      } catch (err: any) {
        alert(err.response?.data?.error || 'Delete failed');
      }
    }
  };

  const handleFormSubmit = async () => {
    setShowForm(false);
    setEditingSweet(null);
    await loadSweets();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingSweet(null);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🍬 Sweet Shop</h1>
        <div className="user-info">
          <span>Welcome, {user?.name}!</span>
          {isAdmin && <span className="admin-badge">Admin</span>}
          <button onClick={logout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-controls">
          <SearchBar onSearch={handleSearch} onReset={loadSweets} />
          {isAdmin && (
            <button
              onClick={() => setShowForm(true)}
              className="btn-add-sweet"
            >
              + Add New Sweet
            </button>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading sweets...</div>
        ) : (
          <div className="sweets-grid">
            {sweets.length === 0 ? (
              <p className="no-sweets">No sweets found</p>
            ) : (
              sweets.map((sweet) => (
                <SweetCard
                  key={sweet.id}
                  sweet={sweet}
                  onPurchase={handlePurchase}
                  onRestock={handleRestock}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        )}
      </div>

      {showForm && (
        <SweetForm
          sweet={editingSweet}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
};

export default Dashboard;

