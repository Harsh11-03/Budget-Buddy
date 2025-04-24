import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderLeft: '6px solid #3f51b5',
    maxWidth: '100%',
    margin: '0 auto',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  cartContent: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    flexGrow: 1,
    overflowY: 'auto',
    maxHeight: '200px',
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
  cardHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    padding: theme.spacing(1.5),
  },
  balanceText: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#2c3e50',
    marginBottom: theme.spacing(1),
  },
  formContainer: {
    marginTop: theme.spacing(1),
  },
}));
