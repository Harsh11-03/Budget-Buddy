import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  card: {
    display: 'flex',
    height: '100%',
    '& > *': {
      width: '100%',
      height: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(2),
    },
  },
  main: {
    display: 'flex',
    height: '100%',
    '& > *': {
      width: '100%',
      height: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      order: 2, // On mobile, Main appears in the middle
      marginBottom: theme.spacing(2),
    },
  },
  grid: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: theme.spacing(2),
    minHeight: 'calc(100vh - 150px)',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
  },
  expenseLimitContainer: {
    padding: theme.spacing(2),
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));
