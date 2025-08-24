import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
    // Hook to programmatically navigate the user
    const navigate = useNavigate();

    // State for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // State for loading and error messages
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // This function is called when the form is submitted
    const handleLogin = async (event) => {
        // Prevent the default form submission which causes a page reload
        event.preventDefault();

        // Reset previous errors and set loading state
        setError(null);
        setLoading(true);

        try {
            // Make a POST request to the Laravel login endpoint
            const response = await axios.post('http://localhost:8000/api/login', {
                email: email,
                password: password,
            });

            // Assuming the API returns an access_token and user data on success
            const { access_token, user } = response.data;

            // Store the token and user info in localStorage for session persistence
            // In a production app, consider more secure storage like HttpOnly cookies
            localStorage.setItem('authToken', access_token);
            localStorage.setItem('user', JSON.stringify(user));

            // Redirect the user to the dashboard after a successful login
            navigate('/dashboard');

        } catch (err) {
            // Handle login errors (e.g., wrong credentials)
            console.error("Login failed:", err);
            if (err.response && err.response.status === 422) {
                // Handle validation errors from Laravel
                setError("The provided credentials do not match our records.");
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            // Reset loading state regardless of outcome
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back!</h2>
                <p className="text-center text-gray-500 mb-8">Sign in to continue to ProjectPilot</p>

                {/* The onSubmit event on the form is the key to triggering the login logic */}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email} // Bind the input value to the state
                            onChange={(e) => setEmail(e.target.value)} // Update state on change
                            required // HTML5 form validation
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            id="password"
                            type="password"
                            placeholder="******************"
                            value={password} // Bind the input value to the state
                            onChange={(e) => setPassword(e.target.value)} // Update state on change
                            required // HTML5 form validation
                        />
                    </div>

                    {/* Display error message if login fails */}
                    {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

                    <div className="flex items-center justify-between">
                        {/* We use a button of type "submit" to trigger the form's onSubmit event */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center disabled:bg-indigo-400"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </div>
                    <p className="text-center text-gray-500 text-sm mt-6">
                        Don't have an account? <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-800">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}