const fetch = require('node-fetch');
const { TEST_ENV_VAR } = process.env;

const exampleFunc = async () => {
	console.log('TEST ENV VAR: ', TEST_ENV_VAR);
	const response = await fetch('https://api.ipify.org?format=json');
	const json = await response.json();

	return json;
};

module.exports = exampleFunc;
