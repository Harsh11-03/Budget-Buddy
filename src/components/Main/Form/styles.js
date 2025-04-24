import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  radioGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '-10px',
  },
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
    height: '36px',
    borderRadius: '18px',
  },
}));
