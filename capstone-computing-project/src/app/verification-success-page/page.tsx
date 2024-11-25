// "use client";
// import React, { useEffect } from 'react';

// const VerificationSuccess = () => {
//     useEffect(() => {
//         setTimeout(() => {
//             window.close(); 
//         }, 5000); 
//     }, []);

//     return (
//         <div style={{ textAlign: 'center', marginTop: '20%' }}>
//             <h1 className="text-black">Email Verified Successfully!</h1>
//             <p className="text-black">Thank you for verifying your email. This page will automatically close in 5 seconds.</p>
//         </div>
//     );
// };

// export default VerificationSuccess;




"use client";
import React, { useEffect } from 'react';

const VerificationSuccess = () => {
    useEffect(() => {
        setTimeout(() => {
            window.close(); 
        }, 5000); 
    }, []);

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
                <h1 className="text-green-400" style={{ marginBottom: '20px' }}>Email Verified Successfully!</h1>
                <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
                    Thank you for verifying your email. You can now proceed to use the platform.
                    This page will automatically close in <strong>5 seconds</strong>.
                </p>
                <div
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#9E1B32',
                        color: '#fff',
                        borderRadius: '5px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                    }}
                    onClick={() => window.close()}
                >
                    Close Page Now
                </div>
            </div>
        </div>
    );
};

export default VerificationSuccess
