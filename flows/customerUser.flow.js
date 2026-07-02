import http from "k6/http";
import { check, group } from "k6";

import { ENV } from "../config/env.js";

import {
  dashboardInitTrend,
  customerDataTrend,
  purchaseTrend,
  menuTrend,
  avgGoldPriceTrend,
  requestTrend
} from "../metrics/customer.metrics.js";

export function CustomerUserFlow(token) {

  const params = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      Origin: ENV.ReactUrl,
      Referer: ENV.ReactUrl + "/"
    }
  };

  // -------------------------
  // Dashboard Initialization
  // -------------------------

  group("Dashboard Initialization", function () {
    const groupStart = Date.now();
    const menuRes = http.get(
      `${ENV.baseUrl}/Dashboard/menu`,
      {
        ...params,
        tags: {
          name: "menu",
          business_flow: "dashboard"
        }
      }
    );
    menuTrend.add(menuRes.timings.duration);
    check(menuRes, {
      "GetMenu": (r) => r.status === 200,
    });
    const avgRes = http.get(
      `${ENV.baseUrl}/Report/average-gold-price`,
      {
        ...params,
        tags: {
          name: "average-gold-price",
          business_flow: "dashboard"
        }
      }
    );

    avgGoldPriceTrend.add(avgRes.timings.duration);

    check(avgRes, {
      "average-gold-price": (r) => r.status === 200,
    });

    const customerReqRes = http.get(
      `${ENV.baseUrl}/Help/customerRequests`,
      {
        ...params,
        tags: {
          name: "customerRequests",
          business_flow: "dashboard"
        }
      }
    );

    check(customerReqRes, {
      "customerRequests": (r) => r.status === 200,
    });

    dashboardInitTrend.add(Date.now() - groupStart);
  });

  // -------------------------
  // Customer Data
  // -------------------------

  group("Get Customer Data", function () {

    const groupStart = Date.now();

    const customerInfoRes = http.get(
      `${ENV.baseUrl}/Customer/GetCustomerInfo`,
      {
        ...params,
        tags: {
          name: "GetCustomerInfo",
          business_flow: "customer_data"
        }
      }
    );

    check(customerInfoRes, {
      "GetCustomerInfo": (r) => r.status === 200,
    });

    const priceRes = http.get(
      `${ENV.baseUrl}/GoldPrice/customer/price`,
      {
        ...params,
        tags: {
          name: "price",
          business_flow: "customer_data"
        }
      }
    );

    check(priceRes, {
      "price": (r) => r.status === 200,
    });

    customerDataTrend.add(Date.now() - groupStart);
  });

  // -------------------------
  // Gold Purchase Process
  // -------------------------

  group("Gold Purchase Process", function () {

    const groupStart = Date.now();

    const payload = JSON.stringify({
      metalType: "Gold",
      requestType: "Buy",
      quantity: 1,
      notes: "Load"
    });

    const requestRes = http.post(
      `${ENV.baseUrl}/Request`,
      payload,
      {
        ...params,
        tags: {
          name: "Request",
          business_flow: "purchase"
        }
      }
    );

    requestTrend.add(requestRes.timings.duration);

    check(requestRes, {
      "Request": (r) => r.status === 200,
    });

    purchaseTrend.add(Date.now() - groupStart);
  });
}