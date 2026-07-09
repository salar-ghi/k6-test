import http from "k6/http";
import { check } from "k6";
import { ENV } from "../../config/env.js";

import { 
    saveManagementTotalTrend,
    execActionTrend,
    savePostTrend,
    formVisitedTrend 
} from "../../metrics/saveManagement.metrics.js";

export function saveManagement(token) {
    const startTime = new Date().getTime();

    const params = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        tags: { workflow: "SaveManagement" }
    };

    let res;

    const ormId = "29D2FBC4-B397-42FA-8242-E99DBA1D60E3";
    const idRecord = "55269";   // You can randomize this if needed

    // 1. Form Visited
    res = http.get(
        `${ENV.baseUrl}formsettings/form-visited?formId=${ormId}`,
        params
    );
    formVisitedTrend.add(100); // placeholder
    check(res, { "form visited": (r) => r.status === 200 || r.status === 204 });

    // 2. ExecAction (Open/Edit Form)
    const execPayload = {
        actionName: "Add",
        formId: ormId,
        previousForm: "34937EF6-93CB-4BE3-9128-7C118035E539"
    };

    res = http.post(
        `${ENV.baseUrl}C_${ormId.replace(/-/g, '_')}/ExecAction`,
        JSON.stringify(execPayload),
        params
    );
    execActionTrend.add(100);
    check(res, { "exec action": (r) => r.status === 200 || r.status === 204 });

    // 3. SAVE - POST to /Post
    const savePayload = {
        formType: "MainAdd",
        ormId: ormId,
        idRecord: idRecord,
        idParentRecord: idRecord,
        commandType: "normal",
        xpath: "",
        formValues: {
            Prop_3_REQUEST_TYPE_CID: { value: 452, label: "بازدید" },
            Prop_4_ORGAN_RID: { value: 534454, label: "حوزه ثبت ملک منطقه دو ايلام" },
            Prop_6_REQUEST_TIME: "2026-07-08T00:00:00",
            // Add more fields as needed
        },
        editables: {
            Prop_3_REQUEST_TYPE_CID: true,
            Prop_4_ORGAN_RID: true,
            Prop_6_REQUEST_TIME: true
        },
        visibilities: {
            Prop_3_REQUEST_TYPE_CID: true,
            Prop_4_ORGAN_RID: true,
            Prop_6_REQUEST_TIME: true
        }
    };

    const saveStart = new Date().getTime();
    res = http.post(
        `${ENV.baseUrl}C_${ormId.replace(/-/g, '_')}/Post`,
        JSON.stringify(savePayload),
        params
    );
    savePostTrend.add(new Date().getTime() - saveStart);

    check(res, { 
        "save form successful": (r) => r.status === 200,
        "no exception": (r) => {
            try {
                const body = r.json();
                return !body.exceptionMessage;
            } catch (e) {
                return r.status === 200;
            }
        }
    });

    saveManagementTotalTrend.add(new Date().getTime() - startTime);
    console.log(`Save Management completed - Status: ${res.status}`);

    return res;
}