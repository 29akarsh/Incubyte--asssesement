import React, { useState } from 'react';
import { Sweet } from '../types';
import { useAuth } from '../context/AuthContext';
import './SweetCard.css';

interface SweetCardProps {
  sweet: Sweet;
  onPurchase: (id: string, quantity: number) => void;
  onRestock: (id: string, quantity: number) => void;
  onEdit: (sweet: Sweet) => void;
  onDelete: (id: string) => void;
}

const SweetCard: React.FC<SweetCardProps> = ({
  sweet,
  onPurchase,
  onRestock,
  onEdit,
  onDelete,
}) => {
  const { isAdmin } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [restockQty, setRestockQty] = useState(10);

  const handlePurchase = () => {
    if (quantity > 0 && quantity <= sweet.quantity) {
      onPurchase(sweet.id, quantity);
      setQuantity(1);
    }
  };

  const handleRestock = () => {
    if (restockQty > 0) {
      onRestock(sweet.id, restockQty);
      setRestockQty(10);
    }
  };

  return (
    <div className="sweet-card">
      <div className="sweet-header">
        <h3>{sweet.name}</h3>
        <span className="sweet-category">{sweet.category}</span>
      </div>
      <div className="sweet-body">
        <p className="sweet-description">{sweet.description || 'No description available'}</p>
        <div className="sweet-info">
          <span className="sweet-price">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(sweet.price)}</span>
          <span className={`sweet-stock ${sweet.quantity === 0 ? 'out-of-stock' : ''}`}>
            Stock: {sweet.quantity}
          </span>
        </div>
      </div>
      <div className="sweet-actions">
        {!isAdmin && (
          <div className="purchase-section">
            <input
              type="number"
              min="1"
              max={sweet.quantity}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              disabled={sweet.quantity === 0}
            />
            <button
              onClick={handlePurchase}
              disabled={sweet.quantity === 0}
              className="btn-purchase"
            >
              Purchase
            </button>
          </div>
        )}
        {isAdmin && (
          <div className="admin-actions">
            <button onClick={() => onEdit(sweet)} className="btn-edit">
              Edit
            </button>
            <button onClick={() => onDelete(sweet.id)} className="btn-delete">
              Delete
            </button>
            <div className="restock-section">
              <input
                type="number"
                min="1"
                value={restockQty}
                onChange={(e) => setRestockQty(parseInt(e.target.value) || 10)}
              />
              <button onClick={handleRestock} className="btn-restock">
                Restock
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SweetCard;

