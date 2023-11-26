
# Log Ingestor and Query Interface

## Overview

This project implements a log ingestor and query interface using Node.js with NestJS. The log ingestor allows for efficient handling of high volumes of log data, ingested over HTTP and WebSocket. The query interface provides a simple yet powerful way to query the ingested logs based on various parameters including time ranges, levels, and messages. The system uses QuestDB for log storage, taking advantage of its high-performance time-series data capabilities.

## Features

- **Log Ingestor**: Ingests logs via HTTP and WebSocket.
- **Query Interface**: Supports querying logs based on level, message, timestamp, and other log attributes.
- **Time Range Queries**: Allows querying logs within specific start and end times.
- **Scalable Architecture**: Designed to efficiently handle large volumes of data.

## Getting Started

### Prerequisites

- Node.js
- NestJS
- Docker (For running QuestDB)
- QuestDB

### Installation

1. Clone the repository or download the codebase:
   ```
   git clone [repository URL]
   ```
3. Install the necessary packages:
   ```
   npm install
   ```

### Running the Application

1. Start QuestDB:
   ```
   docker compose up
   ```
2. Navigate to the project directory:
   ```
   cd nest-log-ingest-query
   ```
3. Run the NestJS application:
   ```
   npm run start
   ```

### Using the Log Ingestor

- **HTTP Ingestion**:
  Send a POST request to `http://localhost:3000/logs` with the log data in JSON format.

- **WebSocket Ingestion**:
  Connect to the WebSocket server at `ws://localhost:3000` and send log data in JSON format.

- **Load Test**:
  You can use the scripts present in the `load-test` folder to test the ingestion. Just do an `npm install` and use node to run the scripts.

### Querying Logs

- Access the query interface via the provided HTML file (in the FE folder).
- Enter the query parameters like log level, message content, and time range.
- Submit the query to retrieve matching logs.
- You can also access the QuestDB Web UI on `http://localhost:9000/`.

## API Reference

- `POST /logs`: Endpoint for ingesting logs via HTTP.
- WebSocket connection: For ingesting logs via WebSocket.

## Log Format

```json
{
	"level": "error",
	"message": "Failed to connect to DB",
    "resourceId": "server-1234",
	"timestamp": "2023-09-15T08:00:00Z",
	"traceId": "abc-xyz-123",
    "spanId": "span-456",
    "commit": "5e5342f",
    "metadata": {
        "parentResourceId": "server-0987"
    }
}
```
## Features:

- [x] Scalable architecture to handle high volumes of logs efficiently.
- [x] Logs are ingested via an HTTP server, which runs on port `3000` by default.
- [x] User interface (Web UI or CLI) for full-text search across logs.
- [x] Filters based on:
    - [x] level
    - [x] message
    - [x] resourceId
    - [x] timestamp
    - [x] traceId
    - [x] spanId
    - [x] commit
    - [x] metadata.parentResourceId
- [x] Efficient and quick search results.
- [x] Search within specific date ranges.
- [x] Allow combining multiple filters.
- [x] Real-time log ingestion and searching capabilities.