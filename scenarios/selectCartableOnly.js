import { login } from "../flows/auth.flow.js";
import { selectCartable } from "../flows/selectCartable.flow.js";

import { htmlReport } from "../lib/k6-reporter.js";

const users = [{ username: "5300044611", password: "1" }];

export const options = {
  vus: 2,
  duration: '1m',
};

export default function () {
    const token = login(users[0]);
    if (token) {
        selectCartable(token);
    }
}

export function handleSummary(data) {
    return {
        "reports/html/selectCartable-report.html": htmlReport(data),
        "reports/json/selectCartable-report.json": JSON.stringify(data, null, 2),
    };
}