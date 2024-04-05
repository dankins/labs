const http = require("http");

// Base URL for the endpoints
const baseURL = "http://host.docker.internal:4300";

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
  const url = baseURL + path;
  console.log(`Calling endpoint: ${url}`);
  // Simulate an endpoint call
  http
    .get(url, (resp) => {
      let data = "";
      resp.on("data", (chunk) => {
        data += chunk;
      });
      resp.on("end", () => {
        console.log(data);
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

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
    setInterval(() => callEndpoint(task.path), interval);
  } else {
    console.log(`Schedule "${task.schedule}" not supported.`);
  }
};

// Function to process all tasks
const runCronJobs = () => {
  vercelConfig.crons.forEach(scheduleTask);
};

runCronJobs();
