import React from 'react';
import {
  Page, Text, View, Document, StyleSheet,
} from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import moment from 'moment';
import strings from '../../../localization';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  pageHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
  },
  subTitle: {
    color: '#a33333',
  },
  date: {
    fontSize: 14,
  },
  description: {
    fontSize: 14,
  },
  pageContent: {
    flexDirection: 'row',
  },
  section: {
    flex: 1,
    margin: 10,
  },
  table: {
    flexDirection: 'column',
    marginTop: 20,
    borderColor: 'black',
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  tableColumn: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
  simpleText: {
    fontSize: 14,
  },
});

// Create Document Component
const DataReport = (props) => {
  const {
    phObject, phAverage, phMax, temperatureObject, temperatureAverage, temperatureMax,
  } = props;

  const renderPhValues = () => {
    const data = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < phObject.ph.length; i++) {
      const ph = phObject.ph[i];
      const time = phObject.time[i];
      data.push((
        <View style={styles.tableRow}>
          <View style={styles.tableColumn}>
            <Text style={styles.simpleText}>{ph}</Text>
          </View>
          <View style={styles.tableColumn}>
            <Text style={styles.simpleText}>{time}</Text>
          </View>
        </View>
      ));
    }
    return data;
  };

  const renderTemperatureValues = () => {
    const data = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < temperatureObject.temperature.length; i++) {
      const temperature = temperatureObject.temperature[i];
      const time = temperatureObject.time[i];
      data.push((
        <View style={styles.tableRow}>
          <View style={styles.tableColumn}>
            <Text style={styles.simpleText}>{temperature}</Text>
          </View>
          <View style={styles.tableColumn}>
            <Text style={styles.simpleText}>{time}</Text>
          </View>
        </View>
      ));
    }
    return data;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.date}>{moment().format('DD/MM/YYYY - HH:mm')}</Text>
          <Text style={styles.title}>{strings.generateReport.fermentationProcess}</Text>
        </View>
        <View style={styles.pageContent}>
          <View style={styles.section}>
            <Text style={styles.subTitle}>{strings.generateReport.ph}</Text>
            <Text style={styles.description}>{`${strings.generateReport.average}: ${phAverage.toFixed(2)}`}</Text>
            <Text style={styles.description}>{`${strings.generateReport.maxValue}: ${phMax}`}</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableColumn}>
                  <Text>{strings.generateReport.ph}</Text>
                </View>
                <View style={styles.tableColumn}>
                  <Text>{strings.generateReport.time}</Text>
                </View>
              </View>
              {renderPhValues()}
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.subTitle}>{strings.generateReport.temperature}</Text>
            <Text style={styles.description}>{`${strings.generateReport.average}: ${temperatureAverage.toFixed(2)}`}</Text>
            <Text style={styles.description}>{`${strings.generateReport.maxValue}: ${temperatureMax}`}</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableColumn}>
                  <Text>{strings.generateReport.temperature}</Text>
                </View>
                <View style={styles.tableColumn}>
                  <Text>{strings.generateReport.time}</Text>
                </View>
              </View>
              {renderTemperatureValues()}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

DataReport.propTypes = {
  phObject: PropTypes.object.isRequired,
  phAverage: PropTypes.number.isRequired,
  phMax: PropTypes.number.isRequired,
  temperatureObject: PropTypes.object.isRequired,
  temperatureAverage: PropTypes.number.isRequired,
  temperatureMax: PropTypes.number.isRequired,
};

export default DataReport;
