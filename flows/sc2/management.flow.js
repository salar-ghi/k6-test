import http from "k6/http";
import { check } from "k6";
import { ENV } from "../../config/env.js";

// Import custom metrics
import { 
    managementFormConfigTrend,
    managementGridTrend,
    managementJsAssetTrend,
    managementTotalTrend 
} from "../../metrics/management.metrics.js";

export function loadManagement(token) {
    const startTime = new Date().getTime();

    const paramsWithAuth = {
        headers: { Authorization: `Bearer ${token}` },
        tags: { workflow: "LoadManagement" }
    };

    const paramsNoAuth = {
        tags: { workflow: "LoadManagement", type: "asset" }
    };

    let res;

    // 1. Form Config
    const formStart = new Date().getTime();
    res = http.get(
        `${ENV.baseUrl}formsettings/form-config/34937EF6-93CB-4BE3-9128-7C118035E539`,
        paramsWithAuth
    );
    managementFormConfigTrend.add(new Date().getTime() - formStart);

    check(res, { "management form config": (r) => r.status === 200 });

    // 2. Management Grid
    const gridStart = new Date().getTime();
    res = http.get(
        `${ENV.baseUrl}C_34937EF6_93CB_4BE3_9128_7C118035E539/GetGrid_1_sys_Menu_PUB_TB_REQUEST_CREL?pageIndex=0&pageSize=10&sortColumnName=Col_2_sys_Menu_PUB_TB_REQUEST_CREL_REQUEST_TIME&order=desc&OrmId=34937EF6_93CB_4BE3_9128_7C118035E539`,
        paramsWithAuth
    );
    managementGridTrend.add(new Date().getTime() - gridStart);

    check(res, { 
        "management grid": (r) => r.status === 200,
        "management grid not 401/403": (r) => r.status !== 401 && r.status !== 403,
    });

    // // 3. JS Asset
    // const assetStart = new Date().getTime();
    // res = http.get(
    //     `http://localhost:8080/assets/TF_34937EF6_93CB_4BE3_9128_7C118035E539-8fa8feea.js`,
    //     paramsNoAuth
    // );
    // managementJsAssetTrend.add(new Date().getTime() - assetStart);

    // check(res, { 
    //     "management js asset loaded": (r) => r.status === 200 || r.status === 304 
    // });

    // Total duration
    managementTotalTrend.add(new Date().getTime() - startTime);

    console.log("Management Flow completed");

    return res;
}