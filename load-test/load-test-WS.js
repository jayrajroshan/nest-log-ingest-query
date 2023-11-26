const io = require('socket.io-client');
const socket = io('http://localhost:3000');

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
      parentResourceId: "server-0987"
    }
  };
}

function sendLog(log) {
  socket.emit('ingestLog', log);
  // console.log("Sending log")
}

socket.on('connect', function() {
  console.log('Connected to server');
  performLoadTest();
});

socket.on('error', function(error) {
  console.error('WebSocket error:', error);
});

function performLoadTest() {
  const numberOfRequests = 1000000; 

  for (let i = 0; i < numberOfRequests; i++) {
    const mockLog = generateMockLog();
    sendLog(mockLog);
  }

  socket.close();
}

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});
