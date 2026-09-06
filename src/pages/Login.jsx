import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

import {
  Mail,
  Lock,
  LogIn,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Normal Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        form
      );

      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Google Login
  const handleGoogleLogin = async (credentialResponse) => {
    console.log(credentialResponse);

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/google`,
        {
          credential: credentialResponse.credential,
        }
      );

      login(res.data.user, res.data.token);
      navigate('/');
    } catch (error) {
      console.log('Google Login Failed', error);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-16 sm:py-24">

      <div className="text-center mb-8">

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          Welcome back
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Log in to your ProfileIQ account
        </p>

      </div>

      <div className="glass-strong rounded-3xl p-6 sm:p-8 shadow-2xl">

        {error && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>

            <label>Email</label>

            <div className="relative">

              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />

              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 py-3 rounded-xl border"
              />

            </div>

          </div>

          {/* Password */}
          <div>

            <label>Password</label>

            <div className="relative">

              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />

              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 rounded-xl border"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>

            </div>

          </div>

          {/* Normal Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#00072D] hover:bg-[#182C61] text-white transition-colors duration-200"
          >

            {loading ? (
              <Loader2 className="animate-spin mx-auto" />
            ) : (
              <>
                <LogIn className="inline mr-2" />
                Log In
              </>
            )}

          </button>

        </form>

        {/* Google Login */}
        <div className="my-5 text-center">

          <p className="mb-3 text-gray-500">
            OR
          </p>

          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.log('Google Login Failed');
            }}
          />

        </div>

        <p className="mt-6 text-center text-sm">

          Don't have an account?{' '}

          <Link
            to="/signup"
            className="text-[#00072D] font-semibold"
          >
            Sign up
          </Link>

        </p>

      </div>

    </div>
  );
}