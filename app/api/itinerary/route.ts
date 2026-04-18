import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 3;
const WINDOW_MS = 24 * 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  if (process.env.NODE_ENV === "development") return false;
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Limite atteinte : 3 itinéraires par jour. Reviens demain !" },
      { status: 429 }
    );
  }

  const { destination, departureCity, departureDate, returnDate, duration, travelers, budget, style } = await req.json();

  if (!destination || !duration) {
    return NextResponse.json({ error: "Destination et durée requises" }, { status: 400 });
  }

  const prompt = `Tu es un expert en voyage. Génère un itinéraire de voyage détaillé pour les paramètres suivants :
- Ville de départ : ${departureCity || "Paris"}
- Destination : ${destination}
- Date de départ : ${departureDate || "non précisée"}
- Date de retour : ${returnDate || "non précisée"}
- Durée : ${duration} jours
- Nombre de voyageurs : ${travelers || 1}
- Budget : ${budget}
- Style : ${style}

Réponds UNIQUEMENT avec un objet JSON valide (pas de markdown, pas de texte avant ou après), structuré comme suit :
{
  "flightEstimate": {
    "minPrice": <prix minimum aller-retour en euros, 1 personne, depuis ${departureCity || "Paris"} vers ${destination}>,
    "maxPrice": <prix maximum aller-retour en euros, 1 personne>,
    "currency": "EUR",
    "note": "Prix indicatif aller-retour par personne, semaine du ${departureDate || "départ prévu"}"
  },
  "days": [
    {
      "day": 1,
      "title": "Titre du jour (ex: Arrivée & découverte du centre)",
      "activities": [
        {
          "time": "09:00",
          "name": "Nom de l'activité",
          "description": "Description courte et utile (1-2 phrases)",
          "tip": "Conseil pratique optionnel (prix, réservation, horaires...)"
        }
      ],
      "hotel": {
        "area": "Nom du quartier recommandé pour dormir",
        "suggestion": "Type d'hébergement conseillé pour ce budget"
      }
    }
  ]
}

Génère ${duration} jours complets avec 4-5 activités par jour. Sois précis, pratique et adapté au budget ${budget}.`;

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") throw new Error("Réponse inattendue");

    let text = content.text.trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) text = jsonMatch[0];

    JSON.parse(text);

    return NextResponse.json({ itinerary: text });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ error: "Erreur lors de la génération. Réessaie." }, { status: 500 });
  }
}
