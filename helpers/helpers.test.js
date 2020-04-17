const { calculateTimeout, getTriggerTimeoutText } = require("./helpers");

describe("calculateTimeout", () => {
  it("returns 0 if battery state higher than 80 (%)", () => {
    const batteryState = 100;
    const calculatedTimeout = calculateTimeout(batteryState);
    expect(calculatedTimeout).toBe(0);
  });

  it("returns 0 if battery state is undefined", () => {
    const batteryState = undefined;
    const calculatedTimeout = calculateTimeout(batteryState);
    expect(calculatedTimeout).toBe(0);
  });

  it("returns 0 if battery state is null", () => {
    const batteryState = null;
    const calculatedTimeout = calculateTimeout(batteryState);
    expect(calculatedTimeout).toBe(0);
  });

  it("returns 2400000 if battery state is 50 (%)", () => {
    const batteryState = 50;
    const calculatedTimeout = calculateTimeout(batteryState);
    expect(calculatedTimeout).toBe(2400000);
  });

  it("returns a number", () => {
    const batteryState = 50;
    const calculatedTimeout = calculateTimeout(batteryState);
    expect(typeof calculatedTimeout).toBe("number");
  });

  describe("getTriggerTimeoutText", () => {
    it("returns right text if timeout less than an hour", () => {
      const calculatedTimeoutMillSec = 2600000;
      const timeoutText = "API call will be triggered in 43 minutes";
      expect(getTriggerTimeoutText(calculatedTimeoutMillSec)).toBe(timeoutText);
    });

    it("returns right text if timeout is null", () => {
      const calculatedTimeoutMillSec = null;
      const timeoutText = "Watch out, something went wrong!";
      expect(getTriggerTimeoutText(calculatedTimeoutMillSec)).toBe(timeoutText);
    });

    it("returns right text if timeout is undefined", () => {
      const calculatedTimeoutMillSec = undefined;
      const timeoutText = "Watch out, something went wrong!";
      expect(getTriggerTimeoutText(calculatedTimeoutMillSec)).toBe(timeoutText);
    });
  });
});
