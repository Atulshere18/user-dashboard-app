const functions = require("firebase-functions");
const admin = require("firebase-admin");


const db = admin.firestore();

exports.updateUser = functions.https.onRequest(async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Only PUT method is allowed" });
  }

  const { id, name, email } = req.body;

  if (!id || (!name && !email )) {
    return res.status(400).json({ error: "User ID and at least one field are required" });
  }

  try {
    const userRef = db.collection("users").doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;


    await userRef.update(updates);

    return res.status(200).json({ id, ...updates });
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ error: "Failed to update user" });
  }
});
