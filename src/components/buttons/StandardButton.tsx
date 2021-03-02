import {
  // createMuiTheme,
  // createStyles,
  withStyles,
  // makeStyles,
  Theme,
  // ThemeProvider,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import { green, purple } from '@material-ui/core/colors';

/*export const StandardButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button);*/

const StandardButton = withStyles((theme: Theme) => ({
  	root: {
    	/*color: theme.palette.getContrastText(purple[500]),
    	backgroundColor: purple[500],
    	'&:hover': {
      		backgroundColor: purple[700],
		},*/
		color: '#B5CCD6',
    	backgroundColor: '#276D82',
    	'&:hover': {
			color: '#3C4953',
			backgroundColor: '#CADADD',
			border: '1px solid #D46938'
		},
		margin: 5


		
  	},
}))(Button);

/*const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

export default function CustomizedButtons() {
  	const classes = useStyles();

  	return (
      	<StandardButton variant="contained" color="primary" className={classes.margin}>
        		Custom CSS
      	</StandardButton>
  	);
}*/

export default StandardButton;