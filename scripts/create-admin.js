// we will write the script here to create a admin user
// That admin user will be used to logged in to the application

import bcrypt from "bcryptjs";
import fs from "fs";

const createAdmin = async () => {
  const password = "admin123";
  const hashedPassword = bcrypt.hashSync(password, 10);
  const admin = {
    id: 0,
    name: "Admin",
    email: "admin@admin.co",
    password: hashedPassword,
    role: "Admin",
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=1",
    createdAt: new Date().toISOString(),
  };
  const db = JSON.parse(fs.readFileSync("mock-api/db.json", "utf8"));
  db.admin = admin;
  fs.writeFileSync("mock-api/db.json", JSON.stringify(db, null, 2));
  console.log("Admin user created successfully");
  console.log("ADMING TOKEN",)
};

createAdmin();
