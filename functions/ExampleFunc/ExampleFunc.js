const fetch = require('node-fetch');
const { TEST_ENV_VAR } = process.env;

const ExampleFunc = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();

    return {
      test: 'test!',
      testEnvVar: TEST_ENV_VAR,
      ip: data.ip,
    };
  } catch (err) {
    console.error('exampleFunc error: ', err);
    return err;
  }
};

module.exports = ExampleFunc;
