const http = require("http");
const https = require("https");

// Base URL for the endpoints
const CRON_SECRET = process.env["CRON_SECRET"];
const BASE_URL = process.env["BASE_URL"];

// Simulating reading from vercel.json
const vercelConfig = {
  crons: [
    {
      path: "/api/cron/every-minute",
      schedule: "* * * * *",
    },
    {
      path: "/api/cron/every-hour",
      schedule: "0 * * * *",
    },
    {
      path: "/api/cron/every-day",
      schedule: "0 0 * * *",
    },
  ],
};

// Function to call the REST endpoint
const callEndpoint = (path) => {
  const url = BASE_URL + path;
  console.log(`Calling endpoint: ${url}`);

  let call = url.startsWith("https") ? https : http;

  // Simulate an endpoint call
  call
    .get(
      url,
      {
        headers: {
          authorization: `Bearer ${CRON_SECRET}`,
        },
      },
      (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
          data += chunk;
        });
        resp.on("end", () => {
          console.log(data);
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

const intervals = [];
// Function to schedule tasks based on cron pattern
const scheduleTask = (task) => {
  let interval = null;

  // Convert cron schedule to milliseconds
  switch (task.schedule) {
    case "* * * * *": // every minute
      interval = 60000;
      break;
    case "0 * * * *": // every hour
      interval = 3600000;
      break;
    case "0 0 * * *": // every day
      interval = 86400000;
      break;
  }

  if (interval) {
    const intervalId = setInterval(() => callEndpoint(task.path), interval);
    intervals.push(intervalId);
  } else {
    console.log(`Schedule "${task.schedule}" not supported.`);
  }
};

// Function to process all tasks
const runCronJobs = () => {
  vercelConfig.crons.forEach(scheduleTask);
};

runCronJobs();

// Handle SIGTERM to stop the process gracefully
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received. Shutting down gracefully...");
  intervals.forEach(clearInterval);
  process.exit(0);
});
