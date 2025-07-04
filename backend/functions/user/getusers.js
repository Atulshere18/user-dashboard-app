const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { db } = require("../firebase");

const app = express();
app.use(cors({ origin: true }));

app.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

exports.getUsers = functions.https.onRequest(app);
