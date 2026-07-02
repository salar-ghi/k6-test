import { Trend } from 'k6/metrics';

export const dashboardInitTrend =
    new Trend('dashboard_init_duration');

export const customerDataTrend =
    new Trend('customer_data_duration');

export const purchaseTrend =
    new Trend('purchase_duration');

export const menuTrend =
    new Trend('menu_duration');

export const avgGoldPriceTrend =
    new Trend('avg_gold_price_duration');

export const requestTrend =
    new Trend('request_duration');