import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DataReport from './DataReport/DataReport';
import useStyles from './GenerateReport.styles';
import { useStores } from '../../stores';
import strings from '../../localization';

const GenerateReport = () => {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  const { phStore, temperatureStore } = useStores();
  return (
    <div className={classes.mainContainer}>
      <PDFDownloadLink
        document={(
          <DataReport
            phObject={phStore.phObject}
            phAverage={phStore.averageOfPh}
            phMax={phStore.maxValueOfPh}
            temperatureObject={temperatureStore.temperatureObject}
            temperatureAverage={temperatureStore.averageOfTemperature}
            temperatureMax={temperatureStore.maxValueOfTemperature}
          />
        )}
        fileName="fermentation-report.pdf"
      >
        {({
          // eslint-disable-next-line no-unused-vars
          blob, url, loading, error,
        }) => (loading
          ? strings.generateReport.loadingDocument
          : strings.generateReport.downloadNow)}
      </PDFDownloadLink>
    </div>
  );
};

export default GenerateReport;
