import http from "k6/http";
import { check } from "k6";
import { ENV } from "../../config/env.js";

// Import custom metrics
import { 
    addGroupTotalTrend,
    execActionTrend,
    getFormTrend,
    formVisitedTrend 
} from "../../metrics/addGroup.metrics.js";

export function addGroup(token) {
    const startTime = new Date().getTime();

    const params = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        tags: { workflow: "AddGroup" }
    };

    let res;

    // 1. ExecAction
    const actionStart = new Date().getTime();
    res = http.post(
        `${ENV.baseUrl}C_9CC7C395_B46E_4568_BACD_BE819774D474/ExecAction`,
        JSON.stringify({}), // Adjust payload if needed
        params
    );
    execActionTrend.add(new Date().getTime() - actionStart);
    check(res, { "exec action": (r) => r.status === 200 || r.status === 204 });

    // 2. Multiple GetCombo calls (Dropdowns)
    const comboUrls = [
        `${ENV.baseUrl}C_9CC7C395_B46E_4568_BACD_BE819774D474/GetCombo?xpath=Prop_14_CITY_RID&idParentRecord=5202&OrmId=9CC7C395_B46E_4568_BACD_BE819774D474&RuleEntitName=&pageSize=10&pageIndex=0&UserFilter=`,
        `${ENV.baseUrl}C_9CC7C395_B46E_4568_BACD_BE819774D474/GetCombo?xpath=Prop_7_COUNCIL_TYPE_CID&idParentRecord=5202&OrmId=9CC7C395_B46E_4568_BACD_BE819774D474&RuleEntitName=&UserFilter=`,
        `${ENV.baseUrl}C_9CC7C395_B46E_4568_BACD_BE819774D474/GetCombo?xpath=Prop_11_PROVINCE_RID&idParentRecord=5202&OrmId=9CC7C395_B46E_4568_BACD_BE819774D474&RuleEntitName=&pageSize=10&pageIndex=0&UserFilter=`,
        `${ENV.baseUrl}C_9CC7C395_B46E_4568_BACD_BE819774D474/GetCombo?xpath=Prop_5_COUNCIL_LEVEL_CID&idParentRecord=5202&OrmId=9CC7C395_B46E_4568_BACD_BE819774D474&RuleEntitName=&UserFilter=`,
        `${ENV.baseUrl}C_9CC7C395_B46E_4568_BACD_BE819774D474/GetCombo?xpath=Prop_12_ORG_UNIT_RID&idParentRecord=5202&OrmId=9CC7C395_B46E_4568_BACD_BE819774D474&RuleEntitName=&pageSize=10&pageIndex=0&UserFilter=`
    ];

    comboUrls.forEach((url, index) => {
        res = http.get(url, params);
        check(res, { [`combo ${index+1}`]: (r) => r.status === 200 });
    });

    // 3. Get Form (MainAdd)
    const formStart = new Date().getTime();
    res = http.get(
        `${ENV.baseUrl}C_9CC7C395_B46E_4568_BACD_BE819774D474/Get?xpath=&ormId=9CC7C395_B46E_4568_BACD_BE819774D474&formType=MainAdd&previousForm=87136A27_512D_4F2D_8ABC_F9BE67BDE44E`,
        params
    );
    getFormTrend.add(new Date().getTime() - formStart);
    check(res, { "get main add form": (r) => r.status === 200 });

    // 4. Form Visited
    const visitedStart = new Date().getTime();
    res = http.post(
        `${ENV.baseUrl}formsettings/form-visited`,
        JSON.stringify({ formId: "9CC7C395-B46E-4568-BACD-BE819774D474" }),
        params
    );
    formVisitedTrend.add(new Date().getTime() - visitedStart);
    check(res, { "form visited": (r) => r.status === 200 || r.status === 204 });

    // Total duration
    addGroupTotalTrend.add(new Date().getTime() - startTime);

    console.log("Add Group Flow completed");

    return res;
}