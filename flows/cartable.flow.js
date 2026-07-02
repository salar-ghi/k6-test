import http from "k6/http";
import { check } from "k6";
import { ENV } from "../config/env.js";

export function loadCartable(token) {
    const base = ENV.baseUrl;
    const params = {
        headers: { Authorization: `Bearer ${token}` },
        tags: { workflow: "LoadCartable" }
    };

    // First form config
    let res = http.get(`${base}formsettings/form-config/84E4D614-AF3C-40BC-AA5F-0D403636BFD1`, params);
    check(res, { "form config 1": (r) => r.status === 200 });

    // Grid
    res = http.get(`${base}C_84E4D614_AF3C_40BC_AA5F_0D403636BFD1/GetGrid_1_sys_Menu_Cartable`, params);
    check(res, { 
        "cartable grid": (r) => r.status === 200,
        "cartable grid not 401/403": (r) => r.status !== 401 && r.status !== 403
    });
    
    console.log(`Cartable Grid Status: ${res.status}`);

    return res;
}