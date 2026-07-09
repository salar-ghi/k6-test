import { login } from "../flows/auth.flow.js";
import { loadMenu } from "../flows/loadMenu.flow.js";

import { htmlReport } from "../lib/k6-reporter.js";
const users = [{ username: "5300044611", password: "1" }];
// export { options };

export const options = {
  vus: 2,
  iterations: 2,
//   duration: '1m',
};

export default function () {
    const token = login(users[0]);
    if (token) loadMenu(token);
}

export function handleSummary(data) {
    return {
        "reports/html/loadMenu-report.html": htmlReport(data),
        "reports/json/loadMenu-report.json": JSON.stringify(data, null, 2),
    };
}