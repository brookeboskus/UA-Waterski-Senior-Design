// this is not done
// for future access to work on, this is page 1 for forgot password

"use client";
import { useState } from 'react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('api/forgotPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (data.success) {
                setMessage(data.message);
                setError('');
            } else {
                setMessage('');
                setError(data.error);
            }
        } catch (error) {
            console.log(error);
            setMessage('');
            setError('Something went wrong. Please try again.');
        }
    };


    return (
        <div className="min-h-screen flex flex-col text-gray-800">
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-[#9E1B32] mb-6">Forgot Password?</h1>
                    <p className="text-lg text-black max-w-3xl mx-auto">
                        Enter your registered email address to receive a link to reset your password.
                    </p>
                </div>

                <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
                    <form onSubmit={handleForgotPassword}>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#49A097] focus:border-[#49A097]"
                                required
                            />
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-[#9E1B32] text-white px-8 py-4 rounded-full hover:bg-[#000000] transition duration-300"
                            >
                                Send Reset Link
                            </button>
                        </div>
                    </form>

                    <p className={`text-center mt-4 ${message ? 'text-green-500' : 'text-red-500'}`}>
                        {message || error}
                    </p>

                    <div className="text-center mt-6">
                        <a href="/login-page" className="text-[#9E1B32] hover:underline">
                            Back to Login
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
