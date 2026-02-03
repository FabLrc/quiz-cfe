"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, Send } from "lucide-react";

interface NavigationButtonsProps {
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  canProceed: boolean;
  isSubmitting?: boolean;
}

export function NavigationButtons({
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep,
  canProceed,
  isSubmitting = false,
}: NavigationButtonsProps) {
  return (
    <div className="flex items-center justify-between gap-4 pt-4">
      {/* Bouton Précédent */}
      <motion.button
        type="button"
        onClick={onPrevious}
        disabled={isFirstStep}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isFirstStep ? 0.5 : 1, x: 0 }}
        whileHover={!isFirstStep ? { scale: 1.02 } : undefined}
        whileTap={!isFirstStep ? { scale: 0.98 } : undefined}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium
          transition-all duration-200 border-2
          ${
            isFirstStep
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-gray-300 text-[#212529] hover:border-gray-400 hover:bg-gray-50"
          }
        `}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline text-sm">Précédent</span>
      </motion.button>

      {/* Bouton Suivant / Envoyer */}
      <motion.button
        type="button"
        onClick={onNext}
        disabled={!canProceed || isSubmitting}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={canProceed && !isSubmitting ? { scale: 1.02 } : undefined}
        whileTap={canProceed && !isSubmitting ? { scale: 0.98 } : undefined}
        className={`
          flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
          transition-all duration-200
          ${
            canProceed && !isSubmitting
              ? "bg-gradient-to-r from-[#FFB3B8] via-[#DC66DB] to-[#5B4FFC] text-white shadow-lg shadow-[#5B4FFC]/25 hover:shadow-xl hover:shadow-[#5B4FFC]/30"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }
        `}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Envoi...</span>
          </>
        ) : isLastStep ? (
          <>
            <Send className="w-4 h-4" />
            <span>Envoyer</span>
          </>
        ) : (
          <>
            <span>Suivant</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </motion.button>
    </div>
  );
}
