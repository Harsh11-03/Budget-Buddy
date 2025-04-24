import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  paper: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '10px',
    maxWidth: '400px',
    width: '100%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    marginBottom: theme.spacing(3),
    color: '#3f51b5',
  },
  switchText: {
    marginTop: theme.spacing(2),
    cursor: 'pointer',
    color: theme.palette.primary.main,
    textAlign: 'center',
  },
  logo: {
    fontSize: '2.5rem',
    marginBottom: theme.spacing(2),
    color: '#3f51b5',
    fontWeight: 'bold',
  },
}));
