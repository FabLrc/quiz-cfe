"use client";

import { motion } from "framer-motion";

interface ProgressLineProps {
  progress: number;
  currentStep: number;
  totalSteps: number;
}

export function ProgressLine({
  progress,
  currentStep,
  totalSteps,
}: ProgressLineProps) {
  return (
    <div className="w-full">
      {/* Barre de progression */}
      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#FFB3B8] via-[#DC66DB] to-[#5B4FFC]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Indicateur d'étape */}
      <div className="flex justify-between items-center mt-3">
        <span className="text-sm text-[#212529]/70">
          Étape {currentStep + 1} sur {totalSteps}
        </span>
        <span className="text-sm font-medium text-[#5B4FFC]">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
