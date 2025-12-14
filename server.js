const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "netflix_clone_secret";

// Load users
const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));

// -----------------------------
// LOGIN API
// -----------------------------
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

    res.json({
        message: "Login successful",
        token,
        username
    });
});

// -----------------------------
// PROTECTED ROUTE
// -----------------------------
app.get("/verify", (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ valid: false });
    }

    const token = authHeader.split(" ")[1];

    try {
        jwt.verify(token, SECRET_KEY);
        res.json({ valid: true });
    } catch {
        res.status(401).json({ valid: false });
    }
});

// -----------------------------
app.listen(5000, () => {
    console.log("Backend running on http://localhost:5000");
});
