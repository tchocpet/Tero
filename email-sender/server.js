const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// CORS configuration
app.use(cors({
    origin: 'http://127.0.0.1:5500/kontakt.html',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type'],
}));

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Multer setup for file uploads with file size limits
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Limit file size to 10MB
});

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Handle form submission
app.post('/send-email', upload.single('filename'), (req, res) => {
    console.log('Received form submission:', req.body);
    console.log('Received file:', req.file);

    const { firma, anrede, name, strasse, plz, telefon, email, comment } = req.body;
    const file = req.file;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!email) {
        console.error('Validation error: Email is required');
        return res.status(400).json({ error: 'Email is required' });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: adminEmail,
        subject: 'Kontaktformular',
        text: `Firma: ${firma || 'N/A'}
Anrede: ${anrede || 'N/A'}
Name: ${name || 'N/A'}
Straße.Nr.: ${strasse || 'N/A'}
PLZ, Ort: ${plz || 'N/A'}
Telefon: ${telefon || 'N/A'}
E-Mail: ${email}
Nachricht: ${comment || 'N/A'}`,
        attachments: file ? [
            {
                filename: file.originalname,
                path: file.path
            }
        ] : []
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        }
        console.log('Email sent:', info.response);
        return res.status(200).json({ message: 'Email sent successfully' });
    });
});

// Global error handler for multer and other errors
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        console.error('Multer error:', err);
        return res.status(400).json({ error: err.message });
    } else if (err) {
        console.error('Server error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
    next();
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
