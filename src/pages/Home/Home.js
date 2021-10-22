import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Card, CardContent, Container, CssBaseline,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import useStyles from './Home.styles';

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
  const [phVsTimeStartDate, setPhVsTimeStartDate] = useState(TODAY);
  const [phVsTimeEndDate, setPhVsTimeEndDate] = useState(TOMORROW);
  const [tempVsTimeStartDate, setTempVsTimeStartDate] = useState(TODAY);
  const [tempVsTimeEndDate, setTempVsTimeEndDate] = useState(TOMORROW);

  const dataPhTime = {
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
  };

  const dataTemperatureTime = {
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
  };

  return (
    <>
      <CssBaseline />
      <Container className={classes.mainContainer}>
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
            <Line data={dataPhTime} options={options} />
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
            <Line data={dataTemperatureTime} options={options} />
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Home;
