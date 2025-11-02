import jsonServer from "json-server";
import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router("mock-api/db.json");
const middlewares = jsonServer.defaults({ noCors: false });

// Load database data
const dbPath = `${__dirname}/db.json`;
const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));

// configure cors
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

server.use(jsonServer.bodyParser);
server.use(middlewares);

// auth endpoints (must be before router to work properly)
server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const allUsers = [...db.users, db.admin];
  const user = allUsers.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // if user exist, then we need unhashed the db password and compare it with the password from the request
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // if password is valid, then we need to generate a token and return it to the client

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // remove password from user object
  const { password: _, ...userWithoutPassword } = user;

  // let save the token to the browser's cookie using cookie parser library
  res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 3600000 });
  res.json({
    user: userWithoutPassword,
    token,
  });
});

// we will need a middleware to check if the user is authenticated or not on each request
server.use((req, res, next) => {
  console.log("COOKIES : ", req.cookies);
  if (req.path.startsWith("/auth")) {
    next();
    return;
  }
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const allUsers = [...db.users, db.admin];
    const user = allUsers.find((user) => user.id === decoded.userId);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.authUser = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

server.use("/api", router);

// dashboard endpoints
server.get("/dashboardStats", (req, res) => {
  res.json(db.dashboardStats);
});
server.get("/recentActivity", (req, res) => {
  res.json(db.recentActivity);
});
server.get("/chartData", (req, res) => {
  res.json(db.chartData);
});

// users endpoints
server.get("/users", (req, res) => {
  res.json([...db.users, db.admin]);
});
server.get("/users/:id", (req, res) => {
  const allUsers = [...db.users, db.admin];
  const user = allUsers.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});
server.post("/users", (req, res) => {
  const newUser = req.body;
  db.users.push(newUser);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.status(201).json(newUser);
});
server.put("/users/:id", (req, res) => {
  const allUsers = [...db.users, db.admin];
  const user = allUsers.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  user.name = req.body.name;
  user.email = req.body.email;
  user.role = req.body.role;
  user.status = req.body.status;
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json(user);
});
server.delete("/users/:id", (req, res) => {
  const userIndex = db.users.findIndex(
    (user) => user.id === parseInt(req.params.id)
  );
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  db.users.splice(userIndex, 1);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.status(204).send();
});

// server listen on port 3000
server.listen(3000, () => {
  console.log("MOCK API SERVER IS RUNNING ON PORT 3000");
  console.log("API URL: http://localhost:3000/api");
  console.log("AVAILABLE ENDPOINTS:");
  console.log("  - GET  http://localhost:3000/api/dashboardStats");
});
