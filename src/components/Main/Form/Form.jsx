import React, { useState, useContext } from 'react';
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import Snackbar from '../../Snackbar/Snackbar';
import formatDate from '../../../utils/formatDate';
import { ExpenseTrackerContext } from '../../../context/context';
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import useStyles from './styles';

const initialState = {
  amount: '',
  category: '',
  type: 'Income',
  date: formatDate(new Date()),
};

const NewTransactionForm = () => {
  const classes = useStyles();
  const { addTransaction } = useContext(ExpenseTrackerContext);
  const [formData, setFormData] = useState(initialState);
  const [open, setOpen] = React.useState(false);

  const createTransaction = () => {
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;

    if (incomeCategories.map((iC) => iC.type).includes(formData.category)) {
      setFormData({ ...formData, type: 'Income' });
    } else if (expenseCategories.map((iC) => iC.type).includes(formData.category)) {
      setFormData({ ...formData, type: 'Expense' });
    }

    setOpen(true);
    addTransaction({ ...formData, amount: Number(formData.amount), id: uuidv4() });
    setFormData(initialState);
  };



  const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={1}>
      <Snackbar open={open} setOpen={setOpen} />
      <Grid item xs={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Type</InputLabel>
          <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Category</InputLabel>
          <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
            {selectedCategories.map((c) => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          size="small"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Date"
          type="date"
          size="small"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          fullWidth
          onClick={createTransaction}
          size="small"
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewTransactionForm;
