import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("mock-api/db.json");
const middlewares = jsonServer.defaults();

// configure cors

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

server.use(middlewares);
server.use("/api", router);

// server listen on port 3000

server.listen(3000, () => {
  console.log("MOCK API SERVER IS RUNNING ON PORT 3000");
  console.log("API URL: http://localhost:3000/api");
  console.log("AVAILABLE ENDPOINTS:");
  console.log("  - GET  http://localhost:3000/api/dashboardStats");
});
