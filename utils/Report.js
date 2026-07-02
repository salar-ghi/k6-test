import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";


export function GenerateSummery(data) {
  return {
    "summary.html": htmlReport(data), // خروجی HTML در ریشه پروژه
    "stdout": textSummary(data, { indent: " ", enableColors: true }), // نمایش خلاصه رنگی در ترمینال
  };
}