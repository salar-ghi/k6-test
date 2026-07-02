# Login only
k6 run scenarios/loginOnly.js --vus 2 --duration 30s
k6 run scenarios/fullScenario.js -e TEST_TYPE=smoke
k6 run scenarios/fullScenario.js -e TEST_TYPE=baseline
k6 run scenarios/fullScenario.js -e TEST_TYPE=stress

k6 run scenarios/loginOnly.js -e TEST_TYPE=baseline --out html=loginReport.html
k6 run scenarios/fullScenario.js --summary-export=summary.json

k6 run scenarios\loginOnly.js --vus 2 --duration 45s --out html=reports\login-report.html


k6 run scenarios\loginOnly.js --vus 2 --duration 30s --out html=reports\loginOnly-report.html --out json=reports\loginOnly-result.json