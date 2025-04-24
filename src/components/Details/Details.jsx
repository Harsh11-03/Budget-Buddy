import React from 'react';
import { Card, CardHeader, CardContent, Typography, Box } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';

import useStyles from './styles';
import useTransactions from '../../useTransactions';

const DetailsCard = ({ title, subheader }) => {
  const { total, chartData } = useTransactions(title);
  const classes = useStyles();

  return (
    <Card className={title === 'Income' ? classes.income : classes.expense}>
      <CardHeader
        className={classes.cardHeader}
        title={title}
        subheader={subheader}
        titleTypographyProps={{ variant: 'h6', align: 'center' }}
        subheaderTypographyProps={{ align: 'center' }}
      />
      <CardContent className={classes.cardContent}>
        <Typography className={classes.amount} variant="h5">₹{total}</Typography>
        <Box className={classes.chartContainer}>
          <Doughnut
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  fontColor: '#333',
                  fontSize: 11,
                  boxWidth: 12,
                  padding: 10
                }
              },
              cutoutPercentage: 70,
              animation: {
                animateScale: true,
                animateRotate: true
              },
              tooltips: {
                callbacks: {
                  label: function(tooltipItem, data) {
                    return data.labels[tooltipItem.index] + ': ₹' + data.datasets[0].data[tooltipItem.index];
                  }
                }
              }
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default DetailsCard;
