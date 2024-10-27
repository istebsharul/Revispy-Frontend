import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store/store'; // Make sure to import the correct paths
import { login } from '../redux/slices/authSlices'; // Action that handles API call within the slice
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if(!email){
      toast.error('Enter email to contiue!');
      return;
    }

    if(!password){
      toast.error('Enter password to continue!');
      return;
    }


    // Dispatch the login action
    dispatch(login({ email, password }))
        .unwrap()
        .then((response) => {
            // If the login is successful
            console.log(response);
            setEmail(''); // Clear the email field
            setPassword(''); // Clear the password field
            navigate('/'); // Navigate to home page
        })
        .catch((error) => {
            console.error('Login error:', error); // Optional: log the error for debugging
        });
};

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white border px-12 pt-8 pb-16 rounded-2xl m-12">
        <h2 className="text-3xl font-bold mb-7 text-center">Login</h2>
        <p className="text-center text-gray-600 mb-2">Welcome back to ECOMMERCE</p>
        <p className="text-center text-gray-600 mb-2 text-xs">The next-gen business marketplace</p>
        

        <form className="space-y-6 border-b py-6" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-md font-medium"
          >
            LOGIN
          </button>
        </form>

        {isAuthenticated ? (
          <p className="mt-4 text-center text-xs text-gray-500">
            Welcome, {user?.name}!
          </p>
        ) : (
          <p className="mt-4 text-center text-xs text-gray-500">
            Don't have an Account? <a href="/register" className="text-black font-medium">SIGN UP</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;