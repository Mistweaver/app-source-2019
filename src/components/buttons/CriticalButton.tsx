import {
	withStyles,
	Theme,
  } from '@material-ui/core/styles';
  import Button from '@material-ui/core/Button';

const CriticalButton = withStyles((theme: Theme) => ({
	root: {
	  /*color: theme.palette.getContrastText(purple[500]),
	  backgroundColor: purple[500],
	  '&:hover': {
			backgroundColor: purple[700],
	  },*/
	  color: '#B5CCD6',
	  backgroundColor: '#86210a',
	  '&:hover': {
		  color: '#B5CCD6',
		  backgroundColor: '#631F0F',
		  border: '1px solid #D46938'
	  },
	  margin: 5


	  
	},
}))(Button);

export default CriticalButton;