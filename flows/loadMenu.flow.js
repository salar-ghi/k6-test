import http from 'k6/http'
import { check } from 'k6'
import { ENV } from '../config/env.js'

export function loadMenu(token) {
    const url = `${ENV.baseUrl}values/getmenueitems`

    const params = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        tags: { workflow: "LoadMenu" },
    };

    const res = http.get(url, params);

    check(res, {
        "menu loaded successfully": (r) => r.status === 200,
        "menu not auth error": (r) => r.status !== 401 && r.status !== 403,
    });

    return res;
}