// flows/sc5/transferManagement.flow.js
import http from 'k6/http';
import { check } from 'k6';
import { ENV } from '../../config/env.js';
import { login } from '../auth.flow.js';
import { loadMenu } from '../loadMenu.flow.js';

/**
 * Performs the complete Transfer Management flow:
 * 1. Login
 * 2. Load Menu
 * 3. ExecAction (POST)
 * 4. Post (POST)
 * 5. FormVisited (PUT)
 */
export function transferManagement(user) {
  // ----- Step 1: Login -----
  const token = login(user);
  if (!token) {
    throw new Error('Login failed, token not obtained');
  }
  console.log('✅ Login successful, token length:', token.length);

  // ----- Step 2: Load Menu -----
  const menuRes = loadMenu(token);
  if (menuRes.status !== 200) {
    console.warn('⚠️ LoadMenu returned status:', menuRes.status);
  } else {
    console.log('✅ LoadMenu successful');
  }

  // ----- Step 3: ExecAction -----
  const execActionPayload = buildExecActionPayload();
  console.log('🔹 ExecAction payload:', JSON.stringify(execActionPayload, null, 2));

  const execActionRes = http.post(
    `${ENV.baseUrl}C_29D2FBC4_B397_42FA_8242_E99DBA1D60E3/ExecAction`,
    JSON.stringify(execActionPayload),
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      tags: { workflow: 'ExecAction' },
    }
  );

  if (execActionRes.status !== 200) {
    console.error('❌ ExecAction failed (status:', execActionRes.status, ')');
    console.error('   Response body:', execActionRes.body);
  } else {
    console.log('✅ ExecAction successful');
  }

  check(execActionRes, {
    'execAction successful': (r) => r.status === 200,
  });

  // ----- Step 4: Post -----
  const postPayload = buildPostPayload();
  console.log('🔹 Post payload:', JSON.stringify(postPayload, null, 2));

  const postRes = http.post(
    `${ENV.baseUrl}C_29D2FBC4_B397_42FA_8242_E99DBA1D60E3/Post`,
    JSON.stringify(postPayload),
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      tags: { workflow: 'Post' },
    }
  );

  if (postRes.status !== 200) {
    console.error('❌ Post failed (status:', postRes.status, ')');
    console.error('   Response body:', postRes.body);
  } else {
    console.log('✅ Post successful');
  }

  check(postRes, {
    'post successful': (r) => r.status === 200,
  });

  // ----- Step 5: FormVisited (PUT) -----
  const formVisitedPayload = buildFormVisitedPayload();
  console.log('🔹 FormVisited payload:', JSON.stringify(formVisitedPayload));

  const formVisitedRes = http.put(
    `${ENV.baseUrl}formsettings/form-visited`,
    JSON.stringify(formVisitedPayload),
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      tags: { workflow: 'FormVisited' },
    }
  );

  if (formVisitedRes.status !== 200) {
    console.error('❌ FormVisited failed (status:', formVisitedRes.status, ')');
    console.error('   Response body:', formVisitedRes.body);
  } else {
    console.log('✅ FormVisited successful');
  }

  check(formVisitedRes, {
    'formVisited successful': (r) => r.status === 200,
  });

  // ----- Return summary -----
  return {
    token,
    menuStatus: menuRes.status,
    execActionStatus: execActionRes.status,
    postStatus: postRes.status,
    formVisitedStatus: formVisitedRes.status,
  };
}

