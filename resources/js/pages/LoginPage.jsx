import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back!</h2>
                <p className="text-center text-gray-500 mb-8">Sign in to continue to ProjectPilot</p>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            id="email"
                            type="email"
                            placeholder="you@example.com"
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
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        {/* Use Link from react-router-dom to navigate without a page reload */}
                        <Link to="/dashboard" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center">
                            Sign In
                        </Link>
                    </div>
                    <p className="text-center text-gray-500 text-sm mt-6">
                        Don't have an account? <a href="#" className="font-bold text-indigo-600 hover:text-indigo-800">Sign Up</a>
                    </p>
                </form>
            </div>
        </div>
    );
}