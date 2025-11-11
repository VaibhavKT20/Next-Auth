"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const LogoutPage: React.FC = () => {
  const router = useRouter();
  const [message, setMessage] = useState("Logging out...");

  useEffect(() => {
    const logout = async () => {
      try {
        const res = await fetch("/api/users/logout", {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Logout failed");

        setMessage("You have been logged out successfully!");
        setTimeout(() => router.push("/login"), 2000);
      } catch (err: any) {
        setMessage("Error logging out: " + err.message);
      }
    };

    logout();
  }, [router]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
      {/* Floating background orbs */}
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

      {/* Logout Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-10 w-96 border border-white/20 text-center"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-white mb-6 "
        >
          Logging Out...
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-200 text-lg mb-8">{message}</p>

          {/* Animated Spinner */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="mx-auto mb-4 w-10 h-10 border-4 border-white border-t-transparent rounded-full"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-sm text-gray-300"
          >
            Redirecting to login...
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LogoutPage;
