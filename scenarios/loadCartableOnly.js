import { login } from "../flows/auth.flow.js";
import { loadCartable } from "../flows/cartable.flow.js";
import { sleep } from "k6";
import { htmlReport } from "../lib/k6-reporter.js";

const users = [{ username: "5300044611", password: "1" }];

export const options = {
  vus: 2,
  duration: '1m',
};

export default function () {
    const token = login(users[0]);
    sleep(1);
    if (token) {
        loadCartable(token);
    }
}

export function handleSummary(data) {
    return {
        "reports/html/loadCartable-report.html": htmlReport(data),
        "reports/json/loadCartable-report.json": JSON.stringify(data, null, 2),
    };
}