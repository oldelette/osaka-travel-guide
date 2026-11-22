export interface DayRoute { origin: string; destination: string; waypoints?: string[]; mode: 'transit' | 'walking' }
const route = (origin: string, destination: string, waypoints: string[] = [], mode: DayRoute['mode'] = 'transit'): DayRoute => ({ origin, destination, waypoints, mode });
export const dayRoutes: Record<number, DayRoute> = {
  1: route('Kansai International Airport Terminal 1', 'Dotonbori Osaka', ['Apartment Hotel 11 Dotonbori 8', 'Osaka Castle', 'Shinsekai Osaka', 'Namba Yasaka Shrine']),
  2: route('Apartment Hotel 11 Dotonbori 8', 'Apartment Hotel 11 Dotonbori 8', ['Kiyomizu-dera Kyoto', 'SEIVI ARTISANAL MATCHA and ROASTED Kyoto', 'Ninenzaka Kyoto']),
  3: route('Apartment Hotel 11 Dotonbori 8', 'Universal CityWalk Osaka', ['Universal Studios Japan']),
  4: route('Apartment Hotel 11 Dotonbori 8', 'Nakanoshima Park Osaka', ['Katsuoji Temple Osaka', 'Shinsaibashi Osaka', 'Umeda Osaka']),
  5: route('Apartment Hotel 11 Dotonbori 8', 'Kansai International Airport Terminal 1'),
};
export function directionsUrl(day: number) {
  const plan = dayRoutes[day];
  if (!plan) return 'https://www.google.com/maps';
  const params = new URLSearchParams({ api: '1', origin: plan.origin, destination: plan.destination, travelmode: plan.mode });
  if (plan.waypoints?.length) params.set('waypoints', plan.waypoints.join('|'));
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}
