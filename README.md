# k6-performance-test-suite


Script execution commands :

1. Update Address: k6 run ./sp_api_performance/tests/updateAddress_Test.js -e environment=qa 
2. Search Valid ID : k6 run ./sp_api_performance/tests/searchValidJob_Test.js -e environment=qa
3. Search Invalid ID: k6 run ./sp_api_performance/tests/searchInvalidJob_Test.js  -e environment=qa
4. Multiple Scenarios : k6 run ./sp_api_performance/tests/multipleScenarios.js -e environment=qa
5. Start.js : k6 run ./sp_api_performance/start.js  -e environment=qa

To run to crteate report:
k6 run ./sp_api_performance/tests/multipleScenarios.js -e environment=preprod --summary-export=summary-report.js