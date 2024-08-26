import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Signup: React.FC = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const BACKEND_URL = "http://localhost:3001"; 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      name: (event.currentTarget.elements.namedItem('name') as HTMLInputElement).value,
      email: (event.currentTarget.elements.namedItem('email') as HTMLInputElement).value,
      password: (event.currentTarget.elements.namedItem('password') as HTMLInputElement).value,
    };

    try {
      const response = await axios.post(`${BACKEND_URL}/v1/user/register`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        router.push('/home');
      }
    } catch (error: unknown) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${BACKEND_URL}/v1/user/google/secrets`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-950">Create your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-3 py-2 border rounded-lg text-gray-950"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded-lg text-gray-950"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border rounded-lg text-gray-950"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Continue
          </button>
        </form>
        {errorMessage && <p className="text-red-500 mt-4 text-center">{errorMessage}</p>}
        <div className="text-center mt-4 text-gray-950">
          <div className="flex items-center justify-center mb-6">
            <span className="border-t border-gray-300 flex-grow"></span>
            <span className="mx-4 text-gray-500">or</span>
            <span className="border-t border-gray-300 flex-grow"></span>
          </div>
          <button
            className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 mt-2 flex items-center justify-center"
            onClick={handleGoogleSignIn}
          >
            Sign up with Google
          </button>
          {/* Additional buttons for other providers can be added similarly */}
        </div>
        <div className="text-center mt-4 text-gray-950">
          <p>Already have an account? <Link href="/login" className="text-blue-500">Log in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
