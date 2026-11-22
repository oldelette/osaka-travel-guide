import { useEffect, useMemo, useRef, useState } from 'react';
import { days } from '../data/itinerary';
import type { DayPlan, Stop } from '../types';

const TILE = 256;
const worldSize = (zoom: number) => TILE * 2 ** zoom;
function project(latitude: number, longitude: number, zoom: number) {
  const size = worldSize(zoom);
  const sin = Math.sin(latitude * Math.PI / 180);
  return { x: (longitude + 180) / 360 * size, y: (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * size };
}
const tileUrl = (x: number, y: number, z: number) => `https://${['a', 'b', 'c'][(x + y) % 3]}.tile.openstreetmap.org/${z}/${x}/${y}.png`;

interface TileMapProps { stops: Stop[]; selectedIndex: number | null; onSelect: (index: number) => void; unavailable: boolean; onTileError: () => void }
function TileMap({ stops, selectedIndex, onSelect, unavailable, onTileError }: TileMapProps) {
  const container = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 440 });
  const located = useMemo(() => stops.map((stop, index) => ({ stop, index })).filter(({ stop }) => stop.latitude !== undefined && stop.longitude !== undefined), [stops]);
  const [zoom, setZoom] = useState(11);
  const [center, setCenter] = useState<[number, number]>([34.6937, 135.5023]);
  const [drag, setDrag] = useState<{ x: number; y: number; startX: number; startY: number } | null>(null);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setSize({ width: entry.contentRect.width, height: entry.contentRect.height }));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedIndex !== null) {
      const stop = stops[selectedIndex];
      if (stop?.latitude !== undefined && stop.longitude !== undefined) { setCenter([stop.latitude, stop.longitude]); setZoom((current) => Math.max(current, 13)); return; }
    }
    if (located.length === 1) { setCenter([located[0].stop.latitude!, located[0].stop.longitude!]); setZoom(12); }
    else if (located.length > 1) {
      const bounds = located.map(({ stop }) => project(stop.latitude!, stop.longitude!, 9));
      const avgX = (Math.max(...bounds.map((p) => p.x)) + Math.min(...bounds.map((p) => p.x))) / 2;
      const avgY = (Math.max(...bounds.map((p) => p.y)) + Math.min(...bounds.map((p) => p.y))) / 2;
      const lng = avgX / worldSize(9) * 360 - 180;
      const n = Math.PI - 2 * Math.PI * avgY / worldSize(9);
      setCenter([180 / Math.PI * Math.atan(Math.sinh(n)), lng]);
      const spanX = Math.max(...bounds.map((p) => p.x)) - Math.min(...bounds.map((p) => p.x));
      const spanY = Math.max(...bounds.map((p) => p.y)) - Math.min(...bounds.map((p) => p.y));
      const availableWidth = Math.max(120, size.width - 88);
      const availableHeight = Math.max(120, size.height - 88);
      const scale = Math.min(availableWidth / Math.max(spanX, 1), availableHeight / Math.max(spanY, 1));
      setZoom(Math.max(3, Math.min(14, 9 + Math.floor(Math.log2(scale)))));
    }
  }, [stops, selectedIndex, size.width, size.height]);

  const centerPoint = project(center[0], center[1], zoom);
  const startX = Math.floor((centerPoint.x - size.width / 2) / TILE);
  const startY = Math.floor((centerPoint.y - size.height / 2) / TILE);
  const endX = Math.floor((centerPoint.x + size.width / 2) / TILE);
  const endY = Math.floor((centerPoint.y + size.height / 2) / TILE);
  const maxTile = 2 ** zoom;
  const tiles = [];
  for (let y = startY; y <= endY; y++) for (let x = startX; x <= endX; x++) {
    if (y < 0 || y >= maxTile) continue;
    const wrappedX = ((x % maxTile) + maxTile) % maxTile;
    tiles.push({ x, y, wrappedX, key: `${zoom}-${wrappedX}-${y}` });
  }
  const down = (event: import('react').PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || (event.target instanceof Element && event.target.closest('.map-zoom-controls, .map-attribution-note, .itinerary-marker'))) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDrag({ x: 0, y: 0, startX: event.clientX, startY: event.clientY });
  };
  const move = (event: import('react').PointerEvent<HTMLDivElement>) => {
    if (!drag) return;
    const dx = event.clientX - drag.startX, dy = event.clientY - drag.startY;
    setDrag({ ...drag, x: dx, y: dy });
  };
  const up = () => {
    if (!drag) return;
    const point = project(center[0], center[1], zoom);
    const x = point.x - drag.x, y = point.y - drag.y;
    const lng = x / worldSize(zoom) * 360 - 180;
    const n = Math.PI - 2 * Math.PI * y / worldSize(zoom);
    setCenter([180 / Math.PI * Math.atan(Math.sinh(n)), lng]); setDrag(null);
  };

  return <div ref={container} className={`daily-map-canvas ${drag ? 'map-dragging' : ''}`} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} role="application" aria-label="可拖曳縮放的景點地圖">
    <div className="map-tile-layer" style={{ transform: `translate(${(size.width / 2 - centerPoint.x) + (drag?.x ?? 0)}px, ${(size.height / 2 - centerPoint.y) + (drag?.y ?? 0)}px)` }}>
      {tiles.map((tile) => <img key={tile.key} className="map-tile" src={tileUrl(tile.wrappedX, tile.y, zoom)} alt="" draggable={false} onError={onTileError} style={{ left: tile.x * TILE, top: tile.y * TILE }} />)}
      {located.map(({ stop, index }) => {
        const point = project(stop.latitude!, stop.longitude!, zoom);
        const colocated = located.filter(({ stop: other }) => stop.latitude === other.latitude && stop.longitude === other.longitude);
        const slot = colocated.findIndex(({ index: otherIndex }) => otherIndex === index);
        const offset = colocated.length > 1 ? (slot - (colocated.length - 1) / 2) * 42 : 0;
        return <button key={`${index}-${stop.title}`} type="button" className={`itinerary-marker ${selectedIndex === index ? 'active' : ''}`} onPointerDown={(event) => event.stopPropagation()} onClick={() => onSelect(index)} style={{ left: point.x + offset, top: point.y }} aria-label={`${index + 1} ${stop.title}`}>{index + 1}</button>;
      })}
    </div>
    <div className="map-zoom-controls"><button type="button" aria-label="放大地圖" onClick={() => setZoom((value) => Math.min(18, value + 1))}>+</button><button type="button" aria-label="縮小地圖" onClick={() => setZoom((value) => Math.max(3, value - 1))}>−</button></div>
    <div className="map-attribution-note">&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a></div>
    {unavailable && <div className="map-offline-overlay">底圖目前無法載入。已載入的行程與景點資訊仍可使用。</div>}
  </div>;
}

