const contextReducer = (state, action) => {
  let transactions;

  switch (action.type) {
    case 'DELETE_TRANSACTION':
      const { id, transactionsKey } = action.payload;
      transactions = state.filter((transaction) => transaction.id !== id);

      if (transactionsKey) {
        localStorage.setItem(transactionsKey, JSON.stringify(transactions));
      }

      return transactions;

    case 'ADD_TRANSACTION':
      const { transaction, transactionsKey: addKey } = action.payload;
      transactions = [transaction, ...state];

      if (addKey) {
        localStorage.setItem(addKey, JSON.stringify(transactions));
      }

      return transactions;

    case 'SET_TRANSACTIONS':
      // Used when switching users
      return action.payload;

    default:
      return state;
  }
};

export default contextReducer;