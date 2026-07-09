import { login } from "../../flows/auth.flow.js";
import { loadMenu } from "../../flows/loadMenu.flow.js";
import { loadManagement } from "../../flows/sc2/management.flow.js";
import { loadManagementSelect } from "../../flows/sc2/managementSelect.flow.js";
import { addManagement } from "../../flows/sc2/addManagement.flow.js";
import { saveManagement } from "../../flows/sc2/saveManagement.flow.js";
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

    loadManagement(token);
    sleep(1);

    loadManagementSelect(token);
    sleep(1);

    addManagement(token);
    sleep(1);

    saveManagement(token); 
    sleep(1);
}

export function handleSummary(data) {
    return {
        "reports/html/sc2/managementFull-report.html": htmlReport(data),
        "reports/json/sc2/managementFull-report.json": JSON.stringify(data, null, 2),
    };
}