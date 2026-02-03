"use client";

import { motion } from "framer-motion";
import type { ContactField } from "@/config/questions";
import type { ContactFormData } from "@/types/quiz";

interface ContactFormProps {
  fields: ContactField[];
  value: ContactFormData;
  onChange: (data: ContactFormData) => void;
}

export function ContactForm({ fields, value, onChange }: ContactFormProps) {
  const handleFieldChange = (fieldId: string, fieldValue: string) => {
    onChange({
      ...value,
      [fieldId]: fieldValue,
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {fields.map((field, index) => {
        const isFullWidth = field.type === "textarea" || field.type === "email";
        const currentValue = value[field.id as keyof ContactFormData] ?? "";

        return (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={isFullWidth ? "sm:col-span-2" : ""}
          >
            <label
              htmlFor={field.id}
              className="block text-xs font-medium text-[#212529] mb-1.5"
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={field.id}
                value={currentValue}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                rows={3}
                className="
                  w-full px-3 py-2 rounded-xl border-2 border-gray-200 text-sm
                  focus:border-[#5B4FFC] focus:ring-4 focus:ring-[#5B4FFC]/10
                  outline-none transition-all duration-200
                  placeholder:text-gray-400 text-[#212529]
                  resize-none
                "
              />
            ) : (
              <input
                id={field.id}
                type={field.type}
                value={currentValue}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                className="
                  w-full px-3 py-2 rounded-xl border-2 border-gray-200 text-sm
                  focus:border-[#5B4FFC] focus:ring-4 focus:ring-[#5B4FFC]/10
                  outline-none transition-all duration-200
                  placeholder:text-gray-400 text-[#212529]
                "
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
