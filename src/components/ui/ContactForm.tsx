"use client";

import { motion } from "framer-motion";
import React, { useImperativeHandle, useState, forwardRef } from "react";
import type { ContactField } from "@/config/questions";
import type { ContactFormData } from "@/types/quiz";

interface ContactFormProps {
  fields: ContactField[];
  value: ContactFormData;
  onChange: (data: ContactFormData) => void;
}

export type ContactFormHandle = {
  validate: () => boolean;
};

export const ContactForm = forwardRef<ContactFormHandle, ContactFormProps>(
  ({ fields, value, onChange }, ref) => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateEmail = (email: string) => {
      return /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
    };

    const validatePhone = (phone: string) => {
      if (!phone) return true;
      return /^[0-9 +\-()]{6,20}$/.test(phone);
    };

    function validateField(field: ContactField, val: string) {
      if (field.required && !val?.trim()) {
        return `${field.label} est requis`;
      }

      if (field.type === "email" && val) {
        if (!validateEmail(val)) return "Format d'email invalide";
      }

      if (field.type === "tel" && val) {
        if (!validatePhone(val)) return "Format de téléphone invalide";
      }

      return "";
    }

    function validateAll() {
      const newErrors: Record<string, string> = {};
      for (const field of fields) {
        const val = String(value[field.id as keyof ContactFormData] ?? "");
        const err = validateField(field, val);
        if (err) newErrors[field.id] = err;
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    useImperativeHandle(ref, () => ({
      validate: validateAll,
    }));

    const handleFieldChange = (fieldId: string, fieldValue: string) => {
      // clear field error on change
      setErrors((prev) => ({ ...prev, [fieldId]: "" }));
      onChange({
        ...value,
        [fieldId]: fieldValue,
      });
    };

    const handleBlur = (field: ContactField) => {
      const val = String(value[field.id as keyof ContactFormData] ?? "");
      const err = validateField(field, val);
      setErrors((prev) => ({ ...prev, [field.id]: err }));
    };

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fields.map((field, index) => {
          const isFullWidth = field.type === "textarea" || field.type === "email";
          const currentValue = (value[field.id as keyof ContactFormData] ?? "") as string;
          const error = errors[field.id];

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
                  onBlur={() => handleBlur(field)}
                  placeholder={field.placeholder}
                  rows={3}
                  className={`
                    w-full px-3 py-2 rounded-xl border-2 text-sm
                    focus:border-[#5B4FFC] focus:ring-4 focus:ring-[#5B4FFC]/10
                    outline-none transition-all duration-200
                    placeholder:text-gray-400 text-[#212529]
                    resize-none
                    ${error ? "border-red-500" : "border-gray-200"}
                  `}
                />
              ) : (
                <input
                  id={field.id}
                  type={field.type}
                  value={currentValue}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  onBlur={() => handleBlur(field)}
                  placeholder={field.placeholder}
                  className={`
                    w-full px-3 py-2 rounded-xl border-2 text-sm
                    focus:border-[#5B4FFC] focus:ring-4 focus:ring-[#5B4FFC]/10
                    outline-none transition-all duration-200
                    placeholder:text-gray-400 text-[#212529]
                    ${error ? "border-red-500" : "border-gray-200"}
                  `}
                />
              )}

              {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
            </motion.div>
          );
        })}
      </div>
    );
  }
);

ContactForm.displayName = "ContactForm";
