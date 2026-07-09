import { login } from "../flows/auth.flow.js";
import { sleep } from "k6";

import { htmlReport } from "../lib/k6-reporter.js";

export const options = { 
    vus: 2, 
    iterations: 2,
    // duration: "30s" 
};
const users = [{ username: "5300044611", password: "1" }];

export default function () {
    login(users[0]);
}

export function handleSummary(data) {
    return {
        "reports/html/login-report.html": htmlReport(data),
        "reports/json/login-report.json": JSON.stringify(data, null, 2),
    };
}