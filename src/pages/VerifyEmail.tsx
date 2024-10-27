import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { AppDispatch,RootState } from '../redux/store/store';
import { verifyUserEmail } from '../redux/slices/authSlices'; // Ensure this import is correct
import toast from 'react-hot-toast';

const VerifyEmailForm: React.FC = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token') || ''; // Allow token to be empty
    const userId = searchParams.get('id');
    const codeFromParams = searchParams.get('code') || ''; // Get the code from params
    const dispatch = useDispatch<AppDispatch>();
    const [code, setCode] = useState<string[]>(Array(8).fill('')); // Array to hold each digit of the code
    const navigate = useNavigate(); // Hook for navigation

    const { user } = useSelector((state: RootState) => state.auth);

    // Effect to populate the code state from URL parameters
    useEffect(() => {
        if (codeFromParams.length === 8) {
            setCode(codeFromParams.split('')); // Fill the code state with individual characters
        }
    }, [codeFromParams]);

    const handleVerification = async (e: React.FormEvent) => {
        e.preventDefault();

        // Ensure userId is not null; handle token being empty as necessary
        if (!userId) {
            toast.error('Invalid verification link.');
            return;
        }

        // Join the code array into a string
        const verificationCode = code.join('');

        // Dispatch the verifyEmail action
        dispatch(verifyUserEmail({ id: userId, token, code: verificationCode }))
            .unwrap()
            .then(() => {
                // Assuming the response contains a success message or some user info
                // toast.success('Email verified successfully!');
                navigate('/'); // Redirect to login or another appropriate page
            })
            .catch((error) => {
                console.error('Verification error:', error);
                // toast.error(error || 'Verification failed. Please try again.');
            });
    };

    const handleInputChange = (value: string, index: number) => {
        // Update the code array at the specific index
        const updatedCode = [...code];
        updatedCode[index] = value;
        setCode(updatedCode);

        // Automatically move to the next input when a digit is entered
        if (value && index < 7) {
            const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement; // Type assertion
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    // Function to mask the email
    const maskEmail = (email: string | undefined) => {
        if (!email) return '';
        const [localPart, domain] = email.split('@');
        const maskedLocalPart = localPart.length > 4 ? `${localPart.slice(0, 4)}....` : localPart;
        return `${maskedLocalPart}@${domain}`;
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-lg border px-12 pt-8 pb-16 rounded-2xl m-12">
                <h2 className="text-3xl font-semibold mb-6 text-center">Verify your email</h2>
                <p className="text-center text-gray-600 mb-4 text-xs flex flex-col">
                    Enter the 8-digit code you have received on <span className="font-semibold">{maskEmail(user?.email)}</span>
                </p>
                <form onSubmit={handleVerification}>
                    <div className="flex flex-col justify-center mb-4">
                        <p className='text-gray-600 text-sm'>Code</p>
                        <div className='flex justify-between space-x-2 mb-4'>
                            {Array.from({ length: 8 }).map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    data-index={index} // Use data-index to reference the input
                                    value={code[index]} // Controlled input
                                    onChange={(e) => handleInputChange(e.target.value, index)} // Handle input change
                                    className="w-10 h-10 text-center border border-gray-300 rounded-md focus:outline-none"
                                />
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="w-full py-3 bg-black text-white rounded-md font-medium">
                        VERIFY
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyEmailForm;