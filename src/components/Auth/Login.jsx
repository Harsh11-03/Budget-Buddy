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

const Login = ({ switchToSignup }) => {
  const classes = useStyles();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      setOpen(true);
      return;
    }

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (u) => u.username === formData.username && u.password === formData.password
    );

    if (user) {
      // Get the most up-to-date user data including expense limit
      const currentUser = JSON.parse(localStorage.getItem('user'));

      // If the current logged-in user is the same as the one trying to log in,
      // use the current user data to preserve the expense limit
      if (currentUser && currentUser.username === user.username) {
        login(currentUser);
      } else {
        login(user);
      }
    } else {
      setError('Invalid username or password');
      setOpen(true);
    }
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
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
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
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Typography
            className={classes.switchText}
            onClick={switchToSignup}
          >
            Don't have an account? Sign Up
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

export default Login;
