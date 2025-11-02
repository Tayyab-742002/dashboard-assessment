import jsonServer from "json-server";
import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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

// we will need a middleware to check if the user is authenticated or not on each request
server.use((req, res, next) => {
  if (req.path === "/auth/login") {
    next();
    return;
  }
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const user = users.find((user) => user.id === decoded.userId);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  req.authUser = user;
  next();
});

server.use("/api", router);
// dashboard endpoints
server.get("/dashboardStats", (req, res) => {
  res.json(dashboardStats);
});
server.get("/recentActivity", (req, res) => {
  res.json(recentActivity);
});
server.get("/chartData", (req, res) => {
  res.json(chartData);
});

// users endpoints
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

// auth endpoints

server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // if user exist, then we need unhashed the db password and compare it with the password from the request
  const isPasswordValid = bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // if password is valid, then we need to generate a token and return it to the client

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // remove password from user object
  const { password: _, ...userWithoutPassword } = user;
  res.json({
    user: userWithoutPassword,
    token,
  });
});
// server listen on port 3000
server.listen(3000, () => {
  console.log("MOCK API SERVER IS RUNNING ON PORT 3000");
  console.log("API URL: http://localhost:3000/api");
  console.log("AVAILABLE ENDPOINTS:");
  console.log("  - GET  http://localhost:3000/api/dashboardStats");
});
