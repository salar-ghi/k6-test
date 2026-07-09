import http from "k6/http";
import { check } from "k6";
import { ENV } from "../../config/env.js";

export function loadManagementSelect(token) {   // Better function name
    const paramsWithAuth = {
        headers: { 
            Authorization: `Bearer ${token}` 
        },
        tags: { workflow: "LoadManagementSelect" }
    };

    let res;

    // 1. Form Config
    res = http.get(
        `${ENV.baseUrl}formsettings/form-config/931DB9CA-AD20-435E-87C5-DEA1F78D296E`, 
        paramsWithAuth
    );
    check(res, { 
        "form config": (r) => r.status === 200 
    });

    // 2. Grid
    res = http.get(
        `${ENV.baseUrl}C_931DB9CA_AD20_435E_87C5_DEA1F78D296E/GetGrid_1_sys_Menu_PUB_TB_REQUEST_CREL?pageIndex=0&pageSize=10&sortColumnName=CREATED_AT&order=desc&OrmId=931DB9CA_AD20_435E_87C5_DEA1F78D296E`, 
        paramsWithAuth
    );
    check(res, { 
        "management select grid": (r) => r.status === 200,
        "management select grid not 401/403": (r) => r.status !== 401 && r.status !== 403,
    });

    // 3. JS Asset - FIXED
    res = http.get(
        "http://192.168.10.178:1379/assets/TF_931DB9CA_AD20_435E_87C5_DEA1F78D296E-8c195cc2.js",
        { tags: { workflow: "LoadManagementSelect", type: "asset" } }
    );
    check(res, { 
        "js asset loaded": (r) => r.status === 200 || r.status === 304 
    });

    console.log(`Management Select Flow completed - Grid Status: ${res.status}`);

    return res;
}