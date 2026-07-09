import { login } from "../../flows/auth.flow.js";
import { loadMenu } from "../../flows/loadMenu.flow.js";
import { addManagement } from "../../flows/sc2/addManagement.flow.js";
import { sleep } from "k6";
import { htmlReport } from "../../lib/k6-reporter.js";

const users = [{ username: "5300044611", password: "1" }];

export const options = {
    vus: 1,
    iterations: 2,
};

export default function () {
    const token = login(users[0]);
    if (!token) return;

    sleep(1);
    loadMenu(token);
    sleep(1);
    addManagement(token);
    sleep(1);
}

export function handleSummary(data) {
    return {
        "reports/html/sc2/loadAddManagement-report.html": htmlReport(data),
        "reports/json/sc2/loadAddManagement-report.json": JSON.stringify(data, null, 2),
    };
}