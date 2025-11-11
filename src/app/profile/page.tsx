"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface User {
  username: string;
  email: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/me", { method: "POST" });
        const data = await res.json();

        if (res.ok) setUser(data.data);
        else router.push("/login");
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    router.push("/logout");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
      {/* Floating Background Blurs */}
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

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-96 border border-white/20 text-center"
      >
        {loading ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white text-lg"
          >
            Loading user...
          </motion.p>
        ) : user ? (
          <>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-white mb-4"
            >
              Welcome, {user.username} 👋
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-200 mb-6"
            >
              {user.email}
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold py-3 rounded-lg hover:from-pink-600 hover:to-indigo-600 transition-all shadow-lg shadow-indigo-400/30 cursor-pointer"
            >
              Logout
            </motion.button>
          </>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-300 text-lg"
          >
            Failed to load user data.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default ProfilePage;
