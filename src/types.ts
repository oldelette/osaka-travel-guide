export interface Stop { time: string; title: string; description: string; transit?: string; map?: string; optional?: boolean }
export interface DayPlan { day: number; date: string; weekday: string; theme: string; location: string; image: string; stops: Stop[]; note: string }
