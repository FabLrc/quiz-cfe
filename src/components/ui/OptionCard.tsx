"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

interface OptionCardProps {
  id: string;
  label: string;
  description?: string;
  icon: LucideIcon;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

export function OptionCard({
  label,
  description,
  icon: Icon,
  isSelected,
  onClick,
  index,
}: OptionCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative w-full p-3 rounded-xl border-2 transition-all duration-200
        text-left cursor-pointer group
        ${
          isSelected
            ? "border-[#5B4FFC] bg-gradient-to-br from-[#FFB3B8]/5 via-[#DC66DB]/5 to-[#5B4FFC]/5 shadow-lg shadow-[#5B4FFC]/10"
            : "border-gray-200 bg-white hover:border-[#5B4FFC]/50 hover:shadow-md"
        }
      `}
    >
      {/* Indicateur de sélection */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gradient-to-r from-[#FFB3B8] via-[#DC66DB] to-[#5B4FFC] flex items-center justify-center"
        >
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        </motion.div>
      )}

      <div className="flex items-start gap-4">
        {/* Icône */}
        <div
          className={`
            flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center
            transition-all duration-200
            ${
              isSelected
                ? "bg-gradient-to-r from-[#FFB3B8] via-[#DC66DB] to-[#5B4FFC] text-white"
                : "bg-gray-100 text-[#212529]/60 group-hover:bg-[#5B4FFC]/10 group-hover:text-[#5B4FFC]"
            }
          `}
        >
          <Icon className="w-6 h-6" />
        </div>

        {/* Contenu */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-base transition-colors ${
              isSelected ? "text-[#5B4FFC]" : "text-[#212529]"
            }`}
          >
            {label}
          </h3>
          {description && (
            <p className="text-sm text-[#212529]/60 mt-1">{description}</p>
          )}
        </div>
      </div>
    </motion.button>
  );
}
