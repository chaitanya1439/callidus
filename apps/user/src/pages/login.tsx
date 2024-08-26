import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

const Login: React.FC = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const BACKEND_URL = "http://localhost:3001"; 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = (event.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const password = (event.currentTarget.elements.namedItem('password') as HTMLInputElement).value;

    try {
      const response = await axios.post(
        `${BACKEND_URL}/v1/user/login`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        router.push('/home');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  // Handle Google OAuth
  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/v1/user/google`;
  };

  // Redirect to the worker project
  const handleRedirect = () => {
    window.location.href = 'http://localhost:3002/register';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-950">Sign in to Shelteric</h2>
        <p className="text-center mb-6 text-gray-950">Welcome back! Please sign in to continue</p>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={handleGoogleLogin}
          >
            Google
          </button>
          <button type="button" className="bg-blue-600 text-white py-2 px-4 rounded">
            Facebook
          </button>
          <button type="button" className="bg-black text-white py-2 px-4 rounded">
            Apple
          </button>
        </div>
        <div className="flex items-center justify-center mb-6">
          <span className="border-t border-gray-300 flex-grow"></span>
          <span className="mx-4 text-gray-500">or</span>
          <span className="border-t border-gray-300 flex-grow"></span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-950"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-950"
              placeholder="Enter your password"
              required
            />
          </div>
          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Continue
          </button>
        </form>
        <p className="text-center mt-6 text-gray-950">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
        <button
          type="button"
          onClick={handleRedirect}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mt-4"
        >
          Collaboration
        </button>
      </div>
    </div>
  );
};

export default Login;
