"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
      {/* Animated Background Blobs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] bg-indigo-400/40 rounded-full blur-3xl top-[-100px] left-[-150px]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.3, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] bg-pink-400/40 rounded-full blur-3xl bottom-[-150px] right-[-100px]"
      />

      {/* Center Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-10 md:p-14 w-[90%] max-w-lg"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-extrabold text-white mb-4 tracking-tight"
        >
          Welcome to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-indigo-200 to-purple-200">
            Next Auth App
          </span>{" "}
          ✨
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-200/90 text-lg md:text-xl mb-10 max-w-md leading-relaxed"
        >
          Secure, elegant, and lightning-fast authentication powered by{" "}
          <span className="text-white font-medium">Next.js</span> and{" "}
          <span className="text-white font-medium">Tailwind CSS</span>.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-5 justify-center"
        >
          <motion.a
            href="/login"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:from-pink-600 hover:to-indigo-600 transition-all duration-300"
          >
            Login
          </motion.a>

          <motion.a
            href="/signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-white/30 text-white font-semibold px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
          >
            Sign Up
          </motion.a>
        </motion.div>

        {/* Decorative Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 h-[1px] w-2/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-gray-300/70 text-sm mt-4"
        >
          Crafted with ❤️ using Next.js 15 & Tailwind CSS
        </motion.p>
      </motion.div>
    </div>
  );
}
