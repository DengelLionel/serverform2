const axios = require('axios'); // Asegúrate de importar axios



exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST,GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const { nombre, nombreempresa, celular, aceptopoliticas,mensaje } = JSON.parse(event.body);


    // URL del script de Google Apps Script
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbxv84-Ye_AZULyl16sw24Wh4Ozgwgd8wRjnHoOBzYHn3iLn1ffiZ4ysbp-XdL2El4Qx/exec';

    // Datos a enviar al script de Google Apps Script
    const scriptData = {
      nombre: nombre,
      nombreempresa:nombreempresa,
      celular: celular.toString(),
      mensaje:mensaje,
      aceptopoliticas: aceptopoliticas
    };

    // Realizar solicitud POST al script de Google Apps Script
    const response = await axios.post(scriptUrl, JSON.stringify(scriptData), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Verifica la respuesta del script de Google Apps Script
    if (response.status === 200) {
      console.log('Datos enviados al script de Google Apps Script con éxito:', response.data);
      return { statusCode: 200, headers, body: 'Datos guardados correctamente y enviados al script de Google Apps Script' };
    } else {
      throw new Error('Error al enviar datos al script de Google Apps Script');
    }
  } catch (error) {
    console.error('Error guardando los datos o enviando al script de Google Apps Script:', error);
    return { statusCode: 500, headers, body: 'Error interno del servidor' };
  }
};