interface DailyMapProps { day: DayPlan; selectedIndex: number | null; onSelect: (index: number) => void; onDayChange: (day: number) => void }
export default function DailyMap({ day, selectedIndex, onSelect, onDayChange }: DailyMapProps) {
  const [tilesUnavailable, setTilesUnavailable] = useState(!navigator.onLine);
  const [googleMapsOffline, setGoogleMapsOffline] = useState(false);
  const located = day.stops.map((stop) => stop.latitude !== undefined && stop.longitude !== undefined).filter(Boolean).length;
  useEffect(() => {
    const onOffline = () => setTilesUnavailable(true);
    const onOnline = () => { setTilesUnavailable(false); setGoogleMapsOffline(false); };
    window.addEventListener('offline', onOffline); window.addEventListener('online', onOnline);
    return () => { window.removeEventListener('offline', onOffline); window.removeEventListener('online', onOnline); };
  }, []);
  return <section className="daily-map-section" id="daily-map" aria-labelledby="daily-map-title">
    <div className="section-heading daily-map-heading"><div><span className="section-label">THE CITY, BY DAY</span><h2 id="daily-map-title">每日景點地圖</h2></div><span className="heading-note">{day.location} · {located} 個已定位景點</span></div>
    <div className="map-day-tabs" aria-label="選擇地圖日期">{days.map((item) => <button key={item.day} type="button" className={item.day === day.day ? 'active' : ''} onClick={() => onDayChange(item.day)} aria-pressed={item.day === day.day}><span>DAY 0{item.day}</span><small>{item.date}</small></button>)}</div>
    <p className="daily-map-theme">{day.theme}<span>{day.stops.length} 個行程項目</span></p>
    <div className="daily-map-layout">
      <div className="map-place-list" aria-label={`${day.theme}景點清單`}>
        {day.stops.map((stop, index) => <button type="button" key={`${day.day}-${stop.title}`} className={`map-place-row ${selectedIndex === index ? 'selected' : ''}`} onClick={() => onSelect(index)}><span className="map-place-number">{stop.latitude !== undefined ? index + 1 : '—'}</span><span className="map-place-copy"><b>{stop.title}</b><small>{stop.time}{stop.category ? ` · ${stop.category}` : ''}</small></span>{stop.latitude === undefined && <small className="map-pending">{stop.map ? '座標待確認' : '行程資訊'}</small>}</button>)}
        {selectedIndex !== null && day.stops[selectedIndex] && <div className="map-place-detail"><span className="section-label">{day.stops[selectedIndex].time} {day.stops[selectedIndex].category ? `· ${day.stops[selectedIndex].category}` : ''}</span><h3>{day.stops[selectedIndex].title}</h3>{day.stops[selectedIndex].nameEn && <p className="map-place-english">{day.stops[selectedIndex].nameEn}</p>}<p>{day.stops[selectedIndex].description}</p>{day.stops[selectedIndex].transit && <p className="map-transit"><b>交通備註</b>{day.stops[selectedIndex].transit}</p>}{day.stops[selectedIndex].map && <a href={day.stops[selectedIndex].map} target="_blank" rel="noopener noreferrer" onClick={(event) => { if (!navigator.onLine) { event.preventDefault(); setGoogleMapsOffline(true); } }}>Google Maps 導航 ↗</a>}</div>}
      </div>
      <div className="daily-map-frame"><TileMap key={day.day} stops={day.stops} selectedIndex={selectedIndex} onSelect={onSelect} unavailable={tilesUnavailable} onTileError={() => setTilesUnavailable(true)} />{located === 0 && <div className="map-empty-overlay">此日尚無已確認座標的景點</div>}{googleMapsOffline && <div className="map-offline-overlay">離線時無法開啟 Google Maps 導航，請連線後重試。</div>}<div className="map-attribution-overlay">景點間不繪製路線</div></div>
    </div>
    <p className="map-transport-note">交通資訊沿用各站行程備註；未提供可靠路線資料的路段不繪製連線。底圖需要網路，離線時行程與景點文字仍可查看。</p>
  </section>;
}
