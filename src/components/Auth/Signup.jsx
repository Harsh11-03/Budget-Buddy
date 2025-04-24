import React, { useState, useContext } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { AuthContext } from '../../context/AuthContext';
import useStyles from './styles';

const Signup = ({ switchToLogin }) => {
  const classes = useStyles();
  const { signup } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.username || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      setOpen(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setOpen(true);
      return;
    }

    // Check if username already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find((u) => u.username === formData.username);

    if (existingUser) {
      setError('Username already exists');
      setOpen(true);
      return;
    }

    // Create new user
    const newUser = {
      name: formData.name,
      username: formData.username,
      password: formData.password,
      expenseLimit: 0, // Initialize with zero expense limit
    };

    // Add user to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Also set as current user
    localStorage.setItem('user', JSON.stringify(newUser));

    // Login the user
    signup(newUser);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Container component="main" className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <Typography className={classes.logo}>BudgetBuddy</Typography>
        <Typography component="h1" variant="h5" className={classes.title}>
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Typography
            className={classes.switchText}
            onClick={switchToLogin}
          >
            Already have an account? Login
          </Typography>
        </form>
      </Paper>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Signup;
