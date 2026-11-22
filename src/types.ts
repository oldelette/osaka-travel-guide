export interface Stop { time: string; title: string; description: string; transit?: string; map?: string; optional?: boolean; latitude?: number; longitude?: number; category?: string; nameEn?: string }
export interface DayPlan { day: number; date: string; weekday: string; theme: string; location: string; image: string; stops: Stop[]; note: string }
export interface ChecklistGroup { category: string; stage: '出發前一週' | '出發前一天' | '出門前'; items: string[] }
