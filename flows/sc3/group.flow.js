import http from "k6/http";
import { check } from "k6";
import { ENV } from "../../config/env.js";

// Import custom metrics
import { 
    groupFormConfigTrend,
    groupGridTrend,
    groupTotalTrend 
} from "../../metrics/group.metrics.js";

export function loadGroup(token) {
    const startTime = new Date().getTime();

    const paramsWithAuth = {
        headers: { Authorization: `Bearer ${token}` },
        tags: { workflow: "LoadGroup" }
    };

    let res;

    // 1. Form Config
    const formStart = new Date().getTime();
    res = http.get(
        `${ENV.baseUrl}formsettings/form-config/87136A27-512D-4F2D-8ABC-F9BE67BDE44E`,
        paramsWithAuth
    );
    groupFormConfigTrend.add(new Date().getTime() - formStart);

    check(res, { 
        "group form config": (r) => r.status === 200 
    });

    // 2. Group Grid
    const gridStart = new Date().getTime();
    res = http.get(
        `${ENV.baseUrl}C_87136A27_512D_4F2D_8ABC_F9BE67BDE44E/GetGrid_1_sys_Menu_SJ_MOM1_DISPUT_COUNCL?pageIndex=0&pageSize=10&sortColumnName=CREATION_DATE&order=desc&OrmId=87136A27_512D_4F2D_8ABC_F9BE67BDE44E`,
        paramsWithAuth
    );
    groupGridTrend.add(new Date().getTime() - gridStart);

    check(res, { 
        "group grid": (r) => r.status === 200,
        "group grid not 401/403": (r) => r.status !== 401 && r.status !== 403,
    });

    // Total duration for the whole flow
    groupTotalTrend.add(new Date().getTime() - startTime);

    console.log("Group Flow completed");

    return res;
}