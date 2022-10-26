export const preprodConfig =  () => {
  console.log('Preprod');
  return {
    PORT : 3001,
    DB: {
      'TYPE': 'mysql',
      'HOST': 'localhost',
      'NAME': 'plbnestjs24102022',
      'USER': 'root',
      'PASSWORD': '',
      'PORT': 3306,
    }
  }
};
