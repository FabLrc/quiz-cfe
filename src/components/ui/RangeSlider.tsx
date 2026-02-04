"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  minLabel: string;
  maxLabel: string;
  value: number;
  onChange: (value: number) => void;
}

export function RangeSlider({
  min,
  max,
  step,
  minLabel,
  maxLabel,
  value,
  onChange,
}: RangeSliderProps) {
  const [currentValue, setCurrentValue] = useState(value || min);

  useEffect(() => {
    if (value !== undefined && value !== currentValue) {
      setCurrentValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setCurrentValue(newValue);
    onChange(newValue);
  };

  const formatValue = (val: number) => {
    if (val === min) return minLabel;
    if (val === max) return maxLabel;
    return `${val.toLocaleString("fr-FR")}€`;
  };

  const percentage = ((currentValue - min) / (max - min)) * 100;

  // Calcul des paliers (5k, 10k, 15k, 20k, 25k, 30k, 35k, 40k, 45k, 50k)
  const milestones = [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full px-4 py-6"
    >
      {/* Valeur actuelle */}
      <div className="text-center mb-8">
        <div className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFB3B8] via-[#DC66DB] to-[#5B4FFC] text-white font-bold text-2xl shadow-lg transition-all duration-150">
          {formatValue(currentValue)}
        </div>
      </div>

      {/* Slider */}
      <div className="relative pb-8">
        {/* Track de fond */}
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          {/* Track coloré */}
          <motion.div
            className="h-full bg-gradient-to-r from-[#FFB3B8] via-[#DC66DB] to-[#5B4FFC]"
            style={{ width: `${percentage}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Indicateurs de paliers */}
        {milestones.map((milestone) => {
          const milestonePercentage = ((milestone - min) / (max - min)) * 100;
          return (
            <div
              key={milestone}
              className="absolute top-0 flex flex-col items-center pointer-events-none"
              style={{ left: `${milestonePercentage}%` }}
            >
              {/* Tick mark */}
              <div className="w-0.5 h-4 bg-gray-300" />
              {/* Label */}
              <span className="text-xs text-[#212529]/50 mt-1 whitespace-nowrap">
                {milestone / 1000}k
              </span>
            </div>
          );
        })}

        {/* Input range - zone cliquable élargie */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-8 opacity-0 cursor-pointer z-10"
        />

        {/* Thumb personnalisé */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-4 border-[#5B4FFC] shadow-lg pointer-events-none z-20"
          style={{ left: `calc(${percentage}% - 12px)` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Labels min/max */}
      <div className="flex justify-between mt-4 text-sm text-[#212529]/60">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </motion.div>
  );
}
