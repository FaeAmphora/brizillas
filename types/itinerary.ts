export interface Activity {
  time: string;
  name: string;
  description: string;
  tip?: string;
}

export interface Day {
  day: number;
  title: string;
  activities: Activity[];
  hotel?: {
    area: string;
    suggestion: string;
  };
}

export interface FlightEstimate {
  minPrice: number;
  maxPrice: number;
  currency: string;
  note: string;
}

export interface ItineraryData {
  flightEstimate: FlightEstimate;
  days: Day[];
}
