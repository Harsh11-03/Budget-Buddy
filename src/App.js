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
      <Grid className={classes.grid} container spacing={0} alignItems="center" justify="center" style={{ height: 'calc(100vh - 100px)'}}>
        <Grid item xs={12} sm={4} className={classes.mobile}>
          <Details title="Income" />
        </Grid>
        <Grid ref={main} item xs={12} sm={3} className={classes.main}>
          <Main />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.desktop}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.last}>
          <Details title="Expense" />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
