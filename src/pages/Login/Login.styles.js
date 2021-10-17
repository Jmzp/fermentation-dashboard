import { makeStyles } from '@material-ui/core';
import { TextStyles } from '../../theme';

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...TextStyles.poppinsBoldText,
    textAlign: 'center',
    fontSize: 21,
    marginBottom: '10vh',
  },
});

export default useStyles;
