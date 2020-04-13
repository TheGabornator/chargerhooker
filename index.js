require("dotenv").config();
const express = require("express");

const {
  makeApiCall,
  calculateTimeout,
  getTriggerTimeoutText,
} = require("./helpers/helpers");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

app.post("/triggerHook", (req, res) => {
  const batteryState = (req.body && parseInt(req.body.batteryState)) || 100;
  const timeoutMillSec = calculateTimeout(batteryState);

  if (batteryState >= 100) {
    res.status(400).send("Something must have gone wrong!");
  } else {
    setTimeout(makeApiCall, timeoutMillSec);
    res.status(200).send(getTriggerTimeoutText(timeoutMillSec));
  }
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
