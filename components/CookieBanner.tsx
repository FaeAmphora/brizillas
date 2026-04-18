"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  }

  function refuse() {
    localStorage.setItem("cookie_consent", "refused");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1625] border-t border-white/10 px-4 py-4 shadow-2xl">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-white/80 text-sm flex-1 leading-relaxed">
          🍪 Nous utilisons des cookies pour les liens affiliés et l'analyse du trafic.{" "}
          <Link href="/politique-confidentialite" className="underline text-orange-300 hover:text-orange-200">
            En savoir plus
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={refuse}
            className="px-4 py-2 rounded-xl border border-white/20 text-white/60 hover:text-white text-sm transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
