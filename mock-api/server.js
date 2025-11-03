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
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

server.use(jsonServer.bodyParser);
server.use(middlewares);

// auth endpoints (must be before router to work properly)
server.post("/api/auth/login", (req, res) => {
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

  const { password: _, ...userWithoutPassword } = user;

  // Set token in httpOnly cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 3600000,
  });
  res.json({
    user: userWithoutPassword,
    token,
  });
});

// we will need a middleware to check if the user is authenticated or not on each request
server.use((req, res, next) => {
  console.log("REQUEST PATH : ", req.path);
  if (req.path.startsWith("/api/auth")) {
    next();
    return;
  }

  // Try to get token from Bearer header OR cookie
  let token;
  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.headers.cookie) {
    const cookies = req.headers.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {});
    token = cookies.token;
  }

  // console.log("BEARER TOKEN : ", req.headers.authorization);
  // console.log("COOKIE TOKEN : ", token);

  if (!token) {
    return res.status(401).json({ error: "Invalid token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
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

// dashboard endpoints
server.get("/api/dashboardStats", (req, res) => {
  res.json(db.dashboardStats);
});
server.get("/api/recentActivity", (req, res) => {
  res.json(db.recentActivity);
});
server.get("/api/chartData", (req, res) => {
  res.json(db.chartData);
});

// analytics endpoints
server.get("/api/analyticsData", (req, res) => {
  res.json(db.analyticsData);
});
// users endpoints
server.get("/api/users", (req, res) => {
  res.json([...db.users, db.admin]);
});
server.get("/api/users/:id", (req, res) => {
  const allUsers = [...db.users, db.admin];
  const user = allUsers.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});
server.post("/api/users", (req, res) => {
  const newUser = req.body;
  newUser.avatar = `https://i.pravatar.cc/150?img=${Math.floor(
    Math.random() * 70
  )}`;
  newUser.createdAt = new Date().toISOString();
  db.users.push(newUser);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.status(201).json(newUser);
});
server.put("/api/users/:id", (req, res) => {
  const allUsers = [...db.users, db.admin];
  const user = allUsers.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  user.name = req.body.name;
  user.email = req.body.email;
  user.role = req.body.role;
  user.status = req.body.status;
  user.avatar = user.avatar;
  user.createdAt = user.createdAt;
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json(user);
});
server.delete("/api/users/:id", (req, res) => {
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
