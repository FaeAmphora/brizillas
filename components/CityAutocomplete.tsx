"use client";

import { useState, useRef, useEffect } from "react";

const CITIES = [
  // Europe
  "Amsterdam","Athènes","Barcelone","Belgrade","Berlin","Bilbao","Bordeaux","Bruxelles",
  "Budapest","Bucarest","Cologne","Copenhague","Cracovie","Dublin","Édimbourg","Florence",
  "Francfort","Genève","Grenoble","Helsinki","Istanbul","Kiev","Krakow","Lisbonne","Ljubljana",
  "Londres","Luxembourg","Lyon","Madrid","Malaga","Malte","Marrakech","Marseille","Milan",
  "Monaco","Moscou","Munich","Naples","Nice","Oslo","Palermo","Paris","Porto","Prague",
  "Reykjavik","Rome","Rotterdam","Saint-Pétersbourg","Salzbourg","Sarajevo","Séville",
  "Sofia","Stockholm","Strasbourg","Tallinn","Thessalonique","Toulouse","Valence","Varsovie",
  "Venise","Vienne","Vilnius","Zagreb","Zurich","Dubrovnik","Split","Santorin","Mykonos",
  "Rhodes","Ibiza","Majorque","Ténérife","Gran Canaria","Fuerteventura","Lanzarote",
  // Afrique & Moyen-Orient
  "Abidjan","Abu Dhabi","Accra","Agadir","Alexandrie","Alger","Amman","Beyrouth","Casablanca",
  "Dakar","Djerba","Douala","Dubaï","Fès","Hurghada","Johannesburg","Lagos","Le Caire",
  "Louxor","Marrakech","Maurice","Nairobi","Oman","Rabat","Sharm el-Sheikh","Tanger","Tunis",
  "Zanzibar","La Réunion","Djibouti","Addis-Abeba","Kigali","Dar es Salaam",
  // Asie
  "Bali","Bangkok","Beijing","Bhoutan","Calcutta","Chennai","Chiang Mai","Colombo","Delhi",
  "Doha","Goa","Hanoi","Ho Chi Minh-Ville","Hong Kong","Jakarta","Karachi","Katmandou",
  "Koh Samui","Kuala Lumpur","Kyoto","Lahore","Luang Prabang","Maldives","Manille","Mumbai",
  "Myanmar","Nagoya","Osaka","Pékin","Phnom Penh","Phuket","Sapporo","Séoul","Shanghai",
  "Siem Reap","Singapour","Taipei","Tokyo","Ulaanbaatar","Yangon","Hiroshima","Nara",
  // Amériques
  "Bogotá","Buenos Aires","Cancún","Cartagena","Chicago","La Havane","Lima","Los Angeles",
  "Medellín","Mexico","Miami","Montréal","New York","Oahu","Panamá","Québec","Quito",
  "Rio de Janeiro","San Francisco","San José","Santiago","São Paulo","Toronto","Vancouver",
  "Las Vegas","Orlando","Washington","Boston","Seattle","Denver","Honolulu","Antigua",
  "Barbade","Jamaïque","Trinidad","Saint-Martin","Guadeloupe","Martinique","Saint-Barthélemy",
  // Océanie & Pacifique
  "Auckland","Brisbane","Fidji","Melbourne","Nouvelle-Calédonie","Perth","Polynésie française",
  "Sydney","Tahiti","Wellington",
  // France (villes de départ courantes)
  "Bordeaux","Brest","Clermont-Ferrand","Dijon","Grenoble","Lille","Lyon","Marseille",
  "Montpellier","Nantes","Nice","Paris","Rennes","Rouen","Strasbourg","Toulouse",
];

const UNIQUE_CITIES = [...new Set(CITIES)].sort();

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

  function normalize(s: string) {
    return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function handleInput(val: string) {
    onChange(val);
    if (val.length < 2) { setSuggestions([]); setOpen(false); return; }
    const q = normalize(val);
    const starts = UNIQUE_CITIES.filter(c => normalize(c).startsWith(q));
    const contains = UNIQUE_CITIES.filter(c => !normalize(c).startsWith(q) && normalize(c).includes(q));
    const matches = [...starts, ...contains].slice(0, 8);
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
