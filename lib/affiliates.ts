export const AFFILIATES = {
  bookingAid: process.env.NEXT_PUBLIC_BOOKING_AID ?? "",
  gygPartnerId: process.env.NEXT_PUBLIC_GYG_PARTNER_ID ?? "",
  tpMarker: process.env.NEXT_PUBLIC_TP_MARKER ?? "",
};

export function bookingUrl(destination: string, checkin: string, checkout: string) {
  const params = new URLSearchParams({
    ss: destination,
    checkin,
    checkout,
    lang: "fr",
    ...(AFFILIATES.bookingAid ? { aid: AFFILIATES.bookingAid } : {}),
  });
  return `https://www.booking.com/searchresults.fr.html?${params}`;
}

export function bookingAreaUrl(area: string, destination: string, checkin: string, checkout: string) {
  return bookingUrl(`${area} ${destination}`, checkin, checkout);
}

export function gygUrl(destination: string) {
  const params = new URLSearchParams({
    q: destination,
    ...(AFFILIATES.gygPartnerId ? { partner_id: AFFILIATES.gygPartnerId } : {}),
  });
  return `https://www.getyourguide.fr/s/?${params}`;
}

export function flightsUrl(from: string, destination: string, departureDate: string, returnDate: string) {
  if (AFFILIATES.tpMarker) {
    const params = new URLSearchParams({
      origin: from,
      destination,
      depart_date: departureDate,
      return_date: returnDate,
      marker: AFFILIATES.tpMarker,
    });
    return `https://jetradar.fr/?${params}`;
  }
  const query = `vols ${from} ${destination} ${departureDate}`.trim();
  return `https://www.google.com/travel/flights?q=${encodeURIComponent(query)}&hl=fr`;
}
