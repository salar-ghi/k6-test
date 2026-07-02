import http from "k6/http";
import { check } from "k6";
import { ENV } from "../config/env.js";

export function selectCartable(token) {
    const base = ENV.baseUrl;
    const params = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',   // ← add this
        },
        tags: { workflow: "SelectCartable" }
    };

    const formId = "931DB9CA-AD20-435E-87C5-DEA1F78D296E";

    let res = http.get(`${base}C_${formId}/GetGrid_1_sys_Menu_PUB_TB_REQUEST_CREL`, params);
    check(res, { "select grid": (r) => r.status === 200 });

    res = http.post(`${base}formsettings/form-visited`, JSON.stringify({ formId }), params);
    check(res, { "form visited": (r) => r.status === 200 || r.status === 204 });

    res = http.get(`${base}formsettings/form-config/${formId}`, params);
    check(res, { "form config select": (r) => r.status === 200 });

    return res;
}