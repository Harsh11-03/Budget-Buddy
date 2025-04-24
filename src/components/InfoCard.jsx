import React from 'react';
import { Paper, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: 8,
    border: '1px dashed rgba(0, 0, 0, 0.1)',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  highlight: {
    fontWeight: 600,
    color: theme.palette.primary.main,
    display: 'inline-block',
    margin: '0 4px',
  },
  title: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    fontSize: '0.9rem',
    color: theme.palette.text.secondary,
  }
}));

const InfoCard = () => {
  const classes = useStyles();
  const isIncome = Math.round(Math.random());

  return (
    <Paper elevation={0} className={classes.root}>
      <Typography className={classes.title} align="center">
        Quick Example
      </Typography>
      <Typography variant="body2" align="center">
        Add
        <span className={classes.highlight}>
          {isIncome ? 'Income' : 'Expense'}
        </span>
        of
        <span className={classes.highlight}>
          {isIncome ? '₹100' : '₹50'}
        </span>
        in Category
        <span className={classes.highlight}>
          {isIncome ? 'Salary' : 'Travel'}
        </span>
        for
        <span className={classes.highlight}>
          {isIncome ? 'Monday' : 'Thursday'}
        </span>
      </Typography>
    </Paper>
  );
};

export default InfoCard;
