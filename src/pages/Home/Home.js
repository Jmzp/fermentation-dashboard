import React, { useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Card, CardContent, CircularProgress, Container, CssBaseline, Snackbar,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { observer } from 'mobx-react';
import useStyles from './Home.styles';
import HeaderBar from '../../components/HeaderBar';
import { useStores } from '../../stores';
import { Alert } from '../../components';

const HIDE_DURATION = 6000;
const time = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
];
const ph = [
  5.5,
  5.49,
  5.51,
  5.51,
  5.49,
  5.46,
  5.44,
  5.41,
  5.38,
  5.32,
  5.29,
  5.21,
  5.12,
  5.09,
  5,
  4.97,
  4.95,
  4.82,
  4.73,
  4.68,
  4.59,
  4.39,
  4.32,
  4.28,
  4.25,
  4.21,
  4.23,
  4.18,
  4.18,
  4.16,
  4.15,
  4.15,
  4.17,
  4.15,
  4.15,
  4.14,
  4.13,
  4.15,
  4.16,
  4.13,
  4.14,
  4.15,
  4.14,
  4.13,
  4.15,
  4.15,
  4.14,
  4.15,
];
const temperature = [...ph].reverse();

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
    if (reason === 'clickaway') {
      return;
    }
    errorStore.setCurrentError('');
    setSnackErrorVisibility(false);
  };

  const getPhFromInterval = async () => {
    setIsLoading(true);
    phStore.loadPhByInterval(phVsTimeStartDate, phVsTimeEndDate);
    setIsLoading(false);
  };

  const getTemperatureFromInterval = async () => {
    setIsLoading(true);
    temperatureStore.loadTemperatureByInterval(tempVsTimeStartDate, tempVsTimeEndDate);
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
    labels: time,
    datasets: [
      {
        label: 'pH',
        data: ph,
        fill: false,
        backgroundColor: 'rgba(245, 162, 22, 0.96)',
        borderColor: 'rgba(168, 106, 0, 0.2)',
      },
    ],
  }), []);

  const dataTemperatureTimeConfig = useMemo(() => ({
    labels: time,
    datasets: [
      {
        label: 'temperature',
        data: temperature,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  }), []);

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
                <div>
                  <h1 className={classes.title}>pH vs Tiempo (Horas)</h1>
                </div>
                <Line data={dataPhTimeConfig} options={options} />
              </CardContent>
            </Card>
            <Card className={classes.cardContainer}>
              <CardContent>
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
                <div>
                  <h1 className={classes.title}>Temperatura vs Tiempo (Horas)</h1>
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
