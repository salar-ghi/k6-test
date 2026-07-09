// File: management.metrics.js
import { Trend } from 'k6/metrics';

// Define all custom metrics for Management flow
export const managementFormConfigTrend = new Trend('management_form_config_duration');
export const managementGridTrend = new Trend('management_grid_duration');
export const managementJsAssetTrend = new Trend('management_js_asset_duration');
export const managementTotalTrend = new Trend('management_total_duration');