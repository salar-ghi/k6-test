import { login } from "../../flows/auth.flow.js";
import { loadMenu } from "../../flows/loadMenu.flow.js";
import { loadGroup } from "../../flows/sc3/group.flow.js";
import { sleep } from "k6";
import { htmlReport } from "../../lib/k6-reporter.js";

const users = [{ username: "5300044611", password: "1" }];

export const options = {
    vus: 1,
    iterations: 3,
};

export default function () {
    const token = login(users[0]);
    if (!token) {
        console.log("Login failed");
        return;
    }

    sleep(1);
    loadMenu(token);
    sleep(1);
    loadGroup(token);
    sleep(1);
}

export function handleSummary(data) {
    return {
        "reports/html/sc3/loadGroup-report.html": htmlReport(data),
        "reports/json/sc3/loadGroup-report.json": JSON.stringify(data, null, 2),
    };
}