// ---------- Payload Builders (unchanged) ----------
function buildExecActionPayload() {
  return {
    exceptionMessage: null,
    ormId: '29D2FBC4_B397_42FA_8242_E99DBA1D60E3',
    idTask: null,
    caseId: null,
    idRecord: '55527',
    idParentRecord: '55527',
    xpath: '',
    formType: 'MainAdd',
    closeType: null,
    redirectUrl: null,
    commandType: null,
    url: null,
    file: null,
    rules: [],
    refreshRules: [
      {
        RefreshKey: 'RefreshCol_15_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_SECTION_RID',
        xpath: '',
      },
    ],
    editables: {
      Prop_3_REQUEST_TYPE_CID: true,
      Prop_4_ORGAN_RID: true,
      Prop_6_REQUEST_TIME: true,
      Grid_9_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL: true,
      Col_10_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_CREATE_DATE: true,
      Col_11_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_SECONDRY_PLATE: true,
      Col_12_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_ORIGINAL_PLATE: true,
      Col_13_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_AREA_RANGE: true,
      Col_14_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_PARCEL_COUNT: true,
      Col_15_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_SECTION_RID: true,
      Col_16_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_PARENT_RID: true,
      Col_17_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_IS_ACTIVE: true,
      Contentpanel_18: true,
      Prop_21_GEOGRAPHICAL_PLACE_RID: true,
      Prop_22_PARENT_RID: false,
      Prop_24_PARENT_RID: false,
      Prop_25_PARENT_RID: false,
      Prop_28_REORGANIZATION_TYPE_CID: true,
      Prop_29_PLAN_NO: true,
      Prop_31_PLAN_DATE: true,
      Prop_34_MAPPING_METHOD_CID: true,
      Prop_36_MAP_DATE: true,
      Grid_39_SEPERAT_MAP_REL_PARCEL_CREL: true,
      Col_40_SEPERAT_MAP_REL_PARCEL_CREL_PARCEL_NUMBER: false,
      Col_41_SEPERAT_MAP_REL_PARCEL_CREL_SECONDRY_PLATE: false,
      Col_42_SEPERAT_MAP_REL_PARCEL_CREL_ORIGINAL_PLATE: false,
      Col_43_SEPERAT_MAP_REL_PARCEL_CREL_AREA: false,
      Col_44_SEPERAT_MAP_REL_PARCEL_CREL_PARCEL_UNIQUE_CODE: false,
      Grid_45_SEPERAT_MAP_REL_OCCUPIER_CREL: false,
      Col_46_SEPERAT_MAP_REL_OCCUPIER_CREL_PARCEL_UNIQUE_CODE: false,
      Col_47_SEPERAT_MAP_REL_OCCUPIER_CREL_SECONDRY_PLATE: false,
      Col_48_SEPERAT_MAP_REL_OCCUPIER_CREL_ORIGINAL_PLATE: false,
      Col_49_SEPERAT_MAP_REL_OCCUPIER_CREL_AREA: false,
      Col_50_SEPERAT_MAP_REL_OCCUPIER_CREL_CATALOG_VALUE_TITLE: false,
      Col_51_SEPERAT_MAP_REL_OCCUPIER_CREL_PARCEL_NUMBER: false,
      Nestedform_52: true,
      Button_Cartable_86dfc680_aabf_410a_af49_35278c1bc9dc: true,
    },
    requireds: {
      Prop_3_REQUEST_TYPE_CID: false,
      Prop_4_ORGAN_RID: false,
      Prop_6_REQUEST_TIME: true,
    },
    visibilities: {
      Prop_3_REQUEST_TYPE_CID: true,
      Prop_4_ORGAN_RID: true,
      Prop_6_REQUEST_TIME: true,
      Grid_9_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL: true,
      Col_10_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_CREATE_DATE: true,
      Col_11_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_SECONDRY_PLATE: true,
      Col_12_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_ORIGINAL_PLATE: true,
      Col_13_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_AREA_RANGE: true,
      Col_14_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_PARCEL_COUNT: true,
      Col_15_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_SECTION_RID: true,
      Col_16_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_PARENT_RID: true,
      Col_17_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_IS_ACTIVE: true,
      Contentpanel_18: true,
      Prop_21_GEOGRAPHICAL_PLACE_RID: true,
      Prop_22_PARENT_RID: true,
      Prop_24_PARENT_RID: true,
      Prop_25_PARENT_RID: true,
      Prop_28_REORGANIZATION_TYPE_CID: true,
      Prop_29_PLAN_NO: true,
      Prop_31_PLAN_DATE: true,
      Prop_34_MAPPING_METHOD_CID: true,
      Prop_36_MAP_DATE: true,
      Grid_39_SEPERAT_MAP_REL_PARCEL_CREL: true,
      Col_40_SEPERAT_MAP_REL_PARCEL_CREL_PARCEL_NUMBER: true,
      Col_41_SEPERAT_MAP_REL_PARCEL_CREL_SECONDRY_PLATE: true,
      Col_42_SEPERAT_MAP_REL_PARCEL_CREL_ORIGINAL_PLATE: true,
      Col_43_SEPERAT_MAP_REL_PARCEL_CREL_AREA: true,
      Col_44_SEPERAT_MAP_REL_PARCEL_CREL_PARCEL_UNIQUE_CODE: true,
      Grid_45_SEPERAT_MAP_REL_OCCUPIER_CREL: false,
      Col_46_SEPERAT_MAP_REL_OCCUPIER_CREL_PARCEL_UNIQUE_CODE: true,
      Col_47_SEPERAT_MAP_REL_OCCUPIER_CREL_SECONDRY_PLATE: true,
      Col_48_SEPERAT_MAP_REL_OCCUPIER_CREL_ORIGINAL_PLATE: true,
      Col_49_SEPERAT_MAP_REL_OCCUPIER_CREL_AREA: true,
      Col_50_SEPERAT_MAP_REL_OCCUPIER_CREL_CATALOG_VALUE_TITLE: true,
      Col_51_SEPERAT_MAP_REL_OCCUPIER_CREL_PARCEL_NUMBER: true,
      Nestedform_52: true,
      Button_Cartable_86dfc680_aabf_410a_af49_35278c1bc9dc: true,
    },
    mapper: {},
    parentVisible: {
      ParentVisibilities_MainForm: true,
      ParentVisibilities_Contentpanel_18: true,
      ParentVisibilities_Nestedform_52: true,
    },
    formValues: {
      Prop_3_REQUEST_TYPE_CID: {
        label: 'اطلاع رسانی',
        value: 458,
        additionalAttrib: null,
        expanded: null,
        selected: null,
      },
      Prop_4_ORGAN_RID: {
        label: 'حوزه ثبت ملک منطقه دو ايلام',
        value: 534454,
        additionalAttrib: null,
        expanded: null,
        selected: null,
      },
      Prop_6_REQUEST_TIME: '2026-07-09T00:00:00',
      Grid_9_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL: [],
      Prop_21_GEOGRAPHICAL_PLACE_RID: null,
      Prop_22_PARENT_RID: null,
      Prop_24_PARENT_RID: null,
      Prop_25_PARENT_RID: null,
      Prop_28_REORGANIZATION_TYPE_CID: null,
      Prop_29_PLAN_NO: null,
      Prop_31_PLAN_DATE: null,
      Prop_34_MAPPING_METHOD_CID: null,
      Prop_36_MAP_DATE: null,
      Grid_39_SEPERAT_MAP_REL_PARCEL_CREL: [],
      Grid_45_SEPERAT_MAP_REL_OCCUPIER_CREL: [],
      RecordCount: 0,
    },
    messages: [],
  };
}

