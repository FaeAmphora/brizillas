"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Day, ItineraryData } from "@/types/itinerary";
import { bookingUrl, bookingAreaUrl, gygUrl, flightsUrl } from "@/lib/affiliates";

interface Props {
  itinerary: string;
  destination: string;
  departureCity?: string;
  departureDate?: string;
  returnDate?: string;
  showPhotos?: boolean;
}

function useActivityPhoto(query: string) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    fetch(`/api/photos?q=${encodeURIComponent(query)}`)
      .then(r => r.json())
      .then(d => { if (d?.url) setUrl(d.url); })
      .catch(() => {});
  }, [query]);
  return url;
}

function ActivityPhoto({ query }: { query: string }) {
  const url = useActivityPhoto(query);
  if (!url) return null;
  return (
    <div className="mt-3 rounded-xl overflow-hidden w-full max-w-sm h-36 relative shadow-md">
      <Image src={url} alt={query} fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="384px" />
    </div>
  );
}

export default function ItineraryResult({ itinerary, destination, departureCity, departureDate, returnDate, showPhotos = true }: Props) {
  let data: ItineraryData | null = null;
  let days: Day[] = [];
  let parseError = false;

  try {
    const parsed = JSON.parse(itinerary);
    if (parsed.days && parsed.flightEstimate) {
      data = parsed as ItineraryData;
      days = data.days;
    } else if (Array.isArray(parsed)) {
      days = parsed;
    } else {
      parseError = true;
    }
  } catch {
    parseError = true;
  }

  const from = departureCity || "Paris";
  const dateOut = departureDate ?? "";
  const dateBack = returnDate ?? "";

  const hotelUrl = bookingUrl(destination, dateOut, dateBack);
  const volsUrl = flightsUrl(from, destination, dateOut, dateBack);
  const activitesUrl = gygUrl(destination);

  if (parseError) {
    return (
      <div className="bg-white rounded-3xl border border-stone-200 p-8">
        <p className="text-stone-700 whitespace-pre-wrap">{itinerary}</p>
      </div>
    );
  }

  const flight = data?.flightEstimate;

  return (
    <div className="space-y-6">
      {/* Header résultat */}
      <div className="rounded-3xl p-8 text-white relative overflow-hidden shadow-xl"
        style={{ background: "linear-gradient(135deg, #1a1625 0%, #2d1f3d 50%, #1a2535 100%)" }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 80%, #f97316 0%, transparent 50%), radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 50%)" }} />
        <div className="relative">
          <h2 className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
            Voyage à {destination} 🗺️
          </h2>
          <p className="text-white/60 text-sm mb-6">Itinéraire généré par IA — réserve dès maintenant aux meilleurs prix</p>

          {flight && (
            <div className="mb-5 bg-white/10 border border-white/20 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-2xl">✈️</span>
                <div>
                  <div className="text-white/60 text-xs uppercase tracking-wider">Prix estimé aller-retour / personne</div>
                  <div className="text-white font-bold text-xl">
                    {flight.minPrice}€ — {flight.maxPrice}€
                  </div>
                  <div className="text-white/50 text-xs">{flight.note}</div>
                </div>
              </div>
              <a href={volsUrl} target="_blank" rel="noopener noreferrer"
                className="card-hover shrink-0 flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg">
                Voir les vols →
              </a>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <a href={hotelUrl} target="_blank" rel="noopener noreferrer"
              className="card-hover flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">
              🏨 Hôtels sur Booking
            </a>
            <a href={activitesUrl} target="_blank" rel="noopener noreferrer"
              className="card-hover flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">
              🎯 Activités · GetYourGuide
            </a>
          </div>
        </div>
      </div>

      {/* Jours */}
      <div className="space-y-4">
        {days.map((day, dayIdx) => (
          <div key={day.day} className="card-hover bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm slide-in"
            style={{ animationDelay: `${dayIdx * 0.08}s` }}>
            <div className="px-6 py-4 flex items-center gap-3"
              style={{ background: "linear-gradient(135deg, #1a1625, #2d1f3d)" }}>
              <span className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-sm font-bold flex items-center justify-center shrink-0">
                {day.day}
              </span>
              <span className="text-white font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
                {day.title}
              </span>
            </div>

            <div className="p-6 space-y-6">
              {day.activities.map((activity, i) => {
                const n = day.activities.length;
                const p1 = day.day % n;
                const p2 = (day.day + Math.floor(n / 2) + 1) % n;
                const showPhoto = i === p1 || i === p2;
                const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(activity.name + " " + destination)}`;
                return (
                  <div key={i} className="flex gap-4 group">
                    <div className="text-xs font-bold text-orange-500 w-14 shrink-0 pt-1 tabular-nums">{activity.time}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-semibold text-stone-800 group-hover:text-orange-600 transition-colors">
                          {activity.name}
                        </span>
                        <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
                          className="text-xs text-stone-300 hover:text-orange-500 transition-colors">
                          📍 Maps
                        </a>
                      </div>
                      <p className="text-stone-500 text-sm leading-relaxed">{activity.description}</p>
                      {activity.tip && (
                        <div className="inline-flex items-center gap-1 text-xs text-amber-700 mt-2 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                          💡 {activity.tip}
                        </div>
                      )}
                      {showPhotos && showPhoto && <ActivityPhoto query={`${activity.name} ${destination}`} />}
                    </div>
                  </div>
                );
              })}

              {day.hotel && (
                <div className="mt-2 pt-4 border-t border-stone-100">
                  <a
                    href={bookingAreaUrl(day.hotel.area, destination, dateOut, dateBack)}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors group"
                  >
                    <span className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center text-xs group-hover:bg-blue-100 transition-colors">🏨</span>
                    <span>Quartier conseillé : <span className="underline underline-offset-2">{day.hotel.area}</span></span>
                    <span className="text-stone-300">— {day.hotel.suggestion}</span>
                    <span className="text-blue-400">→</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-stone-400 text-xs py-2">
        Les liens hôtels et activités sont des liens affiliés · Photos © Unsplash · Prix vols indicatifs
      </div>
    </div>
  );
}
