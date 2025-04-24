import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  income: {
    borderLeft: '6px solid #4caf50',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    borderRadius: '12px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    },
  },
  expense: {
    borderLeft: '6px solid #f44336',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    borderRadius: '12px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    },
  },
  cardContent: {
    padding: theme.spacing(2),
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    padding: theme.spacing(2),
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
  },
  amount: {
    fontSize: '1.8rem',
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    color: '#2c3e50',
  },
  chartContainer: {
    height: 180,
    position: 'relative',
    marginTop: theme.spacing(1),
    flexGrow: 1,
  },
}));
