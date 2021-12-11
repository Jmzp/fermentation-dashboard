import React, { useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Card, CardContent, CircularProgress, Container, CssBaseline, Snackbar, Typography,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { observer } from 'mobx-react';
import useStyles from './Home.styles';
import { useStores } from '../../stores';
import { Alert, HeaderBar } from '../../components';
import { CONSTANTS } from '../../constants';
import strings from '../../localization';

const HIDE_DURATION = 6000;

const options = {
  scales: {
    x: {
      beginAtZero: false,
    },
    y: {},
  },
};

const TODAY = new Date();
const TOMORROW = new Date(TODAY);
TOMORROW.setDate(TOMORROW.getDate() + 3);

const Home = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [phVsTimeStartDate, setPhVsTimeStartDate] = useState(TODAY);
  const [phVsTimeEndDate, setPhVsTimeEndDate] = useState(TOMORROW);
  const [tempVsTimeStartDate, setTempVsTimeStartDate] = useState(TODAY);
  const [tempVsTimeEndDate, setTempVsTimeEndDate] = useState(TOMORROW);
  const [isSnackErrorVisible, setSnackErrorVisibility] = useState(false);
  const { errorStore, phStore, temperatureStore } = useStores();

  const handleCloseSnackError = (_event, reason) => {
    if (reason === CONSTANTS.CLICKAWAY) {
      return;
    }
    errorStore.setCurrentError('');
    setSnackErrorVisibility(false);
  };

  const getPhFromInterval = async () => {
    setIsLoading(true);
    await phStore.loadPhByInterval(phVsTimeStartDate, phVsTimeEndDate);
    setIsLoading(false);
  };

  const getTemperatureFromInterval = async () => {
    setIsLoading(true);
    await temperatureStore.loadTemperatureByInterval(tempVsTimeStartDate, tempVsTimeEndDate);
    setIsLoading(false);
  };

  useEffect(() => {
    const asyncFunction = async () => {
      await getPhFromInterval();
    };
    asyncFunction();
  }, [phVsTimeStartDate, phVsTimeEndDate]);

  useEffect(() => {
    const asyncFunction = async () => {
      await getTemperatureFromInterval();
    };
    asyncFunction();
  }, [tempVsTimeStartDate, tempVsTimeEndDate]);

  useEffect(() => {
    const { currentError } = errorStore;
    if (currentError) {
      setSnackErrorVisibility(true);
    }
  }, [errorStore.currentError]);

  const dataPhTimeConfig = useMemo(() => ({
    labels: phStore.phObject.time,
    datasets: [
      {
        label: 'pH',
        data: phStore.phObject.ph,
        fill: false,
        backgroundColor: 'rgba(245, 162, 22, 0.96)',
        borderColor: 'rgba(168, 106, 0, 0.2)',
      },
    ],
  }), [phStore.phObject]);

  const dataTemperatureTimeConfig = useMemo(() => ({
    labels: temperatureStore.temperatureObject.time,
    datasets: [
      {
        label: 'Temperatura',
        data: temperatureStore.temperatureObject.temperature,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  }), [temperatureStore.temperatureObject]);

  return (
    <>
      <CssBaseline />
      <HeaderBar />
      <Container className={classes.mainContainer}>
        {isLoading ? (
          <div className={classes.circularProgressContainer}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <Card className={classes.cardContainer}>
              <CardContent>
                <div className={classes.cardHeader}>
                  <div className={classes.textContainer}>
                    <Typography variant="h6">
                      {`${strings.home.phAverage}: `}
                    </Typography>
                    <Typography variant="body1" className={classes.textValue}>
                      {phStore.averageOfPh.toFixed(2)}
                    </Typography>
                  </div>
                  <div className={classes.textContainer}>
                    <Typography variant="h6">
                      {`${strings.home.maxValue}: `}
                    </Typography>
                    <Typography variant="body1" className={classes.textValue}>
                      {phStore.maxValueOfPh}
                    </Typography>
                  </div>
                  <div className={classes.dateRangeContainer}>
                    <div className={classes.dateContainer}>
                      <DatePicker
                        openTo="date"
                        label="Inicio"
                        format="dddd/MM/yyyy"
                        views={['year', 'month', 'date']}
                        value={phVsTimeStartDate}
                        onChange={setPhVsTimeStartDate}
                      />
                    </div>
                    <div className={classes.dateContainer}>
                      <DatePicker
                        openTo="date"
                        label="Fin"
                        format="dddd/MM/yyyy"
                        views={['year', 'month', 'date']}
                        value={phVsTimeEndDate}
                        onChange={setPhVsTimeEndDate}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className={classes.title}>pH vs Tiempo</h1>
                </div>
                <Line data={dataPhTimeConfig} options={options} />
              </CardContent>
            </Card>
            <Card className={classes.cardContainer}>
              <CardContent>
                <div className={classes.cardHeader}>
                  <div className={classes.textContainer}>
                    <Typography variant="h6">
                      {`${strings.home.temperatureAverage}: `}
                    </Typography>
                    <Typography variant="body1" className={classes.textValue}>
                      {temperatureStore.averageOfTemperature.toFixed(2)}
                    </Typography>
                  </div>
                  <div className={classes.textContainer}>
                    <Typography variant="h6">
                      {`${strings.home.maxValue}: `}
                    </Typography>
                    <Typography variant="body1" className={classes.textValue}>
                      {temperatureStore.maxValueOfTemperature}
                    </Typography>
                  </div>
                  <div className={classes.dateRangeContainer}>
                    <div className={classes.dateContainer}>
                      <DatePicker
                        openTo="date"
                        label="Inicio"
                        format="dddd/MM/yyyy"
                        views={['year', 'month', 'date']}
                        value={tempVsTimeStartDate}
                        onChange={setTempVsTimeStartDate}
                      />
                    </div>
                    <div className={classes.dateContainer}>
                      <DatePicker
                        openTo="date"
                        label="Fin"
                        format="dddd/MM/yyyy"
                        views={['year', 'month', 'date']}
                        value={tempVsTimeEndDate}
                        onChange={setTempVsTimeEndDate}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className={classes.title}>Temperatura vs Tiempo</h1>
                </div>
                <Line data={dataTemperatureTimeConfig} options={options} />
              </CardContent>
            </Card>
          </>
        )}
      </Container>
      <Snackbar
        open={isSnackErrorVisible}
        autoHideDuration={HIDE_DURATION}
        onClose={handleCloseSnackError}
      >
        <Alert onClose={handleCloseSnackError} severity="error">
          {errorStore.currentError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default observer(Home);
