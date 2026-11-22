import { useState } from 'react';
import { CalendarDays, ChevronRight, ExternalLink, MapPin, TrainFront } from 'lucide-react';

type TrainChoice = 'airport-express' | 'rapit';

const steps = [
  {
    number: '01',
    title: '入境後前往 2 樓鐵道車站',
    description: '完成入境、領取行李並通過海關後，從第一航廈入境大廳依「Railway／鐵道」指標前往 2 樓，走空橋抵達關西機場站。JR 與南海電鐵車站相鄰，認明 NANKAI 標誌再進站。',
    tag: 'KIX T1 → 2F',
    href: 'https://www.kansai-airport.or.jp/en/access/train',
    linkLabel: '關西機場鐵道交通',
  },
  {
    number: '02',
    title: '搭南海電鐵前往難波',
    description: '搭往 Namba 的南海電鐵。空港急行適合省預算、直接到難波；Rapi:t 全車指定席，最快約 34 分鐘，適合希望有固定座位與較舒適行李空間的旅人。Rapi:t 需另購特急券。',
    tag: '南海電鐵 NANKAI',
    href: 'https://www.nankai.co.jp/en_railway/traffic/kix.html',
    linkLabel: '南海電鐵機場交通',
  },
  {
    number: '03',
    title: '南海難波站轉乘千日前線',
    description: '抵達南海難波站後，跟著 Osaka Metro 指標前往千日前線。站內轉乘通道較長，帶大型行李建議預留約 10–15 分鐘並使用電梯；途中認明粉紅色 Sennichimae Line 標誌。',
    tag: '站內轉乘預留 10–15 分鐘',
    href: 'https://subway.osakametro.co.jp/en/station_guide/M/m20/map.php',
    linkLabel: '大阪 Metro 難波站資訊',
  },
  {
    number: '04',
    title: '千日前線搭一站至日本橋',
    description: '在難波 S16 搭乘往南巽方向的列車，下一站日本橋 S17 下車。注意：M20 是御堂筋線難波站代碼；這段轉乘要找千日前線 S16。',
    tag: 'S16 難波 → S17 日本橋',
    href: 'https://subway.osakametro.co.jp/en/station_guide/S/S17/',
    linkLabel: '大阪 Metro 日本橋站資訊',
  },
  {
    number: '05',
    title: '從 7 號出口步行到飯店',
    description: '日本橋站由 7 號出口出站，步行約 6–8 分鐘抵達 Apartment Hotel 11 Dotonbori 8。飯店自助入住：預計抵達前三天收到 Check-in Link；請先完成資料登錄，入住日 16:00 起可在連結查看房號與進房方式。',
    tag: '出口 7 · 約 6–8 分鐘',
    href: 'https://apt11.jp/en/stays/0c2842db-e0ed-4abd-8811-15882070ffd0',
    linkLabel: '飯店官方交通與入住說明',
  },
];

const mapUrl = 'https://www.google.com/maps/dir/?api=1&origin=Kansai+International+Airport&destination=Apartment+Hotel+11+Dotonbori+8&travelmode=transit';

