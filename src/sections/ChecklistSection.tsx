import { Check } from 'lucide-react';
import { checklist } from '../data/itinerary';

interface ChecklistSectionProps {
  checked: Record<string, boolean>;
  onToggle: (key: string) => void;
}

export default function ChecklistSection({ checked, onToggle }: ChecklistSectionProps) {
  const total = checklist.reduce((count, group) => count + group.items.length, 0);
  const completed = Object.values(checked).filter(Boolean).length;

  return (
    <section className="checklist-section" id="checklist" aria-labelledby="checklist-title">
      <div className="section-heading">
        <div><span className="section-label">BEFORE YOU GO</span><h2 id="checklist-title">慢慢準備，放心出發。</h2></div>
        <span className="progress-count" aria-live="polite">{completed} / {total} 已完成</span>
      </div>
      <div className="checklist-grid grid grid-cols-3 gap-x-[34px] gap-y-[25px] max-[860px]:grid-cols-2 max-[400px]:grid-cols-1">
        {checklist.map((group) => (
          <article className="check-group" key={group.category}>
            <h3>{group.category}</h3>
            {group.items.map((item, index) => {
              const key = `${group.category}-${index}`;
              return (
                <label className={checked[key] ? 'is-checked' : ''} key={key}>
                  <input type="checkbox" checked={!!checked[key]} onChange={() => onToggle(key)} />
                  <span className="custom-check"><Check size={13} /></span>{item}
                </label>
              );
            })}
          </article>
        ))}
      </div>
    </section>
  );
}
