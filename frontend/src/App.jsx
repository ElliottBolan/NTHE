import { useState, useEffect } from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import customerService from './services/customerService';

function App() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await customerService.getAllCustomers();
      setCustomers(response.data);
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError('Failed to load customers. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCustomer = async (customerData) => {
    try {
      await customerService.createCustomer(customerData);
      setShowForm(false);
      fetchCustomers();
      alert('Customer created successfully!');
    } catch (err) {
      console.error('Error creating customer:', err);
      alert(err.response?.data || 'Failed to create customer');
    }
  };

  const handleUpdateCustomer = async (customerData) => {
    try {
      await customerService.updateCustomer(editingCustomer.id, customerData);
      setShowForm(false);
      setEditingCustomer(null);
      fetchCustomers();
      alert('Customer updated successfully!');
    } catch (err) {
      console.error('Error updating customer:', err);
      alert(err.response?.data || 'Failed to update customer');
    }
  };

  const handleDeleteCustomer = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await customerService.deleteCustomer(id);
        fetchCustomers();
        alert('Customer deleted successfully!');
      } catch (err) {
        console.error('Error deleting customer:', err);
        alert('Failed to delete customer');
      }
    }
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCustomer(null);
  };

  const handleSubmit = (customerData) => {
    if (editingCustomer) {
      handleUpdateCustomer(customerData);
    } else {
      handleCreateCustomer(customerData);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>NTHE Customer Management System</h1>
        <p>Manage your customer database efficiently</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}

        {!showForm && (
          <button 
            onClick={() => setShowForm(true)} 
            className="btn btn-primary add-customer-btn"
          >
            + Add New Customer
          </button>
        )}

        {showForm && (
          <CustomerForm
            customer={editingCustomer}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}

        {loading ? (
          <div className="loading">Loading customers...</div>
        ) : (
          <CustomerList
            customers={customers}
            onEdit={handleEdit}
            onDelete={handleDeleteCustomer}
            onRefresh={fetchCustomers}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 NTHE. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
