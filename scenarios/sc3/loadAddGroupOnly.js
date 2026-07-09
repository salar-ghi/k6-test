import { login } from "../../flows/auth.flow.js";
import { loadMenu } from "../../flows/loadMenu.flow.js";
import { addGroup } from "../../flows/sc3/addGroup.flow.js";
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
    addGroup(token);
    sleep(1);
}

export function handleSummary(data) {
    return {
        "reports/html/sc3/loadAddGroup-report.html": htmlReport(data),
        "reports/json/sc3/loadAddGroup-report.json": JSON.stringify(data, null, 2),
    };
}