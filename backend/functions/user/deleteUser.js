const functions = require("firebase-functions");
const admin = require("firebase-admin");

const db = admin.firestore();

exports.deleteUser = functions.https.onRequest(async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Only DELETE method is allowed" });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const userRef = db.collection("users").doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    await userRef.delete();

    return res.status(200).json({ message: "User deleted successfully", id });
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).json({ error: "Failed to delete user" });
  }
});
