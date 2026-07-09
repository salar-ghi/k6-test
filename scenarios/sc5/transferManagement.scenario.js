import { login } from "../../flows/auth.flow.js";
import { loadMenu } from "../../flows/loadMenu.flow.js";
import { transferManagement } from "../../flows/sc5/transferManagement.flow.js";
import { sleep } from "k6";
import exec from 'k6/execution';
import { htmlReport } from "../../lib/k6-reporter.js";

const users = [{ username: "5300044611", password: "1" }];

export const options = {
    vus: 1,
    iterations: 2,
};

const tokenCache = {};

export default function () {
    const vuId = exec.vu.idInTest;
    const user = users[(vuId - 1) % users.length];

    // Login + Token Cache
    if (!tokenCache[vuId]) {
        const token = login(user);
        if (!token) {
            console.log(`VU ${vuId}: Login failed`);
            return;
        }
        tokenCache[vuId] = token;
    }

    const token = tokenCache[vuId];

    loadMenu(token);
    sleep(1);

    transferManagement(token);
    sleep(1);
}

export function handleSummary(data) {
    return {
        "reports/html/sc5/transferManagement-report.html": htmlReport(data),
        "reports/json/sc5/transferManagement-report.json": JSON.stringify(data, null, 2),
    };
}