import type { ChecklistGroup, DayPlan } from '../types';
const maps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const dotonboriHotelLocation = { latitude: 34.670605, longitude: 135.506325 };
export const days: DayPlan[] = [
 { day:1,date:'12.23',weekday:'週三',theme:'大阪經典地標',location:'大阪市區',image:'大阪城與天守閣',note:'抵達日保留彈性。若交通或體力不如預期，優先安排道頓堀晚餐與夜間散步。',stops:[
  {time:'09:30',title:'抵達關西國際機場',category:'機場',latitude:34.4273,longitude:135.2440,description:'漢恩航空系統 H11228 抵達 KIX T1。入境、領取行李後搭南海電鐵至難波，轉大阪 Metro 千日前線一站至日本橋，再步行到住宿附近。',transit:'推薦路線詳見「關西移動筆記」；入境、領行李與候車時間另計。',map:maps('Kansai International Airport')},
  {time:'約 13:00',title:'難波寄放行李',category:'住宿',...dotonboriHotelLocation,description:'先前往 Apartment Hotel 11 Dotonbori 8 寄放行李；能否提前寄放請事先向住宿確認。',map:maps('Apartment Hotel 11 Dotonbori 8')},
  {time:'午後',title:'大阪城',nameEn:'Osaka Castle',category:'歷史古蹟',latitude:34.6873,longitude:135.5262,description:'漫步大阪城公園，天守閣入場資訊與營業時間出發前確認。',transit:'由難波搭乘大阪 Metro 前往谷町四丁目或森之宮。',map:maps('大阪城')},
  {time:'傍晚',title:'新世界・通天閣',nameEn:'Tsutenkaku Tower',category:'街區地標',latitude:34.6525,longitude:135.5063,description:'感受復古街區氣氛，串炸可依現場候位狀況選擇。',transit:'大阪城一帶搭車前往動物園前／惠美須町。',map:maps('通天閣')},
  {time:'16:00 後',title:'飯店入住',category:'住宿',...dotonboriHotelLocation,description:'Apartment Hotel 11 Dotonbori 8。',map:maps('Apartment Hotel 11 Dotonbori 8')},
  {time:'晚上',title:'難波八阪神社・道頓堀',category:'街區散步',latitude:34.6687,longitude:135.5013,description:'安排道頓堀晚餐與河畔散步；道頓堀遊船、HARUKAS 300 為選擇性行程。',map:maps('道頓堀')}
 ]},
 {day:2,date:'12.24',weekday:'週四',theme:'清水寺和服・京都寫真',location:'京都東山',image:'清水寺與東山街景',note:'本日以已確認的和服拍攝為主：09:00 抵達清水寺周邊，約 12:00 於指定抹茶店與攝影師會合。伏見稻荷與金閣寺位於不同區域，這次不塞入拍攝日，留作另一次京都行程。',stops:[
  {time:'清晨',title:'大阪出發前往京都',category:'住宿出發',...dotonboriHotelLocation,description:'為 09:00 抵達清水寺周邊預留交通與步行時間；前一晚確認搭車路線、和服租借店地址及預約細節。',transit:'大阪至京都的車程依出發站與路線不同，請依實際住宿位置查詢當日班次。',map:maps('Apartment Hotel 11 Dotonbori 8 to 清水寺 京都')},
  {time:'09:00',title:'清水寺周邊・和服拍攝準備',nameEn:'Kiyomizu-dera Temple',category:'寺院・拍攝',latitude:34.9949,longitude:135.7850,description:'預計 09:00 抵達清水寺，換好和服後先在清水寺一帶拍攝與散步。和服租借／更衣店資訊依實際預約確認。',map:maps('清水寺 京都')},
  {time:'約 12:00',title:'與攝影師會合・正式拍攝',description:'於 SEIVI ARTISANAL MATCHA and ROASTED 與攝影師碰面，開始預約拍攝。地址：日本〒605-0851 Kyoto, Higashiyama Ward, Tamamizucho, 71-3（71-3 Tamamizu-cho, Higashiyama-ku, Kyoto City, Kyoto）。',transit:'從清水寺步行前往會合點，請預留步行及找路時間。',map:maps('SEIVI ARTISANAL MATCHA and ROASTED, 71-3 Tamamizu-cho, Higashiyama Ward, Kyoto 605-0851 Japan')},
  {time:'拍攝結束後',title:'東山散步（彈性）',category:'街區散步',latitude:34.9986,longitude:135.7800,description:'若拍攝時間與體力允許，再逛二年坂、三年坂或找抹茶甜點；依攝影師拍攝時長決定，不另外排遠距離景點。',map:maps('二年坂 京都')},
  {time:'傍晚',title:'返回大阪',category:'住宿周邊',...dotonboriHotelLocation,description:'拍攝與東山散步結束後搭車回大阪，晚餐安排在住宿周邊。',transit:'回程路線與班次依結束時間確認。',map:maps('Apartment Hotel 11 Dotonbori 8')}
 ]},
 {day:3,date:'12.25',weekday:'週五',theme:'日本環球影城 USJ',location:'此花區',image:'日本環球影城園區',note:'全天留給 USJ，不安排其他市區景點。開園時間、聖誕季活動及入園規則皆需以官方公告確認。',stops:[
  {time:'出發前',title:'入園準備清單',category:'入園準備',latitude:34.6654,longitude:135.4323,description:'確認門票、是否需要 Express Pass、Super Nintendo World 入場安排、開園時間與優先設施。',map:maps('Universal Studios Japan')},
  {time:'全天',title:'Universal Studios Japan',nameEn:'Universal Studios Japan',category:'主題樂園',latitude:34.6654,longitude:135.4323,description:'哈利波特魔法世界、Super Nintendo World 與季節活動依當日營運及票種安排。',transit:'由難波搭乘電車前往 Universal City；預留轉乘與入園安檢時間。',map:maps('Universal Studios Japan')},
  {time:'晚間',title:'Universal CityWalk',nameEn:'Universal CityWalk Osaka',category:'餐飲・購物',latitude:34.6677,longitude:135.4380,description:'園外餐飲與商店可作為離園後選擇，營業資訊待確認。',map:maps('Universal CityWalk Osaka')}
 ]},
 {day:4,date:'12.26',weekday:'週六',theme:'勝尾寺・城市購物',location:'箕面・大阪市區',image:'勝尾寺的達摩祈願',note:'勝尾寺安排在早上。黑門市場與木津市場二選一；梅田依體力挑選購物點。中之島燈光活動與投影映射為不同活動，2026 年資訊均待官方公告確認。',stops:[
  {time:'早上',title:'勝尾寺',nameEn:'Katsuo-ji Temple',category:'寺院',latitude:34.8648,longitude:135.4906,description:'以紅色達摩聞名的山寺；交通與入場規定、季節營運資訊出發前確認。',transit:'位於大阪市區外，建議提早出發並確認巴士／計程車接駁安排。',map:maps('勝尾寺')},
  {time:'中午',title:'黑門市場 或 木津市場',category:'市場・美食',latitude:34.6655,longitude:135.5063,description:'擇一安排海鮮、壽司或海鮮丼；市場營業日與店家時間待確認。',map:maps('黑門市場')},
  {time:'午後',title:'心齋橋・美國村',category:'街區・購物',latitude:34.6721,longitude:135.5008,description:'依購物興趣漫步商店街與街區。',map:maps('心齋橋筋商店街')},
  {time:'傍晚',title:'梅田購物區',category:'購物區',latitude:34.7024,longitude:135.4959,description:'阪急百貨、Grand Front Osaka、LUCUA Osaka 擇選。HEP FIVE 摩天輪或梅田藍天大廈擇一。',map:maps('梅田大阪')},
  {time:'晚上',title:'中之島冬季燈飾（待確認）',category:'活動・待確認',latitude:34.6937,longitude:135.5058,description:'另行確認 2026 活動日期與點燈時間。中央公會堂投影映射為另一項活動，不預設 12/26 仍舉行。',map:maps('中之島公會堂')}
 ]},
 {day:5,date:'12.27',weekday:'週日',theme:'收拾行李・返程',location:'大阪 → 台北',image:'關西機場出境大廳',note:'返程日不安排觀光。建議依行李、交通與報到需求預留充足時間。',stops:[
  {time:'08:00–08:15',title:'飯店出發',category:'住宿',...dotonboriHotelLocation,description:'辦理退房，前往關西國際機場。以 09:00–09:30 抵達 KIX T1 為目標，預留交通與報到時間。',transit:'可搭千日前線一站至難波，再轉南海電鐵；四人行李較多也可評估預約接送。',map:maps('Apartment Hotel 11 Dotonbori 8')},
  {time:'09:00–09:30',title:'抵達關西機場',category:'機場',latitude:34.4273,longitude:135.2440,description:'預留報到、托運、安檢與出境時間。',map:maps('Kansai International Airport')},
  {time:'12:00',title:'VZ567 起飛',description:'關西 KIX → 台北 TPE，預計 14:15 抵達。'}
 ]}
];
export const checklist: ChecklistGroup[] = [
 {stage:'出發前一週',category:'護照與航班',items:['確認護照效期與入境所需文件','確認去程 H11228 / 回程 VZ567 航班資訊','完成線上報到與行李規定確認','Visit Japan Web：登錄旅客資料與入境計畫，完成入境審查及海關申報']},
 {stage:'出發前一週',category:'住宿與交通',items:['抵達前三天查看飯店 Check-in Link 並完成登錄','確認 4 位住客的房間數與行李寄放方式','決定南海電鐵車種並下載地圖／乘車工具']},
 {stage:'出發前一週',category:'門票與景點',items:['準備 USJ 門票、Express Pass 與任天堂世界入場安排','查看勝尾寺及京都景點最新公告','確認和服拍攝會合資訊與道頓堀遊船安排']},
 {stage:'出發前一天',category:'餐廳與購物',items:['出發前核對餐廳營業時間與公休日','確認需要預約的餐廳及候位安排','整理市場、百貨與購物清單']},
 {stage:'出門前',category:'網路與電子用品',items:['準備 eSIM / Wi-Fi 與充電器','攜帶行動電源、轉接需求確認','下載離線地圖與重要文件']},
 {stage:'出發前一天',category:'衣物與天氣',items:['出發前查看大阪、京都天氣','準備保暖外套與舒適步行鞋','備妥雨具與常用藥品']}
];
