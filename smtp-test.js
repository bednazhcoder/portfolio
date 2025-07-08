const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

transporter.verify(function (error, success) {
  if (error) {
    console.error('❌ Verbindung fehlgeschlagen:', error);
  } else {
    console.log('✅ SMTP-Verbindung erfolgreich:', success);
  }
});
