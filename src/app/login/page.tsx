"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
      {/* Animated gradient blur circles */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] bg-indigo-500 rounded-full blur-3xl opacity-30 top-[-100px] left-[-150px]"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, -360, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
        className="absolute w-[400px] h-[400px] bg-pink-400 rounded-full blur-3xl opacity-25 bottom-[-120px] right-[-100px]"
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-96 border border-white/20"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-center text-white mb-6"
        >
          Welcome Back 👋
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="mb-4">
            <label className="block text-sm text-gray-200 mb-1" htmlFor="email">
              Email
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm text-gray-200 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
              required
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-300 text-sm mb-2"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            type="submit"
            className={`w-full mt-2 py-3 rounded-lg text-white font-semibold transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 shadow-lg shadow-indigo-400/30 cursor-pointer"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm text-center text-gray-300 mt-5"
          >
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-pink-300 hover:underline font-medium"
            >
              Sign Up
            </a>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
