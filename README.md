# K6 Load Test Sample

This is a sample K6 script for load testing a sequence of HTTP endpoints.

## Prerequisites

- Install [k6](https://k6.io/docs/getting-started/installation)

## Usage

1. Edit `script.js`:
   - Replace the `ENDPOINTS` array with your list of endpoints in the order they should be executed.
   - Each endpoint object should have:
     - `url`: string
     - `method`: 'GET', 'POST', 'PUT', 'DELETE', etc.
     - `body`: (optional) string or object (will be JSON.stringified if object)
     - `params`: (optional) object with `headers` and other k6 request params
   - Adjust the `options` block to set the desired number of virtual users (VUs) and test duration.

2. Run the test:
   ```bash
   k6 run script.js
   ```

## Example Endpoint

```javascript
{
  url: 'https://api.example.com/login',
  method: 'POST',
  body: { username: 'test', password: '123' },
  params: { headers: { 'Content-Type': 'application/json' } },
}
```

## Configuration

In the `options` object you can set:
- `vus`: number of virtual users
- `duration`: test duration (e.g., '30s', '5m')
- Or use stages for more complex load patterns:
  ```javascript
  export const options = {
    stages: [
      { duration: '2m', target: 20 }, // ramp up to 20 VUs over 2 minutes
      { duration: '5m', target: 20 }, // stay at 20 VUs for 5 minutes
      { duration: '2m', target: 0 },  // ramp down to 0 VUs over 2 minutes
    ],
  };
  ```

## Checks

The script includes a basic check for HTTP status 200. Add more checks as needed for your endpoints.

## Output

k6 will output a summary of the test results, including metrics like response times, success/failure rates, etc.

## Further Reading

- [k6 documentation](https://k6.io/docs/)
- [HTTP request API](https://k6.io/docs/javascript-api/k6-http/)