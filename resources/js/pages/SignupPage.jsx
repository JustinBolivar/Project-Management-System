import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignupPage() {
    // Hook to programmatically navigate the user
    const navigate = useNavigate();

    // State for form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    // State for loading and error messages
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // This function is called when the form is submitted
    const handleSignup = async (event) => {
        // Prevent the default form submission which causes a page reload
        event.preventDefault();

        // Basic client-side validation for password match
        if (password !== passwordConfirmation) {
            setError("Passwords do not match.");
            return;
        }

        // Reset previous errors and set loading state
        setError(null);
        setLoading(true);

        try {
            // Make a POST request to the Laravel registration endpoint
            await axios.post('http://localhost:8000/api/register', {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
            });

            // Redirect the user to the login page after a successful registration
            // You could also automatically log them in if your API returns a token here.
            navigate('/login');

        } catch (err) {
            // Handle registration errors
            console.error("Registration failed:", err.response);
            if (err.response && err.response.status === 422) {
                // Handle validation errors from Laravel (e.g., email already taken)
                // We'll flatten the errors object into a single string for display.
                const messages = Object.values(err.response.data.errors).flat().join(' ');
                setError(messages);
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
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Your Account</h2>
                <p className="text-center text-gray-500 mb-8">Get started with ProjectCtrl today</p>

                {/* The onSubmit event on the form is the key to triggering the signup logic */}
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            id="password"
                            type="password"
                            placeholder="******************"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password_confirmation">
                            Confirm Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            id="password_confirmation"
                            type="password"
                            placeholder="******************"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                        />
                    </div>

                    {/* Display error message if registration fails */}
                    {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center disabled:bg-indigo-400"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </div>
                    <p className="text-center text-gray-500 text-sm mt-6">
                        Already have an account? <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-800">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}