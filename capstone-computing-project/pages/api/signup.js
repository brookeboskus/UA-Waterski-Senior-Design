import crypto from 'crypto';
import db from '../../db.js';
import bcrypt from 'bcrypt';
let APP_URL = process.env.NEXT_PUBLIC_APP_URL;
import 'dotenv/config';
import nodemailer from 'nodemailer';



const signup = async (req, res) => {
    console.log('entered signup')
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, password, fname, lname, cwid, phone, gradYear, major, pfpimage } = req.body;

    if (!email.endsWith('.ua.edu')) {
        return res.status(400).json({ message: 'Only .ua.edu emails are allowed to sign up.' });
    }

    try {
        // console.log('Received request:', req.body); 
        const [existingUsers] = await db.query('SELECT * FROM User WHERE Email = ?', [email]);
        // console.log('Existing users:', existingUsers);
    
        if (existingUsers && existingUsers.length > 0) {
            console.log('User already exists');
            return res.status(400).json({ message: 'User already exists' });
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // console.log('Password hashed');
    
        const imageBuffer = pfpimage ? Buffer.from(pfpimage, 'base64') : null;
    
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationURL = `${APP_URL}/api/verify?token=${verificationToken}`;

        // console.log('Generated verification token:', verificationToken);
    
        await db.query(
            `INSERT INTO User (Email, Password, Fname, Lname, CWID, Phone, GradYear, Major, PfpImage, VerificationToken) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [email, hashedPassword, fname, lname, cwid, phone, gradYear, major, imageBuffer, verificationToken]
        );
        console.log('User inserted into the database');
    
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
            subject: 'UA Waterski Team | Verify Your Email for Account Creation',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
                    <h3 style="color: #9E1B32; margin-bottom: 20px;">Hello,</h3>
                    <p style="font-size: 16px; line-height: 1.5;">
                        Thank you for signing up with the University of Alabama's Waterski Team! To complete your registration, please verify your email address by clicking the link below:
                    </p>
                    <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #9E1B32; border-radius: 8px; margin: 20px 0; text-align: center;">
                        <a href="${verificationURL}" style="display: inline-block; padding: 10px 20px; background-color: #9E1B32; color: #fff; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 5px;">
                            Verify Email
                        </a>
                    </div>
                    <p style="font-size: 16px; line-height: 1.5;">
                        If you didn’t create this account, please ignore this email.
                    </p>
                    <p style="font-size: 16px; line-height: 1.5; margin-top: 20px;">
                        Best regards,<br>
                        <span style="font-weight: bold; color: #9E1B32;">UA's Waterski Team</span>
                    </p>
                    <hr style="border: none; border-top: 1px solid #9E1B32; margin-top: 30px;"/>
                    <p style="font-size: 12px; color: #777;">
                        This email was sent from <strong>UA’s Waterski Team</strong>. You can visit our website at 
                        <a href="https://www.uawaterski.com/" style="color: #9E1B32; text-decoration: none;">https://www.uawaterski.com/</a>.
                    </p>
                </div>
            `,
        };
        
    
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent');
    
        res.status(201).json({ message: 'Signup successful! Please check your email to verify your account.' });
    } catch (error) {
        console.error('Error during signup:', error.message, error.stack);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }    
    
};

export default signup;
