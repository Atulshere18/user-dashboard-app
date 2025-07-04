const functions = require("firebase-functions");
const admin = require("firebase-admin");

const db = admin.firestore();

exports.createUser = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method is allowed" });
  }

  const { name, email} = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const docRef = await db.collection("users").add({ name, email });
    return res.status(201).json({ id: docRef.id, name, email});
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ error: "Failed to create user" });
  }
});
