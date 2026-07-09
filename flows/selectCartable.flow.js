import http from "k6/http";
import { check } from "k6";
import { ENV } from "../config/env.js";

export function selectCartable(token) {
    const paramsWithAuth = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        tags: { workflow: "SelectCartable" }
    };

    const formId = "931DB9CA-AD20-435E-87C5-DEA1F78D296E";

    let res;

    // 1. Select Grid
    res = http.get(
        `${ENV.baseUrl}C_${formId}/GetGrid_1_sys_Menu_PUB_TB_REQUEST_CREL?pageIndex=0&pageSize=10&sortColumnName=CREATED_AT&order=desc&OrmId=${formId}`,
        paramsWithAuth
    );
    check(res, { 
        "select grid": (r) => r.status === 200,
        "select grid not 401/403": (r) => r.status !== 401 && r.status !== 403
    });

    // 2. Form Visited → CHANGED TO GET
    res = http.get(
        `${ENV.baseUrl}formsettings/form-visited?formId=${formId}`,
        paramsWithAuth
    );
    check(res, { 
        "form visited": (r) => r.status === 200 || r.status === 204 
    });

    // 3. Form Config
    res = http.get(
        `${ENV.baseUrl}formsettings/form-config/${formId}`,
        paramsWithAuth
    );
    check(res, { "form config select": (r) => r.status === 200 });

    // 4. JS Asset (Hardcoded - different port)
    res = http.get(
        "http://192.168.10.178:1379/assets/TF_931DB9CA_AD20_435E_87C5_DEA1F78D296E-8c195cc2.js",
        { tags: { workflow: "SelectCartable", type: "asset" } }
    );
    check(res, { 
        "js asset loaded": (r) => r.status === 200 || r.status === 304 
    });

    return res;
}