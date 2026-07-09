import http from "k6/http";
import { check } from "k6";
import { ENV } from "../../config/env.js";

// Helper to print server error messages
function debugResponse(res, label) {
    if (res.status !== 200 && res.status !== 204) {
        console.error(`❌ ${label} FAILED [${res.status}]: ${res.body.substring(0, 500)}`);
    }
}

export function addManagement(token) {
    const startTime = new Date().getTime();

    const params = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        tags: { workflow: "AddManagement" }
    };

    let res;
    const ormId = "29D2FBC4-B397-42FA-8242-E99DBA1D60E3";

    // Full ExecAction payload (from your browser capture)
    const execPayload = {
        "refreshRules": [
            { "refreshkey": "RefreshProp_24_PARENT_RID", "xpath": "" },
            { "refreshkey": "RefreshProp_22_PARENT_RID", "xpath": "" },
            { "refreshkey": "RefreshProp_25_PARENT_RID", "xpath": "" }
        ],
        "parentVisible": {
            "ParentVisibilities_MainForm": true,
            "ParentVisibilities_Contentpanel_18": true,
            "ParentVisibilities_Nestedform_52": true
        },
        "formValues": {
            "Prop_3_REQUEST_TYPE_CID": null,
            "Prop_4_ORGAN_RID": null,
            "Prop_6_REQUEST_TIME": null,
            "Grid_9_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL": [],
            "Prop_21_GEOGRAPHICAL_PLACE_RID": null,
            "Prop_22_PARENT_RID": null,
            "Prop_24_PARENT_RID": null,
            "Prop_25_PARENT_RID": null,
            "Prop_28_REORGANIZATION_TYPE_CID": null,
            "Prop_29_PLAN_NO": null,
            "Prop_31_PLAN_DATE": null,
            "Prop_34_MAPPING_METHOD_CID": null,
            "Prop_36_MAP_DATE": null,
            "Grid_39_SEPERAT_MAP_REL_PARCEL_CREL": [],
            "Grid_45_SEPERAT_MAP_REL_OCCUPIER_CREL": [],
            "RecordCount": 0
        },
        "visibilities": {
            "Prop_3_REQUEST_TYPE_CID": true,
            "Prop_4_ORGAN_RID": true,
            "Prop_6_REQUEST_TIME": true,
            "Grid_9_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL": true,
            "Col_10_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_CREATE_DATE": true,
            "Col_11_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_SECONDRY_PLATE": true,
            "Col_12_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_ORIGINAL_PLATE": true,
            "Col_13_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_AREA_RANGE": true,
            "Col_14_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_PARCEL_COUNT": true,
            "Col_15_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_SECTION_RID": true,
            "Col_16_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_PARENT_RID": true,
            "Col_17_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_IS_ACTIVE": true,
            "Contentpanel_18": true,
            "Prop_21_GEOGRAPHICAL_PLACE_RID": true,
            "Prop_22_PARENT_RID": true,
            "Prop_24_PARENT_RID": true,
            "Prop_25_PARENT_RID": true,
            "Prop_28_REORGANIZATION_TYPE_CID": true,
            "Prop_29_PLAN_NO": true,
            "Prop_31_PLAN_DATE": true,
            "Prop_34_MAPPING_METHOD_CID": true,
            "Prop_36_MAP_DATE": true,
            "Grid_39_SEPERAT_MAP_REL_PARCEL_CREL": true,
            "Col_40_SEPERAT_MAP_REL_PARCEL_CREL_PARCEL_NUMBER": true,
            "Col_41_SEPERAT_MAP_REL_PARCEL_CREL_SECONDRY_PLATE": true,
            "Col_42_SEPERAT_MAP_REL_PARCEL_CREL_ORIGINAL_PLATE": true,
            "Col_43_SEPERAT_MAP_REL_PARCEL_CREL_AREA": true,
            "Col_44_SEPERAT_MAP_REL_PARCEL_CREL_PARCEL_UNIQUE_CODE": true,
            "Grid_45_SEPERAT_MAP_REL_OCCUPIER_CREL": false,
            "Col_46_SEPERAT_MAP_REL_OCCUPIER_CREL_PARCEL_UNIQUE_CODE": true,
            "Col_47_SEPERAT_MAP_REL_OCCUPIER_CREL_SECONDRY_PLATE": true,
            "Col_48_SEPERAT_MAP_REL_OCCUPIER_CREL_ORIGINAL_PLATE": true,
            "Col_49_SEPERAT_MAP_REL_OCCUPIER_CREL_AREA": true,
            "Col_50_SEPERAT_MAP_REL_OCCUPIER_CREL_CATALOG_VALUE_TITLE": true,
            "Col_51_SEPERAT_MAP_REL_OCCUPIER_CREL_PARCEL_NUMBER": true,
            "Nestedform_52": true,
            "Button_Cartable_86dfc680_aabf_410a_af49_35278c1bc9dc": true
        },
        "rules": [],
        "xpath": "",
        "editables": {
            "Prop_3_REQUEST_TYPE_CID": true,
            "Prop_4_ORGAN_RID": true,
            "Prop_6_REQUEST_TIME": true,
            "Grid_9_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL": true,
            "Col_10_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_CREATE_DATE": true,
            "Col_11_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_SECONDRY_PLATE": true,
            "Col_12_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_ORIGINAL_PLATE": true,
            "Col_13_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_AREA_RANGE": true,
            "Col_14_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_PARCEL_COUNT": true,
            "Col_15_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_SECTION_RID": true,
            "Col_16_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_PARENT_RID": true,
            "Col_17_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_IS_ACTIVE": true,
            "Contentpanel_18": true,
            "Prop_21_GEOGRAPHICAL_PLACE_RID": true,
            "Prop_22_PARENT_RID": false,
            "Prop_24_PARENT_RID": false,
            "Prop_25_PARENT_RID": false,
            "Prop_28_REORGANIZATION_TYPE_CID": true,
            "Prop_29_PLAN_NO": true,
            "Prop_31_PLAN_DATE": true,
            "Prop_34_MAPPING_METHOD_CID": true,
            "Prop_36_MAP_DATE": true,
            "Grid_39_SEPERAT_MAP_REL_PARCEL_CREL": true,
            "Col_40_SEPERAT_MAP_REL_PARCEL_CREL_PARCEL_NUMBER": false,
            "Col_41_SEPERAT_MAP_REL_PARCEL_CREL_SECONDRY_PLATE": false,
            "Col_42_SEPERAT_MAP_REL_PARCEL_CREL_ORIGINAL_PLATE": false,
            "Col_43_SEPERAT_MAP_REL_PARCEL_CREL_AREA": false,
            "Col_44_SEPERAT_MAP_REL_PARCEL_CREL_PARCEL_UNIQUE_CODE": false,
            "Grid_45_SEPERAT_MAP_REL_OCCUPIER_CREL": false,
            "Col_46_SEPERAT_MAP_REL_OCCUPIER_CREL_PARCEL_UNIQUE_CODE": false,
            "Col_47_SEPERAT_MAP_REL_OCCUPIER_CREL_SECONDRY_PLATE": false,
            "Col_48_SEPERAT_MAP_REL_OCCUPIER_CREL_ORIGINAL_PLATE": false,
            "Col_49_SEPERAT_MAP_REL_OCCUPIER_CREL_AREA": false,
            "Col_50_SEPERAT_MAP_REL_OCCUPIER_CREL_CATALOG_VALUE_TITLE": false,
            "Col_51_SEPERAT_MAP_REL_OCCUPIER_CREL_PARCEL_NUMBER": false,
            "Nestedform_52": true,
            "Button_Cartable_86dfc680_aabf_410a_af49_35278c1bc9dc": true
        },
        "formType": "MainAdd",
        "ormId": ormId
    };

    let idParentRecord = "55288"; // will be overwritten by the first successful ExecAction

    // --- ExecAction (with debug) ---
    for (let i = 1; i <= 3; i++) {
        res = http.post(
            `${ENV.baseUrl}C_29D2FBC4_B397_42FA_8242_E99DBA1D60E3/ExecAction`,
            JSON.stringify(execPayload),
            params
        );
        debugResponse(res, `exec action ${i}`);

        if (res.status === 200) {
            try {
                const body = res.json();
                if (body.idRecord) {
                    idParentRecord = body.idRecord;
                }
            } catch (e) {
                console.warn(`⚠️ Could not parse exec action response: ${e.message}`);
            }
        }
        check(res, { [`exec action ${i}`]: (r) => r.status === 200 || r.status === 204 });
    }

    // --- Combo calls ---
    const comboUrls = [
        `${ENV.baseUrl}C_29D2FBC4_B397_42FA_8242_E99DBA1D60E3/GetCombo?xpath=Prop_34_MAPPING_METHOD_CID&idParentRecord=${idParentRecord}&OrmId=29D2FBC4_B397_42FA_8242_E99DBA1D60E3&RuleEntitName=&UserFilter=`,
        `${ENV.baseUrl}C_29D2FBC4_B397_42FA_8242_E99DBA1D60E3/GetCombo?xpath=Prop_28_REORGANIZATION_TYPE_CID&idParentRecord=${idParentRecord}&OrmId=29D2FBC4_B397_42FA_8242_E99DBA1D60E3&RuleEntitName=&UserFilter=`,
        `${ENV.baseUrl}C_29D2FBC4_B397_42FA_8242_E99DBA1D60E3/GetCombo?xpath=Prop_4_ORGAN_RID&idParentRecord=${idParentRecord}&OrmId=29D2FBC4_B397_42FA_8242_E99DBA1D60E3&RuleEntitName=&UserFilter=`,
        `${ENV.baseUrl}C_29D2FBC4_B397_42FA_8242_E99DBA1D60E3/GetCombo?xpath=Prop_21_GEOGRAPHICAL_PLACE_RID&idParentRecord=${idParentRecord}&OrmId=29D2FBC4_B397_42FA_8242_E99DBA1D60E3&RuleEntitName=&UserFilter=`,
        `${ENV.baseUrl}C_29D2FBC4_B397_42FA_8242_E99DBA1D60E3/GetCombo?xpath=Prop_3_REQUEST_TYPE_CID&idParentRecord=${idParentRecord}&OrmId=29D2FBC4_B397_42FA_8242_E99DBA1D60E3&RuleEntitName=&UserFilter=`
    ];

    comboUrls.forEach((url, index) => {
        res = http.get(url, params);
        debugResponse(res, `combo ${index+1}`);
        check(res, { [`combo ${index+1}`]: (r) => r.status === 200 });
    });

    // Get MainAdd Form
    res = http.get(
        `${ENV.baseUrl}C_29D2FBC4_B397_42FA_8242_E99DBA1D60E3/Get?xpath=&ormId=29D2FBC4_B397_42FA_8242_E99DBA1D60E3&formType=MainAdd&previousForm=34937EF6_93CB_4BE3_9128_7C118035E539`,
        params
    );
    debugResponse(res, 'get main add form');
    check(res, { "get main add form": (r) => r.status === 200 });

    // Form Visited
    res = http.get(
        `${ENV.baseUrl}formsettings/form-visited?formId=${ormId}`,
        params
    );
    debugResponse(res, 'form visited');
    check(res, { "form visited": (r) => r.status === 200 || r.status === 204 });

    // JS Asset
    res = http.get(
        "http://192.168.10.178:1379/assets/TF_29D2FBC4_B397_42FA_8242_E99DBA1D60E3-94aecfdc.js",
        { tags: { workflow: "AddManagement", type: "asset" } }
    );
    debugResponse(res, 'js asset');
    check(res, { "js asset loaded": (r) => r.status === 200 || r.status === 304 });

    console.log("✅ Add Management Flow completed");
    return res;
}