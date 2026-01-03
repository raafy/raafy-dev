"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Mail, User, Phone, MessageSquare, Send, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface ContactFormProps {
  messages: {
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
    };
    validation: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      subjectRequired: string;
      messageRequired: string;
    };
    toast: {
      success: string;
      error: string;
    };
  };
}

export function ContactForm({ messages: t }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t.validation.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.validation.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.validation.emailInvalid;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t.validation.subjectRequired;
    }

    if (!formData.message.trim()) {
      newErrors.message = t.validation.messageRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(t.toast.success);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setErrors({});
      } else {
        toast.error(data.error || t.toast.error);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(t.toast.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <User size={16} />
          {t.form.name} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t.form.namePlaceholder}
          className={`w-full rounded-lg border ${
            errors.name
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-gray-900 focus:ring-gray-900 dark:border-white/20 dark:focus:border-white dark:focus:ring-white"
          } bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 dark:bg-black dark:text-white dark:placeholder-gray-400`}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-500">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <Mail size={16} />
          {t.form.email} <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t.form.emailPlaceholder}
          className={`w-full rounded-lg border ${
            errors.email
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-gray-900 focus:ring-gray-900 dark:border-white/20 dark:focus:border-white dark:focus:ring-white"
          } bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 dark:bg-black dark:text-white dark:placeholder-gray-400`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label
          htmlFor="phone"
          className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <Phone size={16} />
          {t.form.phone}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder={t.form.phonePlaceholder}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:border-white/20 dark:bg-black dark:text-white dark:placeholder-gray-400 dark:focus:border-white dark:focus:ring-white"
        />
      </div>

      {/* Subject Field */}
      <div>
        <label
          htmlFor="subject"
          className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <MessageSquare size={16} />
          {t.form.subject} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder={t.form.subjectPlaceholder}
          className={`w-full rounded-lg border ${
            errors.subject
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-gray-900 focus:ring-gray-900 dark:border-white/20 dark:focus:border-white dark:focus:ring-white"
          } bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 dark:bg-black dark:text-white dark:placeholder-gray-400`}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-sm text-red-500">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <MessageSquare size={16} />
          {t.form.message} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t.form.messagePlaceholder}
          rows={6}
          className={`w-full resize-none rounded-lg border ${
            errors.message
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-gray-900 focus:ring-gray-900 dark:border-white/20 dark:focus:border-white dark:focus:ring-white"
          } bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 dark:bg-black dark:text-white dark:placeholder-gray-400`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-500">
            {errors.message}
          </p>
        )}
      </div>

      {/* Turnstile Widget Placeholder */}
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
        <div id="turnstile-widget" className="flex justify-center" />
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gray-900 to-gray-700 px-6 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 dark:from-white dark:to-gray-300 dark:text-black"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            {t.form.submitting}
          </>
        ) : (
          <>
            {t.form.submit}
            <Send
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </>
        )}
      </motion.button>
    </motion.form>
  );
}
