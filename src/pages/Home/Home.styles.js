import { makeStyles } from '@material-ui/core';
import { TextStyles } from '../../theme';

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    padding: '20px 50px',
  },
  cardContainer: {
    marginTop: '20px',
  },
  title: {
    ...TextStyles.poppinsRegularText,
  },
  dateRangeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  dateContainer: {
    marginLeft: 25,
  },
});

export default useStyles;
