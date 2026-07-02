import { login } from "../flows/auth.flow.js";
import { loadMenu } from "../flows/loadMenu.flow.js";
import { loadCartable } from "../flows/cartable.flow.js"
import { selectCartable } from "../flows/selectCartable.flow.js"
import { check, sleep } from "k6";
import exec from 'k6/execution';

const users = [
    { username: "5300044611", password: "1" },
];

export const options = {
    vus: 2,
    duration: '2m',
    thresholds: {
        http_req_failed: ['rate<0.05'],
        http_req_duration : ['p(95)<800', 'p(99)<1500'],
        'http_req_duration{tag:Login}': ['p(95)<1200'],
    },
};

const tokenCache = {};

export default function () {
    const vuId = exec.vu.idInTest;
    const userIndex = (vuId - 1) % users.length;
    const user = users[userIndex];

    if (!tokenCache[vuId]){
        const token = login(user);
        if(!token) return;
        tokenCache[vuId] = token;
    }

    const token  = tokenCache[vuId];

    // === WORKFLOWS ===
    // 2. Load Menu
    loadMenu(token);
    sleep(1);

    loadCartable(token);
    sleep(1);

    // 4. cartable
    selectCartable(token);
    sleep(1);
}

export function handleSummary(data) {
    return {
        "reports/html/cartableForm-report.html": htmlReport(data),
        "reports/json/cartableForm-report.json": JSON.stringify(data, null, 2),
    };
}