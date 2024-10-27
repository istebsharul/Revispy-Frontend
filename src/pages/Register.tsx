import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../redux/slices/authSlices';
import { AppDispatch } from '../redux/store/store';
import toast from 'react-hot-toast';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    // State for form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name) {
            toast.error('Enter name to continue!');
            return;
        }

        if (!email) {
            toast.error('Enter email to contiue!');
            return;
        }

        if (!password) {
            toast.error('Enter password to continue!');
            return;
        }

        dispatch(register({ name, email, password }))
            .unwrap()
            .then((response) => {
                // console.log(response);
                setName('');
                setPassword('');
                setEmail('');
                navigate(`/verify-email?id=${response._id}`)
            })
            .catch((error) => {
                console.error('Register error:', error);
            })
    };

    return (
        <div className="h-max flex flex-col items-center justify-center p-4">
            <div className="w-full h-full max-w-lg bg-white border px-12 pt-8 pb-16 rounded-2xl m-12">
                <h2 className="text-3xl font-semibold mb-6 text-center">Create your account</h2>
                <form className='space-y-6 border-b pb-6' onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            placeholder="Enter"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Enter"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Enter"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-black text-white rounded-md font-light text-sm">
                        CREATE ACCOUNT
                    </button>
                </form>
                <p className="mt-4 text-center text-xs space-x-4 font-light">
                    Have an Account? <a href="/login" className="text-black font-medium">LOGIN</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
