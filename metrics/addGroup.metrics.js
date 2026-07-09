// File: addGroup.metrics.js
import { Trend } from 'k6/metrics';

export const addGroupTotalTrend = new Trend('add_group_total_duration');
export const execActionTrend = new Trend('add_group_exec_action_duration');
export const getFormTrend = new Trend('add_group_get_form_duration');
export const formVisitedTrend = new Trend('add_group_form_visited_duration');