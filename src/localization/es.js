export default {
  errors: {
    connectionError: 'Error de conexión',
    pageNotFound: 'Página no encontrada',
    phError: 'Ocurrió un error al obtener el pH',
    temperatureError: 'Ocurrió un error al obtener la Temperatura',
  },
  actions: {
    save: 'Guardar',
    cancel: 'Cancelar',
  },
  home: {
    phAverage: 'pH Promedio',
    temperatureAverage: 'Temperatura Promedio',
    maxValue: 'Valor Máximo',
    manageAlert: 'Gestionar alerta',
    managePhAlert: 'Gestionar alerta de pH',
    manageTemperatureAlert: 'Gestionar alerta de Temperatura',
    phValue: 'Valor del pH',
    temperatureValue: 'Valor de la Temperatura',
    alertDialog: {
      alertDescription: 'Ingrese el valor de la alerta, el cual el sistema tomara como referencia para que en el momento en el que sea alcanzado o superado le sea notificado vía correo electrónico.',
    },
  },
  generateReport: {
    loadingDocument: 'Cargando Documento...',
    downloadNow: '¡Descargar Ahora!',
    ph: 'pH',
    average: 'Promedio',
    maxValue: 'Valor Máximo',
    time: 'Tiempo',
    temperature: 'Temperatura',
    fermentationProcess: 'Proceso de Fermentación',
  },
};
