import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Card, CardContent, Container, CssBaseline,
} from '@material-ui/core';
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

const data = {
  labels: time,
  datasets: [
    {
      label: 'PH',
      data: ph,
      fill: false,
      backgroundColor: 'rgba(245, 162, 22, 0.96)',
      borderColor: 'rgba(168, 106, 0, 0.2)',
    },
  ],
};

const options = {
  scales: {
    x: {
      beginAtZero: false,
    },
    y: {
    },
  },
};

const LineChart = () => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container>
        <Card className={classes.cardContainer}>
          <CardContent>
            <div>
              <h1>pH vs Tiempo (Horas)</h1>
            </div>
            <Line data={data} options={options} />
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default LineChart;
