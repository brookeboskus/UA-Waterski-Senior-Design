// page 2 for forgot password

import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import db from '../../db';
const SECRET_KEY = process.env.JWT_SECRET;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

const isValidUAEmail = (email: string): boolean => {
    //pattern=".+@+(.+\.)?ua\.edu"
    const uaEmailPattern = /.+@+(.+\.)?ua\.edu/;
    return uaEmailPattern.test(email);
};

const isEmailRegistered = async (email: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM User WHERE Email = ?';
        db.query(query, [email], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                reject(err);
            } else if (Array.isArray(results)) {
                resolve(results.length > 0);
            } else {
                resolve(false); // Return false if results are not in the expected array format
            }
        });
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email } = req.body;

        try {
            if (!isValidUAEmail(email)) {
                return res.status(400).json({ success: false, message: "Please use a valid email address." });
            }

            const emailExists = await isEmailRegistered(email);
            if (!emailExists) {
                return res.status(400).json({ success: false, message: "If this email is registered, a password reset link has been sent." });
            }

            if (!SECRET_KEY) {
                return res.status(500).json({ success: false, message: "Server error: missing secret key for JWT." });
            }

            const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
            const resetLink = `${APP_URL}/reset-password?token=${token}`;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_EMAIL,
                    pass: process.env.GMAIL_APP_PASSWORD,
                },
            });

            const mailOptions = {
                from: process.env.GMAIL_EMAIL,
                to: email,
                subject: 'Password Reset Request for the UA Waterski Team',
                text: `Click the following link to reset your password: ${resetLink}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="text-align: center; color: #9E1B32;">UA Waterski Team</h2>
                        <h2 style="text-align: center; color: #9E1B32;">Password Reset Link</h2>

                        <p style="font-size: 16px; color: #333;">Hi there,</p>
                        <p style="font-size: 16px; color: #333;">
                            You requested a password reset for your account on the UA Waterski Team platform. 
                            Click the button below to reset your password. This link is valid for the next hour.
                        </p>
                        <br></br>
                        <div style="text-align: center; margin: 20px 0;">
                            <a href="${resetLink}" style="text-decoration: none; color: white; background-color: #9E1B32; padding: 10px 20px; border-radius: 5px; font-size: 16px;">Reset Password</a>
                        </div>
                        <br></br>
                        <p style="font-size: 14px; color: #555;">
                            If you didn't request this, you can safely ignore this email.
                        </p>
                        <hr style="border-top: 1px solid #eee; margin-top: 20px;">
                        <p style="font-size: 12px; color: #888; text-align: center;">
                            UA Waterski Team | University of Alabama<br>
                        </p>
                    </div>
                `,
            };

            await transporter.sendMail(mailOptions);

            res.status(200).json({ success: true, message: "Password reset link sent to your email address." });
        } catch (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ success: false, error: "Failed to send password reset link." });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}