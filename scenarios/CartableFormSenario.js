import { login } from "../flows/auth.flow.js";
import { loadMenu } from "../flows/loadMenu.flow.js";
import { loadCartable } from "../flows/cartable.flow.js";
import { selectCartable } from "../flows/selectCartable.flow.js";
import { sleep } from "k6";
import exec from 'k6/execution';
import { htmlReport } from "../lib/k6-reporter.js";

const users = [{ username: "5300044611", password: "1" }];

export const options = {
    vus: 1,           // Use 1 VU while fixing
    iterations: 3,
};

const tokenCache = {};

export default function () {
    const vuId = exec.vu.idInTest;
    const user = users[(vuId - 1) % users.length];

    if (!tokenCache[vuId]) {
        const token = login(user);
        if (!token) return;
        tokenCache[vuId] = token;
    }

    const token = tokenCache[vuId];

    loadMenu(token);
    sleep(1);

    loadCartable(token);
    sleep(1);

    selectCartable(token);
    sleep(1);
}

export function handleSummary(data) {
    return {
        "reports/html/cartableForm-report.html": htmlReport(data),
        "reports/json/cartableForm-report.json": JSON.stringify(data, null, 2),
    };
}