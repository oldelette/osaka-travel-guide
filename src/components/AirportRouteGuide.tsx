import { useState } from 'react';
import { ArrowRight, ExternalLink, MapPin, TrainFront } from '../icons';

type TrainChoice = 'rapit' | 'airport-express';

const officialLinks = {
  nankai: 'https://www.nankai.co.jp/en_railway/traffic/kix.html',
  rapit: 'https://www.nankai.co.jp/en_railway/traffic/express/rapit.html',
  metro: 'https://subway.osakametro.co.jp/en/station_guide/S/S17/',
  hotel: 'https://apt11.jp/en/stays/0c2842db-e0ed-4abd-8811-15882070ffd0',
  bus: 'https://www.kate.co.jp/en/timetable/detail/OC',
};
const airportMap = 'https://www.google.com/maps/dir/?api=1&origin=Kansai+International+Airport+Terminal+1&destination=Apartment+Hotel+11+Dotonbori+8&travelmode=transit';

export default function AirportRouteGuide() {
  const [trainChoice, setTrainChoice] = useState<TrainChoice>('rapit');
  const isRapit = trainChoice === 'rapit';

  return (
    <div id="airport-route" className="airport-guide mt-7 border-t border-[var(--line)] pt-7">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="section-label">ARRIVAL GUIDE · KIX TO HOTEL</span>
          <h3 className="mt-2 font-[var(--serif)] text-2xl font-medium text-[var(--navy)]">關西機場 → 道頓堀住宿</h3>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[#66736f]">第一航廈入境後，依「鐵道」指標到關西機場站。搭南海電鐵至難波，轉大阪 Metro 千日前線一站到日本橋，再由 7 號出口步行到住宿。</p>
        </div>
        <a className="touch-link inline-flex min-h-11 items-center gap-2 border border-[#c9c4b8] px-4 py-2 text-sm text-[var(--navy)] no-underline hover:bg-[var(--navy)] hover:text-white" href={airportMap} target="_blank" rel="noreferrer">
          <MapPin size={16}/>Google Maps 路線<ExternalLink size={14}/>
        </a>
      </div>

      <div className="mb-6 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3 bg-[#ede9df] px-5 py-4 text-center max-[600px]:grid-cols-1">
        <div><b className="block text-base text-[var(--orange)]">KIX</b><span className="text-sm">關西機場站</span></div><ArrowRight className="mx-auto text-[#b9aa99] max-[600px]:rotate-90" size={17}/>
        <div><b className="block text-base text-[var(--orange)]">南海難波</b><span className="text-sm">轉大阪 Metro</span></div><ArrowRight className="mx-auto text-[#b9aa99] max-[600px]:rotate-90" size={17}/>
        <div><b className="block text-base text-[var(--orange)]">日本橋 S17</b><span className="text-sm">7 號出口，步行約 6–8 分鐘</span></div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 max-[600px]:grid-cols-1" role="group" aria-label="選擇南海電鐵車種">
        {(['rapit', 'airport-express'] as const).map((choice) => {
          const rapid = choice === 'rapit';
          const active = trainChoice === choice;
          return <button key={choice} type="button" onClick={() => setTrainChoice(choice)} aria-pressed={active} className={`touch-link min-h-11 border p-4 text-left transition-colors ${active ? 'border-[var(--orange)] bg-[#f0e7dc]' : 'border-[var(--line)] bg-transparent hover:bg-[#efebe1]'}`}>
            <b className="block font-[var(--serif)] text-base text-[var(--navy)]">{rapid ? '南海 Rapi:t 特急' : '南海空港急行'}</b>
            <span className="mt-1 block text-sm leading-6 text-[#65716d]">{rapid ? '最快約 34 分鐘到南海難波；全車指定席，須另購特急券。成人普通座全程約 ¥1,860（南海約 ¥1,670＋Metro ¥190）。' : '約 43–45 分鐘到南海難波；一般車、不需特急券或指定席，全程成人約 ¥1,160（南海約 ¥970＋Metro ¥190）。'}</span>
          </button>;
        })}
      </div>

      <div className="mb-6 flex items-start gap-3 border-l-2 border-[var(--orange)] bg-[#f0ece2] px-4 py-4">
        <TrainFront className="mt-1 shrink-0 text-[var(--orange)]" size={19}/>
        <p className="m-0 text-sm leading-7 text-[#596662]"><b className="text-[var(--navy)]">目前選擇：{isRapit ? 'Rapi:t 特急' : '空港急行'}</b><br/>{isRapit ? '適合希望有固定座位、帶大型行李較好安置的旅客；4 人可先買相鄰指定席。' : '適合想省車資、可接受一般通勤列車乘車方式的旅客；尖峰時座位與行李空間較不固定。'} 兩種車都搭到南海難波，不必中途換南海列車。</p>
      </div>

      <ol className="grid grid-cols-2 gap-x-8 gap-y-5 max-[700px]:grid-cols-1">
        <li className="airport-route-step border-t border-[var(--line)] py-4"><span className="section-label">01 · KIX T1</span><h4 className="my-2 font-[var(--serif)] text-base">入境後前往鐵道車站</h4><p className="m-0 text-sm leading-7 text-[#66736f]">完成入境、領行李及海關後，按「鐵道／Railway」標示上二樓，經空橋到關西機場站。留意南海與 JR 是不同閘口。</p><a className="touch-link mt-2 inline-flex min-h-11 items-center gap-2 text-sm text-[#9d674d]" href="https://www.kansai-airport.or.jp/en/access/train" target="_blank" rel="noreferrer">關西機場官方車站資訊<ExternalLink size={14}/></a></li>
        <li className="airport-route-step border-t border-[var(--line)] py-4"><span className="section-label">02 · NANKAI</span><h4 className="my-2 font-[var(--serif)] text-base">購票並搭到南海難波</h4><p className="m-0 text-sm leading-7 text-[#66736f]">空港急行只需基本車票；Rapi:t 另需特急券並指定座位。可在售票機／櫃檯購買，或依南海官方服務預購。</p><a className="touch-link mt-2 inline-flex min-h-11 items-center gap-2 text-sm text-[#9d674d]" href={isRapit ? officialLinks.rapit : officialLinks.nankai} target="_blank" rel="noreferrer">南海電鐵官方車種資訊<ExternalLink size={14}/></a></li>
        <li className="airport-route-step border-t border-[var(--line)] py-4"><span className="section-label">03 · OSAKA METRO</span><h4 className="my-2 font-[var(--serif)] text-base">難波轉千日前線一站</h4><p className="m-0 text-sm leading-7 text-[#66736f]">出南海閘口後跟隨 Osaka Metro 指標到千日前線難波站，搭往南巽方向，在日本橋 S17 下車；Metro 成人基本車資 ¥190。南海難波與地鐵站間需預留轉乘步行時間。</p><a className="touch-link mt-2 inline-flex min-h-11 items-center gap-2 text-sm text-[#9d674d]" href="https://subway.osakametro.co.jp/guide/fare/fare/price.php" target="_blank" rel="noreferrer">Metro 官方票價與站務資訊<ExternalLink size={14}/></a></li>
        <li className="airport-route-step border-t border-[var(--line)] py-4"><span className="section-label">04 · ON FOOT</span><h4 className="my-2 font-[var(--serif)] text-base">日本橋站 7 號出口到住宿</h4><p className="m-0 text-sm leading-7 text-[#66736f]">依現場電梯與出口狀況選擇動線，步行約 6–8 分鐘；四人及大型行李若轉乘不便，可在南海難波改搭計程車。</p><a className="touch-link mt-2 inline-flex min-h-11 items-center gap-2 text-sm text-[#9d674d]" href={officialLinks.hotel} target="_blank" rel="noreferrer">住宿官方交通說明<ExternalLink size={14}/></a></li>
      </ol>
      <aside className="airport-bus-option mt-5 border border-[var(--line)] p-4">
        <b className="font-[var(--serif)] text-base text-[var(--navy)]">行李多、想少轉乘：機場巴士到難波 OCAT</b>
        <p className="mb-2 mt-1 text-sm leading-7 text-[#66736f]">KIX T1 → 難波 OCAT，官方標示約 50 分鐘、成人單程 ¥1,400；採先到先上、不劃位，到 OCAT 後仍需另安排最後一段到住宿。適合希望行李放車廂、減少鐵路轉乘的人，出發前核對班次及行李規定。</p>
        <a className="touch-link inline-flex min-h-11 items-center gap-2 text-sm text-[#9d674d]" href={officialLinks.bus} target="_blank" rel="noreferrer">機場巴士官方班次與票價<ExternalLink size={14}/></a>
      </aside>
      <p className="mt-4 border-t border-[var(--line)] pt-3 text-xs leading-6 text-[#777f79]">車資依 2026 年 4 月調整後南海資料整理，Metro 段車資另計；班次及票價可能調整，出發前請以營運商查詢為準。從機場至住宿的總時間會受入境、等車及轉乘步行影響，以上不把這些時間合併成保證值。</p>
    </div>
  );
}
