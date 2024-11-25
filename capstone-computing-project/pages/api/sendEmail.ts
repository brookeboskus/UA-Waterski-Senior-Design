import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, message, role } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Please fill out all fields.' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_EMAIL,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        // how the email sent to me is formatted in my inbox
        const mailOptionsToOwner = {
            from: process.env.GMAIL_EMAIL,
            to: process.env.GMAIL_EMAIL,
            subject: `New message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nRole: ${role}\nMessage: ${message}`,
            html: `
                <h3>You have a new message from your website contact form</h3>
                <ul>
                    <li><strong>Name:</strong> ${name}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Role:</strong> ${role}</li>
                </ul>
                <p><strong>Message:</strong><br>${message}</p>
            `,
        };

        // how the email sent to the user is formatted
        const mailOptionsToUser = {
            from: process.env.GMAIL_EMAIL,
            to: email,
            subject: 'Email Confirmation: Your message has been sent and received',
            text: `Hello ${name},\n\nThank you for getting in touch! Here’s a copy of your message:\n\n${message}\n\nI'll get back to you as soon as I can.\n\nBest regards,\nJeongbin Son`,
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
                    <h3 style="color: #9E1B32; margin-bottom: 20px;">Hello ${name},</h3>
                    <p style="font-size: 16px; line-height: 1.5;">
                        Thank you for reaching out to the University of Alabama's Waterski Team! Below is a copy of your message details:
                    </p>
                    <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #9E1B32; border-radius: 8px; margin: 20px 0;">
                        <p style="font-size: 16px; color: #333;">
                            <strong>Role:</strong> ${role || 'Not specified'}
                        </p>
                        <p style="font-size: 16px; color: #333; margin-top: 10px;">
                            <strong>Message:</strong><br>${message}
                        </p>
                    </div>
                    <p style="font-size: 16px; line-height: 1.5;">
                        We will get back to you as soon as possible.
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



        try {
            // send user's email to me
            await transporter.sendMail(mailOptionsToOwner);

            // send confirmation email to user
            await transporter.sendMail(mailOptionsToUser);

            // send success response
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email' });
        }
    } else {
        res.status(405).json({ message: 'Only POST requests allowed' });
    }
}