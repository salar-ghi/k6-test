import http from "k6/http";
import { check } from "k6";
import { ENV } from "../../config/env.js";

// Import custom metrics
import { 
    addGroupSessionTotalTrend,
    execActionTrend,
    getFormTrend,
    formVisitedTrend,
    jsAssetTrend 
} from "../../metrics/addGroupSession.metrics.js";

export function addGroupSession(token) {
    const startTime = new Date().getTime();

    const params = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        tags: { workflow: "AddGroupSession" }
    };

    let res;

    // 1. ExecAction
    const actionStart = new Date().getTime();
    res = http.post(`${ENV.baseUrl}C_11602655_1AAC_45A6_B4E6_E572F6530F22/ExecAction`, JSON.stringify({}), params);
    execActionTrend.add(new Date().getTime() - actionStart);
    check(res, { "exec action": (r) => r.status === 200 || r.status === 204 });

    // 2. GetCombo calls
    const comboUrls = [
        `${ENV.baseUrl}C_11602655_1AAC_45A6_B4E6_E572F6530F22/GetCombo?xpath=Prop_82_SESSION_TYPE_CID&idParentRecord=4257&OrmId=11602655_1AAC_45A6_B4E6_E572F6530F22&RuleEntitName=&UserFilter=`,
        `${ENV.baseUrl}C_11602655_1AAC_45A6_B4E6_E572F6530F22/GetCombo?xpath=Prop_8_DISPUTE_COUNCIL_RID&idParentRecord=4257&OrmId=11602655_1AAC_45A6_B4E6_E572F6530F22&RuleEntitName=&UserFilter=`
    ];

    comboUrls.forEach((url, index) => {
        res = http.get(url, params);
        check(res, { [`combo ${index+1}`]: (r) => r.status === 200 });
    });

    // 3. Get MainAdd Form (called twice)
    const formStart = new Date().getTime();
    res = http.get(
        `${ENV.baseUrl}C_11602655_1AAC_45A6_B4E6_E572F6530F22/Get?xpath=&ormId=11602655_1AAC_45A6_B4E6_E572F6530F22&formType=MainAdd&previousForm=36932219_A3F5_407F_A117_449D10790D83`,
        params
    );
    getFormTrend.add(new Date().getTime() - formStart);
    check(res, { "get main add form": (r) => r.status === 200 });

    // 4. Form Visited
    res = http.post(
        `${ENV.baseUrl}formsettings/form-visited`,
        JSON.stringify({ formId: "11602655-1AAC-45A6-B4E6-E572F6530F22" }),
        params
    );
    formVisitedTrend.add(new Date().getTime() - formStart); // reuse timing for simplicity
    check(res, { "form visited": (r) => r.status === 200 || r.status === 204 });

    // 5. JS Asset
    const assetStart = new Date().getTime();
    res = http.get(
        "http://192.168.10.178:1379/assets/TF_11602655_1AAC_45A6_B4E6_E572F6530F22-71a9b43d.js",
        { tags: { workflow: "AddGroupSession", type: "asset" } }
    );
    jsAssetTrend.add(new Date().getTime() - assetStart);
    check(res, { "js asset loaded": (r) => r.status === 200 || r.status === 304 });

    // Total duration
    addGroupSessionTotalTrend.add(new Date().getTime() - startTime);

    console.log("Add Group Session Flow completed");

    return res;
}