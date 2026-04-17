import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL, // your company email
            subject: `New Contact Message from ${name}`,
            html: `
                <h3>New Message</h3>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Message:</b> ${message}</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "Email sent" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error sending email" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));