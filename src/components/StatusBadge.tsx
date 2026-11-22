import type { ReactNode } from 'react';

export type StatusKind = 'confirmed' | 'pending' | 'flexible' | 'important';
const labels: Record<StatusKind, string> = { confirmed: '已確認', pending: '待確認', flexible: '彈性安排', important: '重要提醒' };
export default function StatusBadge({ status, children }: { status: StatusKind; children?: ReactNode }) {
  return <span className={`status-badge ${status}`}>{children ?? labels[status]}</span>;
}
