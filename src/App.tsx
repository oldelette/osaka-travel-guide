import { useEffect, useState } from 'react';
import { Menu, Printer } from './icons';
import SiteSidebar, { type NavigationItem } from './components/SiteSidebar';
import PwaExperience from './components/PwaExperience';
import { checklist, days } from './data/itinerary';
import BeforeYouGo from './sections/BeforeYouGo';
import ChecklistSection from './sections/ChecklistSection';
import DailyItinerary from './sections/DailyItinerary';
import FlightAndTransfers from './sections/FlightAndTransfers';
import HotelStay from './sections/HotelStay';
import TravelNotes from './sections/TravelNotes';
import TripOverview from './sections/TripOverview';
import DailyMap from './sections/DailyMap';

const navItems: NavigationItem[] = [
  { id: 'overview', label: '旅程總覽' },
  { id: 'daily-map', label: '每日景點地圖' },
  ...days.map((day) => ({ id: `day-${day.day}`, label: `DAY 0${day.day}｜${day.theme}` })),
  { id: 'essentials', label: '出發前確認' },
  { id: 'hotel', label: '住宿資訊' },
  { id: 'transit-guide', label: '關西移動筆記' },
  { id: 'food', label: '美食名單' },
  { id: 'checklist', label: '出發清單' },
];
const checklistStorageKey = 'osaka-travel-guide-checklist-v1';
const itemKeys = new Set(checklist.flatMap((group) => group.items.map((_, index) => `${group.category}-${index}`)));
function loadChecklist(): Record<string, boolean> {
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(checklistStorageKey) ?? '{}');
    if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return {};
    return Object.fromEntries(Object.entries(stored).filter(([key, value]) => itemKeys.has(key) && typeof value === 'boolean'));
  } catch { return {}; }
}

export default function App() {
  const [checked, setChecked] = useState<Record<string, boolean>>(loadChecklist);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    try { window.localStorage.setItem(checklistStorageKey, JSON.stringify(checked)); } catch { /* Keep this visit interactive when storage is unavailable. */ }
  }, [checked]);

  useEffect(() => {
    const targets = navItems.map((item) => document.getElementById(item.id)).filter((element): element is HTMLElement => element !== null);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target instanceof HTMLElement) setActiveSection(visible.target.id);
      }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });
      targets.forEach((target) => observer.observe(target));
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (!hash) return;
    requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView());
  }, []);

  const toggleChecklistItem = (key: string) => setChecked((current) => ({ ...current, [key]: !current[key] }));
  const changeDay = (day: number) => { setSelectedDay(day); setSelectedIndex(null); };
  const selectFromTimeline = (day: number, index: number) => {
    setSelectedDay(day);
    setSelectedIndex(index);
    if (window.matchMedia('(max-width: 860px)').matches) document.getElementById('daily-map')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const selectFromMap = (index: number) => {
    setSelectedIndex(index);
    document.getElementById(`stop-${selectedDay}-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  const selectMapDay = (day: number) => {
    changeDay(day);
    if (!window.matchMedia('(max-width: 860px)').matches) document.getElementById(`day-${day}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="site-shell">
      <PwaExperience />
      <SiteSidebar items={navItems} activeSection={activeSection} menuOpen={menuOpen} onNavigate={() => setMenuOpen(false)} onClose={() => setMenuOpen(false)} />
      <main className="main-content mx-auto ml-[250px] w-[calc(100%_-_250px)] max-w-[1600px] px-[6.2vw] max-[860px]:ml-0 max-[860px]:w-full max-[860px]:px-[22px] max-[400px]:px-4">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="開啟導覽"><Menu /></button>
          <span>旅程總覽 <i>/</i> 大阪與京都冬日旅行</span>
          <button className="print-button" onClick={() => window.print()}><Printer size={16} />下載 PDF / 列印</button>
        </header>
        <TripOverview />
        <FlightAndTransfers />
        <div className="daily-map-experience">
          <div className="daily-map-itinerary"><DailyItinerary selectedDay={selectedDay} selectedIndex={selectedIndex} onSelectStop={selectFromTimeline} /></div>
          <DailyMap day={days.find((day) => day.day === selectedDay) ?? days[0]} selectedIndex={selectedIndex} onSelect={selectFromMap} onDayChange={selectMapDay} />
        </div>
        <BeforeYouGo />
        <HotelStay />
        <TravelNotes />
        <ChecklistSection checked={checked} onToggle={toggleChecklistItem} onReset={() => setChecked({})} />
        <footer className="footer">
          <div className="footer-brand">OSAKA <i>TRAVEL GUIDE</i></div>
          <p>把旅程裡的重要細節，收進一本手冊。</p>
          <small>2026 WINTER · 大阪與京都・五天四夜；交通、活動與營業資訊請以官方最新公告為準。</small>
          <a href="#overview">回到頁首 ↑</a>
        </footer>
      </main>
    </div>
  );
}
