const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User"); // تأكد من اسم الملف والمسار الصحيح فقط

const app = express();
app.use(express.json());

// Connexion à la base de données
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connecté à MongoDB");
  } catch (err) {
    console.error("❌ Erreur de connexion :", err);
    process.exit(1);
  }
}
connectDB();

// Routes

// GET - récupérer tous les utilisateurs
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - ajouter un utilisateur
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT - modifier un utilisateur par ID
app.put("/users/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - supprimer un utilisateur par ID
app.delete("/users/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json({ message: "Utilisateur supprimé." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));