function buildPostPayload() {
  return {
    exceptionMessage: null,
    ormId: '29D2FBC4_B397_42FA_8242_E99DBA1D60E3',
    idTask: null,
    caseId: null,
    idRecord: '55528',
    idParentRecord: '55528',
    xpath: '',
    formType: 'MainAdd',
    closeType: null,
    redirectUrl: null,
    commandType: 'normal',
    url: null,
    file: null,
    rules: [],
    refreshRules: [],
    editables: {
      Prop_3_REQUEST_TYPE_CID: true,
      Prop_4_ORGAN_RID: true,
      Prop_6_REQUEST_TIME: true,
      Grid_9_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL: true,
      Col_10_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_CREATE_DATE: true,
      Col_11_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_SECONDRY_PLATE: true,
      Col_12_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_ORIGINAL_PLATE: true,
      Col_13_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_AREA_RANGE: true,
      Col_14_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_PARCEL_COUNT: true,
      Col_15_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_SECTION_RID: true,
      Col_16_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_PARENT_RID: true,
      Col_17_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_IS_ACTIVE: true,
      Contentpanel_18: true,
      Prop_21_GEOGRAPHICAL_PLACE_RID: true,
      Prop_22_PARENT_RID: false,
      Prop_24_PARENT_RID: false,
      Prop_25_PARENT_RID: false,
      Prop_28_REORGANIZATION_TYPE_CID: true,
      Prop_29_PLAN_NO: true,
      Prop_31_PLAN_DATE: true,
      Prop_34_MAPPING_METHOD_CID: true,
      Prop_36_MAP_DATE: true,
      Grid_39_SEPERAT_MAP_REL_PARCEL_CREL: true,
      Col_40_SEPERAT_MAP_REL_PARCEL_CREL_PARCEL_NUMBER: false,
      Col_41_SEPERAT_MAP_REL_PARCEL_CREL_SECONDRY_PLATE: false,
      Col_42_SEPERAT_MAP_REL_PARCEL_CREL_ORIGINAL_PLATE: false,
      Col_43_SEPERAT_MAP_REL_PARCEL_CREL_AREA: false,
      Col_44_SEPERAT_MAP_REL_PARCEL_CREL_PARCEL_UNIQUE_CODE: false,
      Grid_45_SEPERAT_MAP_REL_OCCUPIER_CREL: false,
      Col_46_SEPERAT_MAP_REL_OCCUPIER_CREL_PARCEL_UNIQUE_CODE: false,
      Col_47_SEPERAT_MAP_REL_OCCUPIER_CREL_SECONDRY_PLATE: false,
      Col_48_SEPERAT_MAP_REL_OCCUPIER_CREL_ORIGINAL_PLATE: false,
      Col_49_SEPERAT_MAP_REL_OCCUPIER_CREL_AREA: false,
      Col_50_SEPERAT_MAP_REL_OCCUPIER_CREL_CATALOG_VALUE_TITLE: false,
      Col_51_SEPERAT_MAP_REL_OCCUPIER_CREL_PARCEL_NUMBER: false,
      Nestedform_52: true,
      Button_Cartable_86dfc680_aabf_410a_af49_35278c1bc9dc: true,
    },
    requireds: {},
    visibilities: {
      Prop_3_REQUEST_TYPE_CID: true,
      Prop_4_ORGAN_RID: true,
      Prop_6_REQUEST_TIME: true,
      Grid_9_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL: true,
      Col_10_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_CREATE_DATE: true,
      Col_11_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_SECONDRY_PLATE: true,
      Col_12_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_ORIGINAL_PLATE: true,
      Col_13_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_AREA_RANGE: true,
      Col_14_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_PARCEL_COUNT: true,
      Col_15_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_SECTION_RID: true,
      Col_16_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_PARENT_RID: true,
      Col_17_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL_IS_ACTIVE: true,
      Contentpanel_18: true,
      Prop_21_GEOGRAPHICAL_PLACE_RID: true,
      Prop_22_PARENT_RID: true,
      Prop_24_PARENT_RID: true,
      Prop_25_PARENT_RID: true,
      Prop_28_REORGANIZATION_TYPE_CID: true,
      Prop_29_PLAN_NO: true,
      Prop_31_PLAN_DATE: true,
      Prop_34_MAPPING_METHOD_CID: true,
      Prop_36_MAP_DATE: true,
      Grid_39_SEPERAT_MAP_REL_PARCEL_CREL: true,
      Col_40_SEPERAT_MAP_REL_PARCEL_CREL_PARCEL_NUMBER: true,
      Col_41_SEPERAT_MAP_REL_PARCEL_CREL_SECONDRY_PLATE: true,
      Col_42_SEPERAT_MAP_REL_PARCEL_CREL_ORIGINAL_PLATE: true,
      Col_43_SEPERAT_MAP_REL_PARCEL_CREL_AREA: true,
      Col_44_SEPERAT_MAP_REL_PARCEL_CREL_PARCEL_UNIQUE_CODE: true,
      Grid_45_SEPERAT_MAP_REL_OCCUPIER_CREL: false,
      Col_46_SEPERAT_MAP_REL_OCCUPIER_CREL_PARCEL_UNIQUE_CODE: true,
      Col_47_SEPERAT_MAP_REL_OCCUPIER_CREL_SECONDRY_PLATE: true,
      Col_48_SEPERAT_MAP_REL_OCCUPIER_CREL_ORIGINAL_PLATE: true,
      Col_49_SEPERAT_MAP_REL_OCCUPIER_CREL_AREA: true,
      Col_50_SEPERAT_MAP_REL_OCCUPIER_CREL_CATALOG_VALUE_TITLE: true,
      Col_51_SEPERAT_MAP_REL_OCCUPIER_CREL_PARCEL_NUMBER: true,
      Nestedform_52: true,
      Button_Cartable_86dfc680_aabf_410a_af49_35278c1bc9dc: true,
    },
    mapper: {},
    parentVisible: {
      ParentVisibilities_MainForm: true,
      ParentVisibilities_Contentpanel_18: true,
      ParentVisibilities_Nestedform_52: true,
    },
    formValues: {
      Prop_3_REQUEST_TYPE_CID: {
        label: 'محدودیت رهنی',
        value: 444,
        additionalAttrib: null,
        expanded: null,
        selected: null,
      },
      Prop_4_ORGAN_RID: {
        label: 'حوزه ثبت ملک منطقه دو ايلام',
        value: 534454,
        additionalAttrib: null,
        expanded: null,
        selected: null,
      },
      Prop_6_REQUEST_TIME: '2026-07-09T00:00:00',
      Grid_9_REM13_TB_REQ_DETAIL_RID_REG_U_REG_STS_CREL: [],
      Prop_21_GEOGRAPHICAL_PLACE_RID: null,
      Prop_22_PARENT_RID: null,
      Prop_24_PARENT_RID: null,
      Prop_25_PARENT_RID: null,
      Prop_28_REORGANIZATION_TYPE_CID: null,
      Prop_29_PLAN_NO: null,
      Prop_31_PLAN_DATE: null,
      Prop_34_MAPPING_METHOD_CID: null,
      Prop_36_MAP_DATE: null,
      Grid_39_SEPERAT_MAP_REL_PARCEL_CREL: [],
      Grid_45_SEPERAT_MAP_REL_OCCUPIER_CREL: [],
      RecordCount: 0,
    },
    messages: [],
  };
}

function buildFormVisitedPayload() {
  return {
    idUser: 1610,
    formVisited: '[{"url":"/TF_34937EF6_93CB_4BE3_9128_7C118035E539","formName":"ثبت درخواست ساماندهی ","formUrl":"/TF_34937EF6_93CB_4BE3_9128_7C118035E539","isSysMenu":false,"parentForm":"","nested":[],"status":"close","date":"2026-07-09T13:53:54","Id":7.001310440246016}]',
  };
}