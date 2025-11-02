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
server.get("/dashboardStats", (req, res) => {
  res.json(dashboardStats);
});
server.get("/recentActivity", (req, res) => {
  res.json(recentActivity);
});
server.get("/chartData", (req, res) => {
  res.json(chartData);
});
server.get("/users", (req, res) => {
  res.json(users);
});
server.get("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});
server.post("/users", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});
server.put("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  user.name = req.body.name;
  user.email = req.body.email;
  user.role = req.body.role;
  user.status = req.body.status;
  res.json(user);
});
server.delete("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  users = users.filter((user) => user.id !== parseInt(req.params.id));
  res.status(204).send();
});
server.listen(3000, () => {
  console.log("MOCK API SERVER IS RUNNING ON PORT 3000");
  console.log("API URL: http://localhost:3000/api");
  console.log("AVAILABLE ENDPOINTS:");
  console.log("  - GET  http://localhost:3000/api/dashboardStats");
});
