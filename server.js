const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors'); // ← NEU: cors importieren

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // ← NEU: CORS aktivieren, GANZ OBEN nach app-Initialisierung

// Serve frontend files (optional, wenn du frontend mitservierst)
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Email transporter konfigurieren
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Kontaktformular-Route
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: 'Neue Nachricht von deiner Portfolio-Seite',
      text: message,
    });

    res.status(200).json({ message: 'Nachricht erfolgreich gesendet!' });
  } catch (error) {
    console.error('Fehler beim Senden:', error);
    res.status(500).json({ message: 'Fehler beim Senden der Nachricht.' });
  }
});

// Server starten
app.listen(PORT, () => {
  console.log(`✅ Server läuft auf http://localhost:${PORT}`);
});
