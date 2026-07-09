// scenarios/transferManagement.scenario.js
import { transferManagement } from '../../flows/sc5/transferManagement1.flow.js';
import { htmlReport } from "../../lib/k6-reporter.js";

// Test user – replace with actual credentials from your environment
const testUser = {
  username: '5300044611',
  password: '1',
};

export const options = {
  scenarios: {
    transferManagement: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
      maxDuration: '30s',
    },
  },
};

export default function () {
  const results = transferManagement(testUser);
  console.log('Transfer Management flow completed:', results);
}

export function handleSummary(data) {
    return {
        "reports/html/sc5/transferManagement1-report.html": htmlReport(data),
        "reports/json/sc5/transferManagement1-report.json": JSON.stringify(data, null, 2),
    };
}