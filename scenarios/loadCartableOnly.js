import { login } from "../flows/auth.flow.js";
import { loadCartable } from "../flows/cartable.flow.js";
import { loadMenu } from "../flows/loadMenu.flow.js";
import { sleep } from "k6";
import { htmlReport } from "../lib/k6-reporter.js";

const users = [{ username: "5300044611", password: "1" }];

export const options = {
    vus: 1,           // ← Reduce to 1 VU for stability while debugging
    iterations: 3,
};

export default function () {
    const token = login(users[0]);
    if (!token) {
        console.log("Login failed, skipping iteration");
        return;
    }

    sleep(1);
    loadMenu(token);
    sleep(1);
    loadCartable(token);
    sleep(1);
}

export function handleSummary(data) {
    return {
        "reports/html/loadCartable-report.html": htmlReport(data),
        "reports/json/loadCartable-report.json": JSON.stringify(data, null, 2),
    };
}