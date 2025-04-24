import React, { useReducer, createContext, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import contextReducer from './contextReducer';

// Sample transactions for new users (empty array)
const emptyTransactions = [];

// Get transactions key for a specific user
const getUserTransactionsKey = (username) => {
  return username ? `transactions_${username}` : null;
};

// Initial state is an empty array
const initialState = [];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Get the user-specific transactions key
  const transactionsKey = user ? getUserTransactionsKey(user.username) : null;

  // Get user-specific transactions or empty array if not found
  const userTransactions = transactionsKey
    ? JSON.parse(localStorage.getItem(transactionsKey)) || emptyTransactions
    : emptyTransactions;

  const [transactions, dispatch] = useReducer(contextReducer, userTransactions);

  // Update transactions when user changes
  useEffect(() => {
    if (transactionsKey) {
      const userTransactions = JSON.parse(localStorage.getItem(transactionsKey)) || emptyTransactions;
      // Reset transactions for the new user
      dispatch({ type: 'SET_TRANSACTIONS', payload: userTransactions });
    }
  }, [transactionsKey]);

  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: { id, transactionsKey } });
  };

  const addTransaction = (transaction) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: { transaction, transactionsKey } });
  };

  const balance = transactions.reduce((acc, currVal) => (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount), 0);

  return (
    <ExpenseTrackerContext.Provider value={{
      transactions,
      balance,
      deleteTransaction,
      addTransaction,
      transactionsKey,
    }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
