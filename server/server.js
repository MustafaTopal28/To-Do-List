const express = require("express");
const session = require("express-session");
const crypto = require("crypto");
const cors = require('cors');

const app = express();

// Configuration de la session
app.use(
  session({
    secret: "mySecretKey", // Clé secrète pour signer les cookies de session
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cors());

// Middleware pour générer un identifiant unique pour un nouvel utilisateur
app.use((req, res, next) => {
  // Vérifie si l'utilisateur a déjà un identifiant de session
  if (!req.session.userID) {
    // Génère un nouvel identifiant unique pour l'utilisateur
    const userID = crypto.randomBytes(16).toString("hex");
    // Associe cet identifiant à la session de l'utilisateur
    req.session.userID = userID;
  }
  next();
});

// Route pour ajouter une tâche à la session de l'utilisateur
app.post("/tasks", (req, res) => {
  const userID = req.session.userID;
  // Récupérer les données de la requête et les ajouter à la session de l'utilisateur
  const task = req.body.task;
  if (!req.session.tasks) {
    req.session.tasks = [];
  }
  req.session.tasks.push(task);
  res.send("Task added successfully");
});


// Route pour récupérer les tâches de l'utilisateur
app.get("/tasks", (req, res) => {
  const userID = req.query.userID; // Récupérer l'identifiant unique de l'utilisateur depuis les paramètres de la requête
  // Récupérer les tâches de la session de l'utilisateur
  const tasks = req.session.tasks || [];
  res.json(tasks);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
