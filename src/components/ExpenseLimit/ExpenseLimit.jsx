import React, { useState, useContext, useEffect } from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  LinearProgress,
  Box,
  makeStyles
} from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';
import { ExpenseTrackerContext } from '../../context/context';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  userInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  userName: {
    fontWeight: 'bold',
  },
  limitContainer: {
    marginTop: theme.spacing(1),
  },
  progressContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
  },
  progressInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(0.5),
  },
  progress: {
    height: 10,
    borderRadius: 5,
  },
  dangerProgress: {
    backgroundColor: '#f44336',
  },
  warningProgress: {
    backgroundColor: '#ff9800',
  },
  safeProgress: {
    backgroundColor: '#4caf50',
  },
  button: {
    marginTop: theme.spacing(1),
  },
}));

const ExpenseLimit = () => {
  const classes = useStyles();
  const { user, setExpenseLimit } = useContext(AuthContext);
  const { transactions } = useContext(ExpenseTrackerContext);
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(user?.expenseLimit || 0);
  const [currentExpenses, setCurrentExpenses] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (!transactions || !user) return;

    // Calculate current month's expenses
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const monthlyExpenses = transactions
      .filter((t) => {
        const transactionDate = new Date(t.date);
        return (
          t.type === 'Expense' &&
          transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear
        );
      })
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    setCurrentExpenses(monthlyExpenses);

    // Calculate percentage of limit used
    if (user?.expenseLimit > 0) {
      const calculatedPercentage = (monthlyExpenses / user.expenseLimit) * 100;
      setPercentage(calculatedPercentage > 100 ? 100 : calculatedPercentage);
    } else {
      setPercentage(0);
    }
  }, [transactions, user]);

  const handleClickOpen = () => {
    setOpen(true);
    setLimit(user?.expenseLimit || 0);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setExpenseLimit(Number(limit));
    setOpen(false);
  };

  const getProgressColor = () => {
    if (percentage >= 80) {
      return classes.dangerProgress;
    } else if (percentage >= 50) {
      return classes.warningProgress;
    }
    return classes.safeProgress;
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.userInfo}>
        <Typography variant="h6" className={classes.userName}>
          Welcome, {user?.name}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={handleClickOpen}
          className={classes.button}
        >
          {user?.expenseLimit > 0 ? 'Update Limit' : 'Set Expense Limit'}
        </Button>
      </Box>

      {user?.expenseLimit > 0 && (
        <Box className={classes.limitContainer}>
          <Box className={classes.progressInfo}>
            <Typography variant="body2">
              Monthly Expense Limit: ₹{user.expenseLimit}
            </Typography>
            <Typography
              variant="body2"
              style={{
                color: percentage >= 80 ? '#f44336' : percentage >= 50 ? '#ff9800' : '#4caf50'
              }}
            >
              Used: ₹{currentExpenses} ({percentage.toFixed(1)}%)
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={percentage}
            className={`${classes.progress} ${getProgressColor()}`}
          />
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Set Monthly Expense Limit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Expense Limit (₹)"
            type="number"
            fullWidth
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            inputProps={{ min: 0 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExpenseLimit;
