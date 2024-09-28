import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "/css")
  )
);
app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "/JS")
  )
);

mongoose.connect(process.env.MONGODB_URI);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.redirect("/Project-1");
});

app.get("/signup_login", (req, res) => {
  res.sendFile(
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "..",
      "signup_login.html"
    )
  );
});

app.get("/Project-1", (req, res) => {
  res.sendFile(
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "..",
      "Project-1.html"
    )
  );
});

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send("User created successfully!");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid password");
    }
    res.status(200).send("Login successful");
  } catch (error) {
    res.status(500).send("Error logging in");
  }
});

app.listen(3000, () => {
  console.log("Server connected to mongoDB");
});
