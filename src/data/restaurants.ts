export interface Restaurant {
  category: string;
  name: string;
  japaneseName: string;
  area: string;
  hours: string;
  note?: string;
  sourceUrl?: string;
}

export const restaurants: Restaurant[] = [
  {
    category: '章魚燒',
    name: '道頓堀麵粉製品博物館',
    japaneseName: '道頓堀くくるコナモンミュージアム',
    area: '道頓堀',
    hours: '平日 10:30–22:30｜週末、國定假日 09:00–22:30',
    note: '館內體驗時段與餐飲營業時間不同；請出發前查看官方公告。',
    sourceUrl: 'https://dotonbori-kukuru.com/dotonbori-konamon-museum/',
  },
  {
    category: '御好燒',
    name: 'Mizuno（美津の）',
    japaneseName: 'お好み焼 美津の',
    area: '道頓堀',
    hours: '11:00–22:00（最後點餐 21:00）',
    note: '官方公告自 2026 年 2 月起週四也正常營業；尖峰時段可能需排隊。',
    sourceUrl: 'https://www.mizuno-osaka.com/',
  },
  {
    category: '炸串',
    name: '大阪新世界元祖炸串達摩 新世界總店',
    japaneseName: '大阪新世界元祖串かつ だるま 新世界総本店',
    area: '新世界',
    hours: '平日 11:00–22:30｜週末、國定假日 10:30–22:30（最後點餐為閉店前 30 分鐘）',
    note: '總本店不接受預約。',
    sourceUrl: 'https://www.kushikatu-daruma.com/location/',
  },
  {
    category: '天婦羅',
    name: '一寶 本店',
    japaneseName: '一宝 本店',
    area: '肥後橋',
    hours: '午餐 11:30–14:30｜晚餐 17:30–22:00',
    note: '週日及國定假日公休；官方標示可能另有服務費。',
    sourceUrl: 'https://www.ippoh.com/honten/',
  },
  {
    category: '燒肉',
    name: '燒肉大倉',
    japaneseName: '焼肉 大倉',
    area: '鶴橋',
    hours: '週二至週五 17:00 起｜週末 16:00 起，售完為止；週一公休',
    note: '官方網站近期公告店址／營運有變動，造訪前務必確認新店狀態並預約。',
    sourceUrl: 'https://turuhashiyakinikuookura.com/%E5%BA%97%E8%88%97%E6%83%85%E5%A0%B1/',
  },
  {
    category: '拉麵',
    name: '無鐵砲 大阪店',
    japaneseName: '無鉄砲大阪店',
    area: '今宮戎',
    hours: '午餐 11:00–15:00｜晚餐 17:30–22:30',
    note: '週一公休（遇國定假日可能調整）；湯底、麵條售完即止。時間請出發前再確認。',
    sourceUrl: 'https://maps.google.com/?q=%E7%84%A1%E9%89%84%E7%A0%B2%E5%A4%A7%E9%98%AA%E5%BA%97',
  },
  {
    category: '中華料理',
    name: '551 蓬萊本店（戎橋筋）',
    japaneseName: '551蓬莱 本店',
    area: '難波',
    hours: '外帶 10:00–21:30｜餐廳 11:00–21:30（最後點餐）',
    note: '每月第 1、3 個週二公休；12 月公休日可能另有安排。',
    sourceUrl: 'https://www.551horai.co.jp/shop/list/',
  },
];
