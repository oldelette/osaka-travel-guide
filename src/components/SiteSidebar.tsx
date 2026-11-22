import { ChevronRight, X } from 'lucide-react';

export interface NavigationItem {
  id: string;
  label: string;
}

interface SiteSidebarProps {
  items: NavigationItem[];
  activeSection: string;
  menuOpen: boolean;
  onNavigate: () => void;
  onClose: () => void;
}

export default function SiteSidebar({ items, activeSection, menuOpen, onNavigate, onClose }: SiteSidebarProps) {
  return (
    <>
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`} aria-label="旅遊手冊導覽">
        <div className="brand">
          <span className="brand-stamp">旅</span>
          <div><b>OSAKA</b><small>TRAVEL GUIDE 2026</small></div>
          <button className="close-menu" onClick={onClose} aria-label="關閉導覽"><X size={18} /></button>
        </div>
        <div className="side-date">DECEMBER 23 — 27, 2026</div>
        <nav>
          {items.map((item) => (
            <a
              key={item.id}
              className={activeSection === item.id ? 'active' : ''}
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? 'location' : undefined}
              onClick={onNavigate}
            >
              {item.label}<ChevronRight size={14} />
            </a>
          ))}
        </nav>
        <div className="sidebar-bottom"><span className="dot" />4 位旅人・5 天 4 夜</div>
      </aside>
      {menuOpen && <button className="scrim" onClick={onClose} aria-label="關閉選單" />}
    </>
  );
}
