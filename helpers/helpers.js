const axios = require("axios");

const IFTT_ENDPOINT = `https://maker.ifttt.com/trigger/${process.env.IFTTT_DISABLE_WEBHOOK}/with/key/${process.env.IFTTT_KEY}`;

const makeApiCall = () => {
  {
    axios
      .post(IFTT_ENDPOINT)
      .then((res) => {
        console.log(`statusCode: ${res.statusCode}`);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

const calculateTimeout = (batteryState = 100) => {
  if (batteryState > 80) {
    return 0;
  }
  const chargeTimeInMinutes = 100 - batteryState - 10;
  return chargeTimeInMinutes * 60 * 1000;
};

const getTriggerTimeoutText = (calculatedTimeout = 0) => {
  const timeoutInMinutest = calculatedTimeout / 1000 / 60;
  if (timeoutInMinutest < 60) {
    return `API call will be triggered in ${timeoutInMinutest} minutes`;
  }
  return `API call will be triggered in an hour and ${
    timeoutInMinutest % 60
  } minutes`;
};

module.exports = {
  makeApiCall,
  calculateTimeout,
  getTriggerTimeoutText,
};
