import React, { createContext, useReducer, useEffect } from 'react';

// Helper function to get user-specific transactions key
export const getUserTransactionsKey = (username) => {
  return username ? `transactions_${username}` : null;
};

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  expenseLimit: 0,
};

// Create context
export const AuthContext = createContext(initialState);

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'SIGNUP':
      const newUser = {
        ...action.payload,
        expenseLimit: 0,
      };

      // Initialize empty transactions for the new user
      const newUserTransactionsKey = getUserTransactionsKey(newUser.username);
      if (newUserTransactionsKey && !localStorage.getItem(newUserTransactionsKey)) {
        localStorage.setItem(newUserTransactionsKey, JSON.stringify([]));
      }

      localStorage.setItem('user', JSON.stringify(newUser));
      return {
        ...state,
        isAuthenticated: true,
        user: newUser,
      };
    case 'LOGOUT':
      localStorage.removeItem('user');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case 'SET_EXPENSE_LIMIT':
      const updatedUser = {
        ...state.user,
        expenseLimit: action.payload,
      };

      // Update the current user in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Also update the user in the users array to persist the expense limit
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userIndex = users.findIndex(u => u.username === updatedUser.username);

      if (userIndex !== -1) {
        users[userIndex] = {
          ...users[userIndex],
          expenseLimit: action.payload,
        };
        localStorage.setItem('users', JSON.stringify(users));
      }

      return {
        ...state,
        user: updatedUser,
      };
    default:
      return state;
  }
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      // Ensure the user has a transactions key
      const userTransactionsKey = getUserTransactionsKey(user.username);
      if (userTransactionsKey && !localStorage.getItem(userTransactionsKey)) {
        localStorage.setItem(userTransactionsKey, JSON.stringify([]));
      }

      dispatch({
        type: 'LOGIN',
        payload: user
      });
    }
  }, []);

  // Login action
  const login = (userData) => {
    // Ensure the user has a transactions key
    const userTransactionsKey = getUserTransactionsKey(userData.username);
    if (userTransactionsKey && !localStorage.getItem(userTransactionsKey)) {
      localStorage.setItem(userTransactionsKey, JSON.stringify([]));
    }

    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  };

  // Signup action
  const signup = (userData) => {
    dispatch({
      type: 'SIGNUP',
      payload: userData,
    });
  };

  // Logout action
  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };

  // Set expense limit
  const setExpenseLimit = (limit) => {
    dispatch({
      type: 'SET_EXPENSE_LIMIT',
      payload: limit,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        login,
        signup,
        logout,
        setExpenseLimit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
