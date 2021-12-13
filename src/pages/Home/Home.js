import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Line } from 'react-chartjs-2';
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Snackbar,
  Typography,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { observer } from 'mobx-react';
import { useAlert } from 'react-alert';
import useStyles from './Home.styles';
import { useStores } from '../../stores';
import { Alert, HeaderBar } from '../../components';
import { CONSTANTS } from '../../constants';
import strings from '../../localization';
import AlertDialog from './AlertDialog';

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
  const [isPhAlertModalVisible, setPhAlertModalVisibility] = useState(false);
  const [isTemperatureAlertModalVisible, setTemperatureAlertModalVisibility] = useState(false);
  const {
    errorStore, phStore, temperatureStore, alertStore,
  } = useStores();
  const alert = useAlert();

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

  const openPhAlertModal = () => {
    setPhAlertModalVisibility(true);
  };

  const closePhAlertModal = () => {
    setPhAlertModalVisibility(false);
  };

  const openTemperatureAlertModal = () => {
    setTemperatureAlertModalVisibility(true);
  };

  const closeTemperatureAlertModal = () => {
    setTemperatureAlertModalVisibility(false);
  };

  const showMessageAlert = useCallback((message) => {
    alert.show(message, {
      title: '',
      closeCopy: strings.actions.ok,
    });
  }, [alert]);

  const savePhAlert = useCallback(async (value) => {
    const { phAlert } = alertStore;
    closePhAlertModal();
    setIsLoading(true);
    if (Object.keys(phAlert).length) {
      const result = await alertStore.updateAlert(phAlert.id, value);
      if (result) {
        showMessageAlert(strings.messages.alertUpdated);
      }
    } else {
      const result = await alertStore.createAlert(CONSTANTS.ALERTS_TYPE.ph, value);
      if (result) {
        showMessageAlert(strings.messages.alertSaved);
      }
    }
    await alertStore.loadAlerts();
    setIsLoading(false);
  }, [alertStore]);

  const saveTemperatureAlert = useCallback(async (value) => {
    const { temperatureAlert } = alertStore;
    closeTemperatureAlertModal();
    setIsLoading(true);
    if (Object.keys(temperatureAlert).length) {
      const result = await alertStore.updateAlert(temperatureAlert.id, value);
      if (result) {
        showMessageAlert(strings.messages.alertUpdated);
      }
    } else {
      const result = await alertStore.createAlert(CONSTANTS.ALERTS_TYPE.temperature, value);
      if (result) {
        showMessageAlert(strings.messages.alertSaved);
      }
    }
    await alertStore.loadAlerts();
    setIsLoading(false);
  }, [alertStore]);

  const deletePhAlert = useCallback(async () => {
    const { phAlert } = alertStore;
    closePhAlertModal();
    setIsLoading(true);
    if (Object.keys(phAlert).length) {
      const result = await alertStore.deleteArt(phAlert.id);
      if (result) {
        showMessageAlert(strings.messages.alertDeleted);
      }
    }
    setIsLoading(false);
  }, [alertStore]);

  const deleteTemperatureAlert = useCallback(async () => {
    const { temperatureAlert } = alertStore;
    closeTemperatureAlertModal();
    setIsLoading(true);
    if (Object.keys(temperatureAlert).length) {
      const result = await alertStore.deleteArt(temperatureAlert.id);
      if (result) {
        showMessageAlert(strings.messages.alertDeleted);
      }
    }
    setIsLoading(false);
  }, [alertStore]);

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
    const asyncFunction = async () => {
      await alertStore.loadAlerts();
    };
    asyncFunction();
  }, []);

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
                <div className={classes.cardSubHeader}>
                  <h1 className={classes.title}>pH vs Tiempo</h1>
                  <div className={classes.alertButtonContainer}>
                    <Button variant="contained" color="secondary" onClick={openPhAlertModal}>
                      {strings.home.manageAlert}
                    </Button>
                  </div>
                </div>
                <div className={classes.chartContainer}>
                  <Line data={dataPhTimeConfig} options={options} />
                </div>
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
                <div className={classes.cardSubHeader}>
                  <h1 className={classes.title}>Temperatura vs Tiempo</h1>
                  <div className={classes.alertButtonContainer}>
                    <Button variant="contained" color="secondary" onClick={openTemperatureAlertModal}>
                      {strings.home.manageAlert}
                    </Button>
                  </div>
                </div>
                <div className={classes.chartContainer}>
                  <Line data={dataTemperatureTimeConfig} options={options} />
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </Container>
      <AlertDialog
        isOpen={isPhAlertModalVisible}
        title={strings.home.managePhAlert}
        textFieldLabel={strings.home.phValue}
        textFieldInitialValue={Object.keys(alertStore.phAlert).length ? alertStore.phAlert.value : ''}
        onSave={savePhAlert}
        onDelete={deletePhAlert}
        onCancel={closePhAlertModal}
        onClose={closePhAlertModal}
      />
      <AlertDialog
        isOpen={isTemperatureAlertModalVisible}
        title={strings.home.manageTemperatureAlert}
        textFieldLabel={strings.home.temperatureValue}
        textFieldInitialValue={Object.keys(alertStore.temperatureAlert).length ? alertStore.temperatureAlert.value : ''}
        onDelete={deleteTemperatureAlert}
        onSave={saveTemperatureAlert}
        onCancel={closeTemperatureAlertModal}
        onClose={closeTemperatureAlertModal}
      />
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
