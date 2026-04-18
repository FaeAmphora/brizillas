"use client";

import { useState, useRef, useEffect } from "react";

const CITIES = [
  "Amsterdam","Athènes","Barcelone","Berlin","Bruxelles","Budapest","Copenhague","Dublin",
  "Édimbourg","Florence","Genève","Istanbul","Lisbonne","Londres","Madrid","Marrakech",
  "Milan","Moscou","Munich","Naples","Nice","Paris","Porto","Prague","Rome","Séville",
  "Stockholm","Vienne","Varsovie","Zurich",
  "Bali","Bangkok","Beijing","Dubaï","Hong Kong","Jakarta","Kyoto","Maldives","Mumbai",
  "New Delhi","Osaka","Séoul","Shanghai","Singapour","Taipei","Tokyo","Ho Chi Minh-Ville",
  "Cancún","La Havane","Mexico","Miami","Montréal","New York","Québec","Rio de Janeiro",
  "Buenos Aires","Bogotá","Lima","Santiago","São Paulo",
  "Le Caire","Casablanca","Nairobi","Johannesburg","Dakar","Abidjan","Tunis",
  "Sydney","Melbourne","Auckland","Honolulu","Los Angeles","San Francisco","Las Vegas","Chicago",
  "Agadir","Fès","Djerba","Zanzibar","Maurice","La Réunion","Phuket","Hanoï",
];

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  label: string;
  required?: boolean;
}

export default function CityAutocomplete({ value, onChange, placeholder, label, required }: Props) {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleInput(val: string) {
    onChange(val);
    if (val.length < 2) { setSuggestions([]); setOpen(false); return; }
    const q = val.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const matches = CITIES.filter(c =>
      c.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").startsWith(q)
    ).slice(0, 6);
    setSuggestions(matches);
    setOpen(matches.length > 0);
  }

  function select(city: string) {
    onChange(city);
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => handleInput(e.target.value)}
        onFocus={() => value.length >= 2 && suggestions.length > 0 && setOpen(true)}
        className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:outline-none focus:border-orange-400 text-stone-800 placeholder-stone-300 transition-colors bg-stone-50"
        required={required}
        autoComplete="off"
      />
      {open && (
        <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-stone-200 rounded-xl shadow-xl overflow-hidden">
          {suggestions.map(city => (
            <li key={city}>
              <button
                type="button"
                onMouseDown={() => select(city)}
                className="w-full text-left px-4 py-2.5 text-sm text-stone-700 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center gap-2"
              >
                <span className="text-stone-300">📍</span> {city}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
