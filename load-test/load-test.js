const http = require('http');
const hostname = 'localhost'; // Replace with your server's hostname if different
const port = 3000; // Replace with your server's port if different

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateMockLog() {
  const levels = ["error", "warn", "info", "debug"];
  const messages = [
    "Failed to connect to DB",
    "User login attempt failed",
    "Payment processed successfully",
    "New user registered"
  ];
  const resourceIds = ["server-1234", "server-5678", "server-9012"];
  const traceIds = ["abc-xyz-123", "def-uvw-456", "ghi-tsr-789"];
  const spanIds = ["span-456", "span-789", "span-012"];
  const commits = ["5e5342f", "7b8c9d0", "9a0b1c2"];

  return {
    level: randomElement(levels),
    message: randomElement(messages),
    resourceId: randomElement(resourceIds),
    timestamp: new Date().toISOString(),
    traceId: randomElement(traceIds),
    spanId: randomElement(spanIds),
    commit: randomElement(commits),
    metadata: {
      parentResourceId: "server-0987" // Keep static or randomize similarly
    }
  };
}

function sendLog(log) {
  const data = JSON.stringify(log);

  const options = {
    hostname,
    port,
    path: '/logs',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);
    res.on('data', (d) => process.stdout.write(d));
  });

  req.on('error', (error) => console.error(error));
  req.write(data);
  req.end();
}

function performLoadTest() {
  const numberOfRequests = 10000; // Adjust this number based on your load testing requirements

  for (let i = 0; i < numberOfRequests; i++) {
    const mockLog = generateMockLog();
    sendLog(mockLog);
  }
}

performLoadTest();
