// src/app/forgot-password-page.tsx
"use client";
import { useState } from 'react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        const apiUrl = process.env.NODE_ENV === 'production'
            ? 'http://localhost:4000/api/forgotPassword'
            : '/api/forgotPassword';

        try {
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                const data = await res.json();
                setMessage(data.message || 'Password reset link sent to your email address.');
                setError('');
            } else {
                const errorData = await res.json();
                setError(errorData.message || 'An error occurred while processing your request.');
                setMessage('');
            }
        } catch (error) {
            setError('Network error. Please try again.');
            setMessage('');
        }
    };

    return (
        <div className="forgot-password-page flex items-center justify-center min-h-screen bg-[#ffffff]">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-black">
                <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
                {message ? (
                    <p className="text-green-600">{message}</p>
                ) : (
                    <form onSubmit={handleForgotPassword} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49A097]"
                            required
                        />
                        <button type="submit" className="w-full bg-[#9E1B32] text-white py-2 rounded-full font-bold">
                            Send Reset Link
                        </button>
                    </form>
                )}
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
            </div>
        </div>
    );
}
