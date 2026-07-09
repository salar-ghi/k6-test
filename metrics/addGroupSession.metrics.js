// File: addGroupSession.metrics.js
import { Trend } from 'k6/metrics';

export const addGroupSessionTotalTrend = new Trend('add_group_session_total_duration');
export const execActionTrend = new Trend('add_group_session_exec_action_duration');
export const getFormTrend = new Trend('add_group_session_get_form_duration');
export const formVisitedTrend = new Trend('add_group_session_form_visited_duration');
export const jsAssetTrend = new Trend('add_group_session_js_asset_duration');