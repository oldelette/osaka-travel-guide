import { Check, RotateCcw } from '../icons';
import { checklist } from '../data/itinerary';

interface ChecklistSectionProps {
  checked: Record<string, boolean>;
  onToggle: (key: string) => void;
  onReset: () => void;
}
const stages = ['出發前一週', '出發前一天', '出門前'] as const;

export default function ChecklistSection({ checked, onToggle, onReset }: ChecklistSectionProps) {
  const total = checklist.reduce((count, group) => count + group.items.length, 0);
  const completed = checklist.reduce((count, group) => count + group.items.filter((_, index) => checked[`${group.category}-${index}`]).length, 0);
  const percent = total ? Math.round((completed / total) * 100) : 0;

  return (
    <section className="checklist-section" id="checklist" aria-labelledby="checklist-title">
      <div className="section-heading">
        <div><span className="section-label">BEFORE YOU GO</span><h2 id="checklist-title">慢慢準備，放心出發。</h2></div>
        <div className="checklist-progress" aria-live="polite"><strong>{completed} / {total}</strong><span>已完成 · {percent}%</span></div>
      </div>
      <div className="progress-track" role="progressbar" aria-label="清單完成度" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}><span style={{ width: `${percent}%` }} /></div>
      {stages.map((stage) => {
        const groups = checklist.filter((group) => group.stage === stage);
        return <section className="checklist-stage" key={stage} aria-label={stage}>
          <h3 className="checklist-stage-title">{stage}</h3>
          <div className="checklist-grid grid grid-cols-3 gap-x-[34px] gap-y-[25px] max-[860px]:grid-cols-2 max-[400px]:grid-cols-1">
            {groups.map((group) => (
              <article className="check-group" key={group.category}>
                <h4>{group.category}</h4>
                {group.items.map((item, index) => {
                  const key = `${group.category}-${index}`;
                  return <label className={checked[key] ? 'is-checked' : ''} key={key}>
                    <input type="checkbox" checked={!!checked[key]} onChange={() => onToggle(key)} />
                    <span className="custom-check"><Check size={13} /></span><span>{item}</span>
                  </label>;
                })}
              </article>
            ))}
          </div>
        </section>;
      })}
      <button type="button" className="checklist-reset" onClick={onReset}><RotateCcw size={15} />重設所有勾選</button>
    </section>
  );
}
