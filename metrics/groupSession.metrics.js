import { Trend } from 'k6/metrics';

export const groupSessionGridTrend = new Trend('group_session_grid_duration');
export const groupSessionTotalTrend = new Trend('group_session_total_duration');