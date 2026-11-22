import { useEffect, useState } from 'react';
import { Menu, Printer } from 'lucide-react';
import SiteSidebar, { type NavigationItem } from './components/SiteSidebar';
import { days } from './data/itinerary';
import BeforeYouGo from './sections/BeforeYouGo';
import ChecklistSection from './sections/ChecklistSection';
import DailyItinerary from './sections/DailyItinerary';
import FlightAndTransfers from './sections/FlightAndTransfers';
import HotelStay from './sections/HotelStay';
import TravelNotes from './sections/TravelNotes';
import TripOverview from './sections/TripOverview';

const navItems: NavigationItem[] = [
  { id: 'overview', label: '旅程總覽' },
  ...days.map((day) => ({ id: `day-${day.day}`, label: `DAY 0${day.day}｜${day.theme}` })),
  { id: 'essentials', label: '出發前確認' },
  { id: 'hotel', label: '住宿資訊' },
  { id: 'transit-guide', label: '關西移動筆記' },
  { id: 'food', label: '美食名單' },
  { id: 'checklist', label: '出發清單' },
];

const checklistStorageKey = 'osaka-travel-guide-checklist-v1';

function loadChecklist(): Record<string, boolean> {
  try {
    const stored = window.localStorage.getItem(checklistStorageKey);
    return stored ? JSON.parse(stored) as Record<string, boolean> : {};
  } catch {
    return {};
  }
}

export default function App() {
  const [checked, setChecked] = useState<Record<string, boolean>>(loadChecklist);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    try {
      window.localStorage.setItem(checklistStorageKey, JSON.stringify(checked));
    } catch {
      // Checklist remains usable for the current visit when storage is unavailable.
    }
  }, [checked]);

  useEffect(() => {
    const targets = navItems
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible?.target instanceof HTMLElement) setActiveSection(visible.target.id);
    }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const toggleChecklistItem = (key: string) => {
    setChecked((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <div className="site-shell">
      <SiteSidebar
        items={navItems}
        activeSection={activeSection}
        menuOpen={menuOpen}
        onNavigate={() => setMenuOpen(false)}
        onClose={() => setMenuOpen(false)}
      />

      <main className="main-content mx-auto ml-[250px] w-[calc(100%_-_250px)] max-w-[1600px] px-[6.2vw] max-[860px]:ml-0 max-[860px]:w-full max-[860px]:px-[22px] max-[400px]:px-4">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="開啟導覽"><Menu /></button>
          <span>旅程手冊 <i>/</i> 大阪・京都</span>
          <button className="print-button" onClick={() => window.print()}><Printer size={16} />下載 PDF / 列印</button>
        </header>

        <TripOverview />
        <FlightAndTransfers />
        <DailyItinerary />
        <BeforeYouGo />
        <HotelStay />
        <TravelNotes />
        <ChecklistSection checked={checked} onToggle={toggleChecklistItem} />

        <footer className="footer">
          <div className="footer-brand">OSAKA <i>TRAVEL GUIDE</i></div>
          <p>把旅程過成，喜歡的樣子。</p>
          <small>2026 WINTER · 大阪・京都　｜　行程與季節活動請以官方最新資訊為準</small>
          <a href="#overview">回到頁首 ↑</a>
        </footer>
      </main>
    </div>
  );
}
