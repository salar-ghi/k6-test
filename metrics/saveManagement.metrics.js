// File: saveManagement.metrics.js
import { Trend } from 'k6/metrics';

export const saveManagementTotalTrend = new Trend('save_management_total_duration');
export const execActionTrend = new Trend('save_management_exec_action_duration');
export const savePostTrend = new Trend('save_management_post_duration');
export const formVisitedTrend = new Trend('save_management_form_visited_duration');