export default function AirportRouteGuide() {
  const [trainChoice, setTrainChoice] = useState<TrainChoice>('rapit');
  const selected = trainChoice === 'rapit'
    ? { title: 'Rapi:t 特急', time: '最快約 34 分鐘', detail: '全車指定席，需另購特急券；適合想確保座位、帶大型行李的旅人。' }
    : { title: '空港急行', time: '約 45 分鐘', detail: '直接到南海難波，不需特急券；較省預算，尖峰時段座位依現場狀況。' };

  return (
    <div id="airport-route" className="mt-7 border-t border-[var(--line)] pt-7">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="section-label">ARRIVAL GUIDE · KIX TO HOTEL</span>
          <h2 className="mt-2 font-[var(--serif)] text-[28px] font-medium tracking-wide text-[var(--navy)] max-[860px]:text-[23px]">關西機場，一步步到飯店</h2>
          <p className="mt-2 text-[11px] leading-7 text-[#737c77]">南海電鐵 → Osaka Metro 千日前線 → 日本橋站 7 號出口</p>
        </div>
        <a className="inline-flex items-center gap-2 border border-[#c9c4b8] px-4 py-3 text-[10px] text-[var(--navy)] no-underline hover:bg-[var(--navy)] hover:text-white" href={mapUrl} target="_blank" rel="noreferrer">
          <MapPin size={14}/> 開啟 Google Maps 導航 <ExternalLink size={12}/>
        </a>
      </div>

      <div className="mb-7 grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-3 rounded-sm bg-[#ede9df] px-5 py-5 text-center max-[860px]:grid-cols-2 max-[860px]:gap-4">
        {[
          ['KIX', '關西機場站'], ['NANKAI', '南海難波站'], ['S16', '難波・千日前線'], ['S17', '日本橋站・出口 7'],
        ].map(([code, name], index) => (
          <div className="contents" key={code}>
            <div className="flex flex-col items-center gap-1">
              <b className="font-[var(--serif)] text-[16px] text-[var(--orange)]">{code}</b>
              <span className="text-[9px] text-[#66736f]">{name}</span>
            </div>
            {index < 3 && <ChevronRight className="mx-auto text-[#b9aa99] max-[860px]:hidden" size={16}/>}
          </div>
        ))}
      </div>

      <div className="mb-7 grid grid-cols-2 gap-3 max-[560px]:grid-cols-1" role="group" aria-label="選擇南海電鐵車種">
        {(['rapit', 'airport-express'] as const).map((choice) => {
          const isRapit = choice === 'rapit';
          const active = trainChoice === choice;
          return (
            <button key={choice} type="button" onClick={() => setTrainChoice(choice)} aria-pressed={active}
              className={`border p-4 text-left transition-colors ${active ? 'border-[var(--orange)] bg-[#f0e7dc]' : 'border-[var(--line)] bg-transparent hover:bg-[#efebe1]'}`}>
              <span className="flex items-center justify-between gap-2">
                <b className="font-[var(--serif)] text-[14px] text-[var(--navy)]">{isRapit ? 'Rapi:t 特急' : '空港急行'}</b>
                <span className="text-[8px] tracking-wide text-[#987158]">{isRapit ? '指定席・舒適' : '經濟・直達'}</span>
              </span>
              <span className="mt-2 block text-[9px] leading-5 text-[#737c77]">{isRapit ? '最快約 34 分鐘；另購特急券。' : '約 45 分鐘；無需特急券。'}</span>
            </button>
          );
        })}
      </div>

      <div className="mb-7 flex items-start gap-3 border-l-2 border-[var(--orange)] bg-[#f0ece2] px-4 py-4">
        <TrainFront className="mt-0.5 shrink-0 text-[var(--orange)]" size={18}/>
        <div>
          <b className="text-[11px] text-[var(--navy)]">目前選擇：{selected.title} · {selected.time}</b>
          <p className="mb-0 mt-1 text-[9px] leading-6 text-[#737c77]">{selected.detail} 到難波後仍需轉乘地鐵，再步行到飯店。</p>
        </div>
      </div>

      <ol className="grid grid-cols-2 gap-x-8 gap-y-5 max-[860px]:grid-cols-1">
        {steps.map((step) => (
          <li key={step.number} className="airport-route-step grid grid-cols-[38px_minmax(0,1fr)] gap-3 border-t border-[var(--line)] py-4">
            <span className="font-[var(--serif)] text-[18px] text-[var(--orange)]">{step.number}</span>
            <div>
              <span className="text-[8px] tracking-wide text-[#9a715d]">{step.tag}</span>
              <h3 className="mb-2 mt-1 font-[var(--serif)] text-[14px] font-medium text-[var(--navy)]">{step.title}</h3>
              <p className="m-0 text-[9px] leading-[1.9] text-[#6d7772]">{step.description}</p>
              <a className="mt-3 inline-flex items-center gap-1 text-[9px] text-[#9d674d] no-underline hover:underline" href={step.href} target="_blank" rel="noreferrer">{step.linkLabel}<ExternalLink size={11}/></a>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-5 grid grid-cols-3 gap-3 max-[860px]:grid-cols-1">
        <div className="flex items-start gap-2 bg-[#ede9df] p-4"><CalendarDays size={15} className="mt-0.5 shrink-0 text-[var(--orange)]"/><p className="m-0 text-[9px] leading-6 text-[#66736f]"><b className="text-[var(--navy)]">車程抓法</b><br/>機場站到飯店約 55–75 分鐘，視候車與轉乘步行而異；不含入境、領行李。飯店資訊估約 75 分鐘。</p></div>
        <div className="flex items-start gap-2 bg-[#ede9df] p-4"><TrainFront size={15} className="mt-0.5 shrink-0 text-[var(--orange)]"/><p className="m-0 text-[9px] leading-6 text-[#66736f]"><b className="text-[var(--navy)]">4 人與大型行李</b><br/>每人準備 ICOCA 可刷一般車資；搭 Rapi:t 仍須另備特急券（或購買含乘車票的套票）。轉乘及出口請找電梯。</p></div>
        <div className="flex items-start gap-2 bg-[#ede9df] p-4"><MapPin size={15} className="mt-0.5 shrink-0 text-[var(--orange)]"/><p className="m-0 text-[9px] leading-6 text-[#66736f]"><b className="text-[var(--navy)]">行李與步行</b><br/>此路線可搭大眾運輸抵達；最後仍需步行約 6–8 分鐘。若行李很多，可視體力改搭短程計程車。</p></div>
      </div>

      <p className="mb-0 mt-4 text-[8px] leading-5 text-[#8a8f87]">班次、票價及車種時刻請出發前以南海電鐵官方資訊確認；抵達前約三天留意飯店寄送的自助入住連結。</p>
    </div>
  );
}
