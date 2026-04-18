"use client";

import { useState, useEffect, useRef } from "react";
import ItineraryResult from "@/components/ItineraryResult";
import CityAutocomplete from "@/components/CityAutocomplete";

const TRAVEL_STYLES = ["Culturel", "Aventure", "Détente"];
const BUDGETS = ["Petit budget (< 500€)", "Moyen (500-1500€)", "Confort (1500-3000€)", "Luxe (3000€+)"];

export default function Home() {
  const today = new Date().toISOString().split("T")[0];

  function calcReturnDate(departureDate: string, duration: string) {
    if (!departureDate || !duration) return "";
    const d = new Date(departureDate);
    d.setDate(d.getDate() + parseInt(duration));
    return d.toISOString().split("T")[0];
  }

  const [form, setForm] = useState({
    departureCity: "",
    destination: "",
    departureDate: today,
    returnDate: calcReturnDate(today, "7"),
    duration: "7",
    travelers: "2",
    budget: BUDGETS[1],
    style: TRAVEL_STYLES[0],
  });

  function updateForm(patch: Partial<typeof form>) {
    const next = { ...form, ...patch };
    // Recalcule la date de retour si départ ou durée change
    if ("departureDate" in patch || "duration" in patch) {
      next.returnDate = calcReturnDate(next.departureDate, next.duration);
    }
    setForm(next);
  }
  const [itinerary, setItinerary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [vehicleIdx, setVehicleIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const vehicleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const VEHICLES = ["✈️", "🚂", "🚗"];

  useEffect(() => {
    if (loading) {
      setProgress(0);
      setVehicleIdx(0);
      // Progression simulée : monte vite au début, ralentit ensuite
      progressRef.current = setInterval(() => {
        setProgress(p => {
          if (p < 30) return p + 3;
          if (p < 60) return p + 1.5;
          if (p < 85) return p + 0.6;
          if (p < 95) return p + 0.2;
          return p;
        });
      }, 300);
      vehicleRef.current = setInterval(() => {
        setVehicleIdx(i => (i + 1) % VEHICLES.length);
      }, 2000);
    } else {
      if (progressRef.current) clearInterval(progressRef.current);
      if (vehicleRef.current) clearInterval(vehicleRef.current);
      setProgress(100);
    }
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
      if (vehicleRef.current) clearInterval(vehicleRef.current);
    };
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.destination.trim()) return;
    setLoading(true);
    setError(null);
    setItinerary(null);
    try {
      const res = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur serveur");
      setItinerary(data.itinerary);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-[#1a1625] px-6 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <span className="text-2xl">✈️</span>
          <span className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: "var(--font-playfair)" }}>
            Brizillas
          </span>
          <span className="ml-auto text-xs font-semibold text-orange-300 bg-orange-900/40 border border-orange-700/50 px-3 py-1 rounded-full">
            100% Gratuit
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12 fade-up fade-up-1">
          <h1 className="text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
            Ton voyage parfait en{" "}
            <span className="animated-gradient">30 secondes</span>
          </h1>
          <p className="text-lg text-stone-500 max-w-xl mx-auto">
            L&apos;IA planifie ton voyage jour par jour. Hôtels, activités, conseils — tout inclus, totalement gratuit.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl shadow-xl border border-stone-200 p-8 mb-8 fade-up fade-up-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CityAutocomplete
                label="Ville de départ"
                placeholder="Paris, Lyon, Bruxelles..."
                value={form.departureCity}
                onChange={val => updateForm({ departureCity: val })}
              />
              <CityAutocomplete
                label="Destination ✦"
                placeholder="Tokyo, Bali, New York..."
                value={form.destination}
                onChange={val => updateForm({ destination: val })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Date de départ</label>
                <input
                  type="date"
                  value={form.departureDate}
                  min={today}
                  onChange={e => updateForm({ departureDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:outline-none focus:border-orange-400 text-stone-800 transition-colors bg-stone-50"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Durée (jours)</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={form.duration}
                  onChange={e => updateForm({ duration: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:outline-none focus:border-orange-400 text-stone-800 transition-colors bg-stone-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Date de retour</label>
                <input
                  type="date"
                  value={form.returnDate}
                  min={form.departureDate || today}
                  onChange={e => updateForm({ returnDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:outline-none focus:border-orange-400 text-stone-800 transition-colors bg-stone-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Voyageurs</label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-stone-200 bg-stone-50">
                  <button type="button"
                    onClick={() => updateForm({ travelers: String(Math.max(1, parseInt(form.travelers) - 1)) })}
                    className="w-7 h-7 rounded-full bg-stone-200 hover:bg-orange-100 hover:text-orange-600 font-bold text-lg flex items-center justify-center transition-colors leading-none">−</button>
                  <span className="flex-1 text-center font-semibold text-stone-800">
                    {form.travelers} {parseInt(form.travelers) === 1 ? "personne" : "personnes"}
                  </span>
                  <button type="button"
                    onClick={() => updateForm({ travelers: String(Math.min(20, parseInt(form.travelers) + 1)) })}
                    className="w-7 h-7 rounded-full bg-stone-200 hover:bg-orange-100 hover:text-orange-600 font-bold text-lg flex items-center justify-center transition-colors leading-none">+</button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Budget</label>
                <select
                  value={form.budget}
                  onChange={e => updateForm({ budget: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:outline-none focus:border-orange-400 text-stone-800 transition-colors bg-stone-50"
                >
                  {BUDGETS.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Style</label>
                <select
                  value={form.style}
                  onChange={e => updateForm({ style: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:outline-none focus:border-orange-400 text-stone-800 transition-colors bg-stone-50"
                >
                  {TRAVEL_STYLES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-shimmer w-full py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: loading ? "#9ca3af" : "linear-gradient(135deg, #f97316, #ec4899)" }}
            >
              {loading ? "Génération en cours..." : "Générer mon itinéraire gratuit →"}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 mb-6 fade-up">{error}</div>
        )}

        {loading && (
          <div className="text-center py-16 fade-up">
            <div className="text-7xl mb-4 float-anim inline-block select-none">
              {VEHICLES[vehicleIdx]}
            </div>
            <p className="text-stone-500 text-lg font-medium mb-1">L&apos;IA prépare ton aventure...</p>
            <p className="text-stone-400 text-sm mb-6">Génération de l&apos;itinéraire en cours</p>
            <div className="max-w-xs mx-auto">
              <div className="flex justify-between text-xs text-stone-400 mb-1">
                <span>Chargement</span>
                <span>{Math.min(99, Math.round(progress))}%</span>
              </div>
              <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(99, progress)}%`,
                    background: "linear-gradient(90deg, #f97316, #ec4899)"
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {itinerary && (
          <ItineraryResult
            itinerary={itinerary}
            destination={form.destination}
            departureCity={form.departureCity}
            departureDate={form.departureDate}
            returnDate={form.returnDate}
          />
        )}

        {!itinerary && !loading && (
          <div className="grid grid-cols-3 gap-4 text-center mt-6 fade-up fade-up-3">
            {[
              { icon: "🆓", label: "100% gratuit", sub: "Aucun compte requis" },
              { icon: "⚡", label: "30 secondes", sub: "Résultat instantané" },
              { icon: "🎯", label: "Personnalisé", sub: "Adapté à votre budget" },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="card-hover bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
                <div className="text-3xl mb-2">{icon}</div>
                <div className="font-bold text-stone-800 text-sm">{label}</div>
                <div className="text-stone-400 text-xs mt-1">{sub}</div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="text-center text-stone-400 text-xs py-6 border-t border-stone-200 mt-8 space-y-2">
        <p>Brizillas © 2025 — Les liens hôtels et vols sont des liens affiliés. Votre utilisation nous aide à maintenir ce service gratuit.</p>
        <p className="flex items-center justify-center gap-4">
          <a href="/politique-confidentialite" className="hover:text-stone-600 transition-colors">Politique de confidentialité</a>
          <span>·</span>
          <a href="/mentions-legales" className="hover:text-stone-600 transition-colors">Mentions légales</a>
        </p>
      </footer>
    </div>
  );
}
