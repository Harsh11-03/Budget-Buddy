import React, { useContext } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider, Button, Box } from '@material-ui/core';
import { ExitToApp, AccountBalanceWallet } from '@material-ui/icons';
import { ExpenseTrackerContext } from '../../context/context';
import { AuthContext } from '../../context/AuthContext';
import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';

const ExpenseTracker = () => {
  const classes = useStyles();
  const { balance } = useContext(ExpenseTrackerContext);
  const { logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeader}
        title="Add Transaction"
        titleTypographyProps={{ variant: 'h6', align: 'center' }}
        action={
          <Button
            color="secondary"
            variant="text"
            startIcon={<ExitToApp />}
            onClick={handleLogout}
            size="small"
          >
            Logout
          </Button>
        }
      />
      <CardContent>
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" mb={1}>
          <AccountBalanceWallet color="primary" style={{ fontSize: 24, marginRight: 8 }} />
          <Typography className={classes.balanceText} align="center">
            Balance: ₹{balance}
          </Typography>
        </Box>

        <Divider className={classes.divider} />

        <Box className={classes.formContainer}>
          <Form />
        </Box>
      </CardContent>

      <CardContent className={classes.cartContent}>
        <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 500 }}>
          Recent Transactions
        </Typography>
        <List />
      </CardContent>
    </Card>
  );
};

export default ExpenseTracker;
