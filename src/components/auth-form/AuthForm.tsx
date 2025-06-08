import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { fetchWithoutAuth } from '../../utils/api';

export default function AuthForm({ type }: { type: 'login' | 'register' }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        try {
            const endpoint = type === 'login' ? '/auth/login' : '/auth/register';
            const data = await fetchWithoutAuth(endpoint, {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            console.log(data);

            if (type === 'login') {
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            } else {
                navigate('/');
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred');
        }
    }

    return (
        <div className="min-h-screen min-w-100 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                <div>
                    <h1 className="mt-6 text-4xl font-extrabold text-blue-300 text-center">
                        {'URL Shortner'}
                    </h1>
                </div>
                <div>
                    <h2 className="mt-6 text-4xl font-extrabold text-gray-900 text-center">
                        {type === 'login' ? 'Login' : 'Create Account'}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {type === 'login' ? 'Sign in to your account' : 'Join us today'}
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    id="email"
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    id="password"
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="e-300 group relative w-full flex justify-center py-3 px-4 border border-transparentborder-bledium rounded-lg text-black bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:scale-[1.02]"
                        >
                            {type === 'login' ? 'Sign In' : 'Create Account'}
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        {type === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                        <Link
                            to={type === 'login' ? '/register' : '/'}
                            className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-150"
                        >
                            {type === 'login' ? 'Sign up' : 'Sign in'}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
