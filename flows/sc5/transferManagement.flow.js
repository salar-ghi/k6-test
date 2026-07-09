import http from "k6/http";
import { check } from "k6";
import { ENV } from "../../config/env.js";

export function transferManagement(token) {
    const params = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        tags: { workflow: "TransferManagement" }
    };

    let res;
    const ormId = "29D2FBC4-B397-42FA-8242-E99DBA1D60E3";

    // 1. ExecAction
    const execPayload = {
        actionName: "Add",
        formId: ormId,
        formType: "MainAdd",
        previousForm: "34937EF6-93CB-4BE3-9128-7C118035E539",
        idRecord: "55527",
        idParentRecord: "55527",
        ormId: ormId,
        xpath: "",
        xpathaction: "",
        refreshRules: [
            { refreshkey: "RefreshCol_15_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_SECTION_RID", xpath: "" }
        ],
        parentVisible: {
            ParentVisibilities_MainForm: true,
            ParentVisibilities_Contentpanel_18: true,
            ParentVisibilities_Nestedform_52: true
        },
        formValues: {
            Prop_3_REQUEST_TYPE_CID: { label: "اطلاع رسانی", value: 458 },
            Prop_4_ORGAN_RID: { label: "حوزه ثبت ملک منطقه دو ايلام", value: 534454 },
            Prop_6_REQUEST_TIME: "2026-07-09T00:00:00"
        },
        visibilities: {
            Prop_3_REQUEST_TYPE_CID: true,
            Prop_4_ORGAN_RID: true,
            Prop_6_REQUEST_TIME: true
        },
        editables: {
            Prop_3_REQUEST_TYPE_CID: true,
            Prop_4_ORGAN_RID: true,
            Prop_6_REQUEST_TIME: true
        },
        requireds: {
            Prop_3_REQUEST_TYPE_CID: false,
            Prop_4_ORGAN_RID: false,
            Prop_6_REQUEST_TIME: true
        },
        rules: []
    };

    res = http.post(
        `${ENV.baseUrl}C_29D2FBC4_B397_42FA_8242_E99DBA1D60E3/ExecAction`,
        JSON.stringify(execPayload),
        params
    );

    check(res, {
        "exec action successful": (r) => r.status === 200,
        "no exception": (r) => {
            try { return !r.json().exceptionMessage; } catch(e) { return true; }
        }
    });

    // 2. Post (Save)
    const savePayload = {
        formType: "MainAdd",
        ormId: ormId,
        idRecord: "55528",
        idParentRecord: "55528",
        commandType: "normal",
        xpath: "",
        lockXpath: "",
        formValues: {
            Prop_3_REQUEST_TYPE_CID: { label: "محدودیت رهنی", value: 444 },
            Prop_4_ORGAN_RID: { label: "حوزه ثبت ملک منطقه دو ايلام", value: 534454 },
            Prop_6_REQUEST_TIME: "2026-07-09T00:00:00"
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
        },
        parentVisible: {
            ParentVisibilities_MainForm: true,
            ParentVisibilities_Contentpanel_18: true,
            ParentVisibilities_Nestedform_52: true
        }
    };

    res = http.post(
        `${ENV.baseUrl}C_29D2FBC4_B397_42FA_8242_E99DBA1D60E3/Post`,
        JSON.stringify(savePayload),
        params
    );

    check(res, {
        "save successful": (r) => r.status === 200,
        "no exception in save": (r) => {
            try { return !r.json().exceptionMessage; } catch(e) { return true; }
        }
    });

    // 3. Form Visited
    const formVisitedPayload = {
        idUser: 1610,
        formVisited: JSON.stringify([{
            url: "/TF_34937EF6_93CB_4BE3_9128_7C118035E539",
            formName: "ثبت درخواست ساماندهی ",
            formUrl: "/TF_34937EF6_93CB_4BE3_9128_7C118035E539",
            isSysMenu: false,
            parentForm: "",
            nested: [],
            status: "close",
            date: "2026-07-09T13:53:54",
            Id: 7.001310440246016
        }])
    };

    res = http.post(
        `${ENV.baseUrl}formsettings/form-visited`,
        JSON.stringify(formVisitedPayload),
        params
    );

    check(res, { "form visited successful": (r) => r.status === 200 });

    console.log("✅ Transfer Management Flow completed");
    return res;
}