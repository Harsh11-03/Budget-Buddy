import React, { useRef, useContext } from 'react';
import { Grid, Box } from '@material-ui/core';

import { Details, Main } from './components';
import LandingPage from './components/Auth/LandingPage';
import ExpenseLimit from './components/ExpenseLimit/ExpenseLimit';
import { AuthContext } from './context/AuthContext';
import useStyles from './styles';

const App = () => {
  const classes = useStyles();
  const main = useRef(null);
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <div>
      <Box className={classes.expenseLimitContainer}>
        <ExpenseLimit />
      </Box>
      <Grid
        className={classes.grid}
        container
        spacing={3}
        alignItems="stretch"
        justifyContent="center"
      >
        {/* Horizontal layout: Income | Add Transaction | Expense */}

        {/* Income card - first position */}
        <Grid item xs={12} sm={4} md={4} lg={4} className={classes.card}>
          <Details title="Income" subheader="Track your income sources" />
        </Grid>

        {/* Main tracker - middle position */}
        <Grid ref={main} item xs={12} sm={4} md={4} lg={4} className={classes.main}>
          <Main />
        </Grid>

        {/* Expense card - last position */}
        <Grid item xs={12} sm={4} md={4} lg={4} className={classes.card}>
          <Details title="Expense" subheader="Track your expenses" />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
