import { useState, useEffect } from 'react';
import './CustomerList.css';

const CustomerList = ({ customers, onEdit, onDelete, onRefresh }) => {
  return (
    <div className="customer-list">
      <div className="list-header">
        <h2>Customers</h2>
        <button onClick={onRefresh} className="btn btn-secondary">
          Refresh
        </button>
      </div>
      
      {customers.length === 0 ? (
        <div className="empty-state">
          <p>No customers found. Create your first customer to get started.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="customer-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{`${customer.firstName} ${customer.lastName}`}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone || 'N/A'}</td>
                  <td>{customer.city || 'N/A'}</td>
                  <td>{customer.state || 'N/A'}</td>
                  <td>{customer.country || 'N/A'}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        onClick={() => onEdit(customer)} 
                        className="btn btn-edit"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => onDelete(customer.id)} 
                        className="btn btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
