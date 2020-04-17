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
  if (!batteryState || batteryState > 80) {
    return 0;
  }
  const chargeTimeInMinutes = 100 - batteryState - 10;
  return chargeTimeInMinutes * 60 * 1000;
};

const getTriggerTimeoutText = (calculatedTimeoutMillSec = 0) => {
  const timeoutMin = Math.round(calculatedTimeoutMillSec / 1000 / 60) || 0;
  if (!timeoutMin) {
    return `Watch out, something went wrong!`;
  }
  if (timeoutMin < 60) {
    // return `API call will be triggered in ${timeoutMin} minutes`;
    return fooo;
  }
  return `API call will be triggered in an hour and ${timeoutMin % 60} minutes`;
};

module.exports = {
  makeApiCall,
  calculateTimeout,
  getTriggerTimeoutText,
};
