    // File: addManagement.metrics.js
import { Trend } from 'k6/metrics';

export const addManagementTotalTrend = new Trend('add_management_total_duration');
export const execActionTrend = new Trend('add_management_exec_action_duration');
export const getFormTrend = new Trend('add_management_get_form_duration');
export const jsAssetTrend = new Trend('add_management_js_asset_duration');