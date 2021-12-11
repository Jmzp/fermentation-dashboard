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
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardSubHeader: {
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
    marginTop: 20,
  },
  title: {
    flex: 1,
    ...TextStyles.poppinsRegularText,
  },
  alertButtonContainer: {
    alignItems: 'flex-end',
  },
  chartContainer: {
    marginTop: 20,
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
