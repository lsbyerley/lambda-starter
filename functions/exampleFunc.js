const fetch = require('node-fetch');
const { TEST_ENV_VAR } = process.env;

const exampleFunc = async () => {
  try {
    console.log('TEST ENV VAR: ', TEST_ENV_VAR);
    const response = await fetch('https://api.ipify.org?format=json');
    const json = await response.json();

    return json;
  } catch (err) {
    return err;
  }
};

module.exports = exampleFunc;
