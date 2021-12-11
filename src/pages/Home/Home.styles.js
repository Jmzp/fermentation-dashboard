import { makeStyles } from '@material-ui/core';
import { TextStyles } from '../../theme';

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingBottom: 20,
  },
  circularProgressContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    marginTop: 20,
  },
  title: {
    ...TextStyles.poppinsRegularText,
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  textValue: {
    marginTop: 5,
    marginLeft: 10,
  },
  dateRangeContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  dateContainer: {
    marginLeft: 25,
  },
});

export default useStyles;
