import { thresholds } from "../config/thresholds.js";

export const baseline = {
  stages: [
    { duration: "1m", target: 10 },   // Ramp up to 10 users over 1 minute
    { duration: "3m", target: 20 },   // Stay at 20 users for 3 minutes
    { duration: "3m", target: 50 },   // Stay at 50 users for 3 minutes
    { duration: "3m", target: 100 },  // Stay at 100 users for 3 minutes
  ],
  thresholds: thresholds,
};
export const smoke = {
  vus: 1,
  duration: "10s",
  thresholds: thresholds,
};
export const soak = {
  vus: 50,
  duration: "6h",
  thresholds: thresholds,
};
export const spike = {
  stages: [
    { duration: "10s", target: 20 },   // Normal load
    { duration: "10s", target: 300 },  // Spike to 300 users
    { duration: "30s", target: 300 },  // Stay at spike for 30 seconds
    { duration: "10s", target: 20 },   // Scale down to normal
  ],
  thresholds: thresholds,
};
export const stress = {
  stages: [
    { duration: "1m", target: 50 },   // Ramp up to 10 users over 1 minute
    { duration: "1m", target: 100 },   // Ramp up to 50 users over 1 minute
    { duration: "1m", target: 300 },  // Ramp up to 100 users over 1 minute
    { duration: "1m", target: 500 },  // Ramp up to 200 users over 1 minute
    { duration: "1m", target: 800 },  // Ramp up to 300 users over 1 minute
    { duration: "1m", target: 1300 },  // Ramp up to 500 users over 1 minute
  ],
  thresholds: thresholds,
};

 const testTypes = {
  baseline:{
    stages: [
      { duration: '1m', target: 10 },
      { duration: '3m', target: 20 },
      { duration: '4m', target: 50 },
      { duration: '2m', target: 0 },
    ],
    thresholds,
  },
  smoke: {
    vus: 1,
    duration: '30s',
    thresholds,
  },
  soak: {
    vus: 50,
    duration: '30m',
    thresholds,
  },
  spike: {
    stages: [
      { duration: '30s', target: 20 },
      { duration: '10s', target: 300 },
      { duration: '45s', target: 300 },
      { duration: '30s', target: 20 },
    ],
    thresholds,
  },
  stress: {
    stages: [
      { duration: '1m', target: 50 },
      { duration: '1m', target: 150 },
      { duration: '1m', target: 400 },
      { duration: '1m', target: 800 },
      { duration: '30m', target: 0 },
    ],
    thresholds,
  },
};
export const TestOption = testTypes[__ENV.TEST_TYPE] || testTypes.baseline