"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface SuccessScreenProps {
  onReset: () => void;
}

export function SuccessScreen({ onReset }: SuccessScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center px-4 py-12"
    >
      {/* Animation de succès */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        className="relative"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#FFB3B8] via-[#DC66DB] to-[#5B4FFC] flex items-center justify-center">
          <CheckCircle2 className="w-14 h-14 text-white" strokeWidth={2} />
        </div>
        
        {/* Particules décoratives */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-2 -right-2"
        >
          <Sparkles className="w-8 h-8 text-[#DC66DB]" />
        </motion.div>
      </motion.div>

      {/* Titre */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl md:text-3xl font-bold text-[#212529] mt-8"
      >
        Demande envoyée avec succès !
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-[#212529]/70 mt-4 max-w-md text-lg"
      >
        Merci pour votre confiance ! Notre équipe analyse votre projet et vous 
        recontactera sous <span className="font-semibold text-[#5B4FFC]">24 heures</span>.
      </motion.p>

      {/* Boutons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 mt-8"
      >
        <Link
          href="https://cf-evolution.com"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
            bg-gradient-to-r from-[#FFB3B8] via-[#DC66DB] to-[#5B4FFC] text-white font-semibold
            shadow-lg shadow-[#5B4FFC]/25 hover:shadow-xl hover:shadow-[#5B4FFC]/30
            transition-all duration-200
          "
        >
          Visiter CF Evolution
          <ArrowRight className="w-5 h-5" />
        </Link>

        <button
          type="button"
          onClick={onReset}
          className="
            inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
            border-2 border-gray-300 text-[#212529] font-medium
            hover:border-gray-400 hover:bg-gray-50
            transition-all duration-200
          "
        >
          Nouvelle demande
        </button>
      </motion.div>
    </motion.div>
  );
}
