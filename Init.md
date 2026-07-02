🎯 هدف

این فرآیند برای رسیدن به این خروجی‌ها طراحی شده است:

ظرفیت واقعی سیستم (Concurrent Users)
نقطه شکست (Breaking Point)
Bottleneck اصلی (DB / CPU / Code / Infra)
رفتار سیستم تحت فشار (Latency / Error Rate)
پایداری بلندمدت (Memory Leak / Degradation)
1️⃣ معماری تست
1.1 اصول طراحی تست

سیستم باید به صورت User Flow Based تست شود، نه endpoint جداگانه.

❌ اشتباه
فشار دادن /api/getPrice به صورت تکی
✅ درست

شبیه‌سازی رفتار واقعی:

Login → Get Price → Dashboard → Buy → Balance
1.2 ابزارها
Load Test Engine: k6
(اختیاری) Metrics:
Prometheus
Grafana
Logging:
Serilog (داخل اپلیکیشن)
2️⃣ ساختار پروژه تست
k6-load-test/
│
├── scenarios/
│   ├── smoke.js
│   ├── baseline.js
│   ├── stress.js
│   ├── spike.js
│   └── soak.js
│
├── flows/
│   ├── auth.flow.js
│   ├── user.flow.js
│   └── trade.flow.js
│
├── config/
│   ├── env.js
│   └── thresholds.js
│
├── data/
│   ├── users.json
│
└── utils/
    └── helpers.js
3️⃣ کانفیگ محیط
config/env.js
export const ENV = {
  baseUrl: __ENV.BASE_URL || "https://api.your-system.com",
  users: parseInt(__ENV.USERS || "50"),
};
config/thresholds.js
export const thresholds = {
  http_req_failed: ["rate<0.01"],       // <1% خطا
  http_req_duration: ["p(95)<500"],     // P95 < 500ms
  http_req_duration: ["p(99)<1000"],    // P99 < 1s
};
4️⃣ Flow های اصلی سیستم
4.1 Auth Flow
import http from "k6/http";
import { ENV } from "../config/env.js";

export function login(user) {
  const res = http.post(`${ENV.baseUrl}/api/auth/login`, JSON.stringify({
    username: user.username,
    password: user.password,
  }), {
    headers: { "Content-Type": "application/json" },
  });

  return res.json("token");
}
4.2 User Flow (رفتار واقعی کاربر)
import http from "k6/http";
import { ENV } from "../config/env.js";

export function userFlow(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  http.get(`${ENV.baseUrl}/api/price`, { headers });
  http.get(`${ENV.baseUrl}/api/dashboard`, { headers });
  http.get(`${ENV.baseUrl}/api/balance`, { headers });
}
5️⃣ سناریوهای تست
5.1 Smoke Test (سلامت سیستم)
هدف:

اطمینان از اینکه سیستم خراب نیست

export const options = {
  vus: 2,
  duration: "30s",
};
5.2 Baseline Test (رفتار نرمال)
هدف:

پیدا کردن ظرفیت معمول سیستم

export const options = {
  stages: [
    { duration: "1m", target: 10 },
    { duration: "3m", target: 20 },
    { duration: "3m", target: 50 },
    { duration: "3m", target: 100 },
  ],
};
5.3 Stress Test (پیدا کردن نقطه شکست)
هدف:

فهمیدن limit واقعی سیستم

export const options = {
  stages: [
    { duration: "1m", target: 10 },
    { duration: "1m", target: 50 },
    { duration: "1m", target: 100 },
    { duration: "1m", target: 200 },
    { duration: "1m", target: 300 },
    { duration: "1m", target: 500 },
  ],
};
5.4 Spike Test (شوک ناگهانی)
هدف:

بررسی رفتار سیستم در burst traffic

export const options = {
  stages: [
    { duration: "10s", target: 20 },
    { duration: "10s", target: 300 },
    { duration: "30s", target: 300 },
    { duration: "10s", target: 20 },
  ],
};
5.5 Soak Test (پایداری طولانی)
هدف:

بررسی memory leak و degradation

export const options = {
  vus: 50,
  duration: "6h",
};
6️⃣ اجرای تست‌ها
k6 run scenarios/smoke.js
k6 run scenarios/baseline.js
k6 run scenarios/stress.js
k6 run scenarios/spike.js
k6 run scenarios/soak.js
7️⃣ متریک‌هایی که باید مانیتور شوند
Application
RPS
Response Time (P95 / P99)
Error Rate
Active Requests
Server
CPU %
RAM %
Thread Pool usage
GC Pressure
Database
Connection Pool usage
Slow queries
Locking / Deadlocks