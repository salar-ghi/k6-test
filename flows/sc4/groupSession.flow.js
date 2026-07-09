import http from "k6/http";
import { check } from "k6";
import { ENV } from "../../config/env.js";

// Import custom metrics
import { 
    groupSessionGridTrend,
    groupSessionTotalTrend 
} from "../../metrics/groupSession.metrics.js";

export function loadGroupSession(token) {
    const startTime = new Date().getTime();

    const params = {
        headers: { 
            Authorization: `Bearer ${token}` 
        },
        tags: { workflow: "LoadGroupSession" }
    };

    let res;

    // Main Grid Call
    const gridStart = new Date().getTime();
    res = http.get(
        `${ENV.baseUrl}C_36932219_A3F5_407F_A117_449D10790D83/GetGrid_1_sys_Menu_MOM1_TB_SESSION_CREL?pageIndex=0&pageSize=10&sortColumnName=Col_10_sys_Menu_MOM1_TB_SESSION_CREL_SESSION_DATE&order=desc&OrmId=36932219_A3F5_407F_A117_449D10790D83`,
        params
    );
    groupSessionGridTrend.add(new Date().getTime() - gridStart);

    check(res, { 
        "group session grid": (r) => r.status === 200,
        "group session grid not 401/403": (r) => r.status !== 401 && r.status !== 403,
    });

    // Total duration
    groupSessionTotalTrend.add(new Date().getTime() - startTime);

    console.log(`Group Session Grid Status: ${res.status}`);

    return res;
}