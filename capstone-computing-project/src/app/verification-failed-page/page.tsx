"use client";
import React from 'react';

const VerificationFailed = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f9f9f9',
                fontFamily: 'Arial, sans-serif',
                color: '#333',
            }}
        >
            <div
                style={{
                    textAlign: 'center',
                    padding: '20px',
                    borderRadius: '10px',
                    backgroundColor: '#fff',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    maxWidth: '500px',
                    width: '90%',
                }}
            >
                <h1 style={{ color: '#9E1B32', marginBottom: '20px' }}>Email Verification Failed</h1>
                <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
                    Oops! The verification token is invalid or has expired.
                </p>
                <p style={{ fontSize: '16px', lineHeight: '1.6', marginTop: '10px' }}>
                    If you believe this is a mistake, please try signing up again or contact support.
                </p>
                <div className="space-x-6 mt-5">
                    <a
                        href="/login-page"
                        className="hover:underline bg-gray-600 text-white px-4 py-2 rounded-md"
                    >
                        Go to Signup
                    </a>
                    <a
                        href="/contact-us-page"
                        className="hover:underline bg-gray-600 text-white px-4 py-2 rounded-md"
                    >
                        Contact Support
                    </a>
                </div>

            </div>
        </div>
    );
};

export default VerificationFailed;
