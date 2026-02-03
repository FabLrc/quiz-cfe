"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";

export function Header() {
  return (
    <header className="w-full py-3 px-6 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="https://cf-evolution.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <Image
            src="/logo.webp"
            alt="CF Evolution"
            width={180}
            height={50}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Bouton Contacter un expert */}
        <a
          href="tel:+33622350579"
          className="
            flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
            bg-gradient-to-r from-[#FFB3B8] via-[#DC66DB] to-[#5B4FFC] text-white
            hover:shadow-lg hover:shadow-[#5B4FFC]/25
            transition-all duration-200
          "
        >
          <Phone className="w-4 h-4" />
          <span className="hidden sm:inline">Contacter un expert</span>
          <span className="sm:hidden">Appeler</span>
        </a>
      </div>
    </header>
  );
}
