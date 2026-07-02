export const thresholds = {

  // System Health
  http_req_failed: [
    "rate<0.05"
  ],

  http_req_duration: [
    'p(90)<600',
    "p(95)<1200",
    "p(99)<1500"
  ],
  'http_req_duration{tag:Login}':['p(95)<2000'],
  'http_req_duration{tag:CartableGrid}':['p(95)<1500'],

  // Dashboard
  dashboard_init_duration: [
    "p(95)<2000"
  ],

  // Customer Data
  customer_data_duration: [
    "p(95)<1500"
  ],

  // Purchase Flow
  purchase_duration: [
    "p(95)<5000",
    "p(99)<8000"
  ],

  // Critical APIs
  request_duration: [
    "p(95)<3000"
  ]
};