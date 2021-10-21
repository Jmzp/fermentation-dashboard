import { makeStyles } from '@material-ui/core';
import { TextStyles } from '../../theme';

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingBottom: 20,
  },
  cardContainer: {
    marginTop: 20,
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
